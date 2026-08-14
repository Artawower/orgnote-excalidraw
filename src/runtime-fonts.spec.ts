import { afterEach, expect, test, vi } from "vitest";
import { createRuntimeFontBridge } from "./runtime-fonts";

const createFontFace = (
	family: string,
	source: string | BufferSource,
	descriptors: FontFaceDescriptors,
): FontFace => {
	const font = {
		family,
		source,
		unicodeRange: descriptors.unicodeRange ?? "U+0-10FFFF",
		load: vi.fn(),
	} as unknown as FontFace;
	vi.mocked(font.load).mockResolvedValue(font);
	return font;
};

const installFontEnvironment = () => {
	const add = vi.fn();
	const remove = vi.fn();
	const FontFaceMock = vi.fn(createFontFace);
	vi.stubGlobal("FontFace", FontFaceMock);
	vi.stubGlobal("document", { fonts: { add, delete: remove } });
	return { add, FontFaceMock, remove };
};

afterEach(() => {
	vi.unstubAllGlobals();
});

test("runtime font bridge loads only the requested unicode subset once", async () => {
	const { FontFaceMock } = installFontEnvironment();
	const readRuntimeAsset = vi
		.fn()
		.mockResolvedValue(new Uint8Array([1]).buffer);
	const bridge = createRuntimeFontBridge({
		isRuntimeAssetUri: (uri) => uri.startsWith("runtime:"),
		readRuntimeAsset,
	});
	bridge.createFontFace({
		family: "Excalifont",
		urls: ["runtime:latin.woff2"],
		sources: "url(runtime:latin.woff2)",
		descriptors: { unicodeRange: "U+20-7E" },
		replace: vi.fn(),
	});
	bridge.createFontFace({
		family: "Excalifont",
		urls: ["runtime:cyrillic.woff2"],
		sources: "url(runtime:cyrillic.woff2)",
		descriptors: { unicodeRange: "U+400-45F" },
		replace: vi.fn(),
	});

	await bridge.resolveFontFaces('16px "Excalifont"', "Hello");
	await bridge.resolveFontFaces('16px "Excalifont"', "Hello");

	expect(readRuntimeAsset).toHaveBeenCalledOnce();
	expect(readRuntimeAsset).toHaveBeenCalledWith("runtime:latin.woff2");
	expect(FontFaceMock).toHaveBeenCalledTimes(3);
});

test("runtime font bridge preserves regular font sources", () => {
	const { FontFaceMock } = installFontEnvironment();
	const bridge = createRuntimeFontBridge({
		isRuntimeAssetUri: (uri) => uri.startsWith("runtime:"),
		readRuntimeAsset: vi.fn(),
	});

	const font = bridge.createFontFace({
		family: "Local Font",
		urls: ["https://example.com/font.woff2"],
		sources: "url(https://example.com/font.woff2)",
		descriptors: { weight: "400" },
		replace: vi.fn(),
	});

	expect(font).toBe(FontFaceMock.mock.results[0]?.value);
	expect(FontFaceMock).toHaveBeenCalledWith(
		"Local Font",
		"url(https://example.com/font.woff2)",
		{ weight: "400" },
	);
});

test("runtime font bridge does not install fonts after release", async () => {
	const { add } = installFontEnvironment();
	let resolveAsset: ((content: ArrayBuffer) => void) | undefined;
	const readRuntimeAsset = vi.fn(
		() =>
			new Promise<ArrayBuffer>((resolve) => {
				resolveAsset = resolve;
			}),
	);
	const bridge = createRuntimeFontBridge({
		isRuntimeAssetUri: (uri) => uri.startsWith("runtime:"),
		readRuntimeAsset,
	});
	bridge.createFontFace({
		family: "Excalifont",
		urls: ["runtime:latin.woff2"],
		sources: "url(runtime:latin.woff2)",
		descriptors: { unicodeRange: "U+20-7E" },
		replace: vi.fn(),
	});

	const loading = bridge.resolveFontFaces("16px Excalifont", "Hello");
	bridge.release();
	resolveAsset?.(new Uint8Array([1]).buffer);
	await loading;

	expect(add).not.toHaveBeenCalled();
});

test("runtime font bridge releases placeholders and loaded fonts", async () => {
	const { add, FontFaceMock, remove } = installFontEnvironment();
	const bridge = createRuntimeFontBridge({
		isRuntimeAssetUri: (uri) => uri.startsWith("runtime:"),
		readRuntimeAsset: vi.fn().mockResolvedValue(new Uint8Array([1]).buffer),
	});
	const placeholder = bridge.createFontFace({
		family: "Excalifont",
		urls: ["runtime:latin.woff2"],
		sources: "url(runtime:latin.woff2)",
		descriptors: { unicodeRange: "U+20-7E" },
		replace: vi.fn(),
	});
	await bridge.resolveFontFaces("16px Excalifont", "Hello");
	const loadedFont = FontFaceMock.mock.results[1]?.value as FontFace;

	bridge.release();

	expect(add).toHaveBeenCalledWith(loadedFont);
	expect(remove).toHaveBeenCalledWith(placeholder);
	expect(remove).toHaveBeenCalledWith(loadedFont);
});
