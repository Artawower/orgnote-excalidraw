import { afterEach, expect, test, vi } from "vitest";
import type { OrgNoteApi } from "orgnote-api";
import type {
	RuntimeFontFaceFactory,
	RuntimeFontFaceResolver,
} from "./runtime-fonts";
import {
	createRuntimeAssetUri,
	installRuntimeAssetFetch,
	isRuntimeAssetUri,
	readRuntimeAsset,
	releaseExcalidrawRuntimeAssets,
} from "./runtime-assets";

const readFile = vi.fn();
const api = {
	core: {
		useFileSystem: () => ({ readFile }),
	},
} as unknown as OrgNoteApi;

const runtimeGlobal = globalThis as typeof globalThis & {
	__orgnoteExcalidrawCreateFontFace?: RuntimeFontFaceFactory;
	__orgnoteExcalidrawResolveFontFaces?: RuntimeFontFaceResolver;
};

afterEach(() => {
	releaseExcalidrawRuntimeAssets();
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

test("createRuntimeAssetUri creates a private runtime URI", () => {
	const uri = createRuntimeAssetUri("fonts/Virgil/Virgil-Regular.woff2");

	expect(uri).toBe("orgnote-extension-asset:fonts/Virgil/Virgil-Regular.woff2");
	expect(isRuntimeAssetUri(uri)).toBe(true);
});

test("readRuntimeAsset reads a declared asset through OrgNote filesystem", async () => {
	readFile.mockResolvedValueOnce(new Uint8Array([1, 2, 3]));
	const uri = createRuntimeAssetUri("fonts/Virgil/Virgil-Regular.woff2");

	const content = await readRuntimeAsset(api, uri);

	expect(new Uint8Array(content)).toEqual(new Uint8Array([1, 2, 3]));
	expect(readFile).toHaveBeenCalledWith(
		".orgnote/extensions/excalidraw/0.1.5/assets/fonts/Virgil/Virgil-Regular.woff2",
		"binary",
	);
});

test("runtime font bridge materializes private fonts from binary assets", async () => {
	const placeholder = {
		family: "Excalifont",
		unicodeRange: "U+20-7E",
	} as FontFace;
	const loadedFont = {
		family: "Excalifont",
		unicodeRange: "U+20-7E",
		load: vi.fn(),
	} as unknown as FontFace;
	vi.mocked(loadedFont.load).mockResolvedValue(loadedFont);
	const FontFaceMock = vi
		.fn()
		.mockReturnValueOnce(placeholder)
		.mockReturnValueOnce(loadedFont);
	vi.stubGlobal("FontFace", FontFaceMock);
	const add = vi.fn();
	const remove = vi.fn();
	vi.stubGlobal("document", { fonts: { add, delete: remove } });
	readFile.mockResolvedValueOnce(new Uint8Array([1, 2, 3]));
	const uninstall = installRuntimeAssetFetch(api);
	const replace = vi.fn();
	const uri = createRuntimeAssetUri(
		"fonts/Excalifont/Excalifont-Regular-a88b72a24fb54c9f94e3b5fdaa7481c9.woff2",
	);

	const font = runtimeGlobal.__orgnoteExcalidrawCreateFontFace?.({
		family: "Excalifont",
		urls: [uri],
		sources: `url(${uri})`,
		descriptors: { unicodeRange: "U+20-7E" },
		replace,
	});
	await runtimeGlobal.__orgnoteExcalidrawResolveFontFaces?.(
		'16px "Excalifont"',
		"Hello",
	);

	expect(font).toBe(placeholder);
	expect(FontFaceMock).toHaveBeenLastCalledWith(
		"Excalifont",
		expect.any(ArrayBuffer),
		{ unicodeRange: "U+20-7E" },
	);
	expect(loadedFont.load).toHaveBeenCalledOnce();
	expect(remove).toHaveBeenCalledWith(placeholder);
	expect(add).toHaveBeenCalledWith(loadedFont);
	expect(replace).toHaveBeenCalledWith(loadedFont);
	releaseExcalidrawRuntimeAssets();
	expect(remove).toHaveBeenCalledWith(loadedFont);
	uninstall();
});

test("installRuntimeAssetFetch rejects non-runtime URIs", async () => {
	const remove = installRuntimeAssetFetch(api);
	const runtimeGlobal = globalThis as typeof globalThis & {
		__orgnoteExcalidrawFetch?: (uri: string) => Promise<Response>;
	};

	expect(() =>
		runtimeGlobal.__orgnoteExcalidrawFetch?.("https://example.com/font.woff2"),
	).toThrow("Unsupported Excalidraw runtime asset URI");

	remove();
	expect(runtimeGlobal.__orgnoteExcalidrawFetch).toBeUndefined();
});
