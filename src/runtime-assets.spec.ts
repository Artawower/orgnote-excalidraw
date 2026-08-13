import { expect, test, vi } from "vitest";
import type { OrgNoteApi } from "orgnote-api";
import {
	createRuntimeAssetUri,
	installRuntimeAssetFetch,
	isRuntimeAssetUri,
	readRuntimeAsset,
} from "./runtime-assets";

const readFile = vi.fn();
const api = {
	core: {
		useFileSystem: () => ({ readFile }),
	},
} as unknown as OrgNoteApi;

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
		".orgnote/extensions/excalidraw/0.1.0/assets/fonts/Virgil/Virgil-Regular.woff2",
		"binary",
	);
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
