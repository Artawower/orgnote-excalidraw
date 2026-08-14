import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import type { ExtensionAssetDescriptor } from "orgnote-api";
import { excalidrawManifest } from "../src/manifest";

const DIST_DIRECTORY = "dist";
const ENTRY_PATH = path.join(DIST_DIRECTORY, "index.js");
const RUNTIME_PATH = path.join(DIST_DIRECTORY, "assets", "runtime.js");
const MANIFEST_PATH = path.join(DIST_DIRECTORY, "manifest.json");
const MAX_ENTRY_SIZE = 500_000;
const RUNTIME_ASSET_PREFIX = "orgnote-extension-asset:";
const RUNTIME_FONT_BRIDGE_MARKERS = [
	"__orgnoteExcalidrawCreateFontFace",
	"__orgnoteExcalidrawResolveFontFaces",
] as const;

class ReleaseVerificationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ReleaseVerificationError";
	}
}

const listFiles = async (directory: string): Promise<string[]> => {
	const entries = await readdir(directory, { withFileTypes: true });
	const nested = await Promise.all(
		entries.map((entry) => {
			const entryPath = path.join(directory, entry.name);
			return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
		}),
	);
	return nested.flat();
};

const verifyEntry = async (): Promise<void> => {
	const files = await listFiles(DIST_DIRECTORY);
	const javascriptFiles = files.filter((file) => file.endsWith(".js")).sort();
	const expectedFiles = [ENTRY_PATH, RUNTIME_PATH].sort();
	if (JSON.stringify(javascriptFiles) !== JSON.stringify(expectedFiles)) {
		throw new ReleaseVerificationError(
			"Release must contain only index.js and assets/runtime.js",
		);
	}
	const entryStats = await stat(ENTRY_PATH);
	if (entryStats.size > MAX_ENTRY_SIZE) {
		throw new ReleaseVerificationError(
			`Release entry exceeds ${MAX_ENTRY_SIZE} bytes`,
		);
	}
	const entry = await readFile(ENTRY_PATH, "utf8");
	const runtime = await readFile(RUNTIME_PATH, "utf8");
	if (runtime.includes("./fonts/")) {
		throw new ReleaseVerificationError(
			"Release runtime contains unresolved font paths",
		);
	}
	if (RUNTIME_FONT_BRIDGE_MARKERS.some((marker) => !runtime.includes(marker))) {
		throw new ReleaseVerificationError(
			"Release runtime does not use the packaged font bridge",
		);
	}
	if (entry.includes(".finally(() => URL.revokeObjectURL")) {
		throw new ReleaseVerificationError(
			"Release revokes the runtime module URL before extension unmount",
		);
	}
	if (
		!entry.includes(RUNTIME_ASSET_PREFIX) ||
		!runtime.includes(RUNTIME_ASSET_PREFIX)
	) {
		throw new ReleaseVerificationError(
			"Release modules do not reference runtime assets",
		);
	}
};

const verifyAsset = async (asset: ExtensionAssetDescriptor): Promise<void> => {
	const assetPath = path.join(DIST_DIRECTORY, "assets", asset.path);
	const content = await readFile(assetPath);
	const integrity = `sha256-${createHash("sha256").update(content).digest("base64")}`;
	if (content.byteLength !== asset.size || integrity !== asset.integrity) {
		throw new ReleaseVerificationError(
			`Asset verification failed: ${asset.path}`,
		);
	}
};

const verifyManifest = async (): Promise<void> => {
	const manifestContent = await readFile(MANIFEST_PATH, "utf8");
	const expectedContent = `${JSON.stringify(excalidrawManifest, null, 2)}\n`;
	if (manifestContent !== expectedContent) {
		throw new ReleaseVerificationError(
			"Release manifest does not match source manifest",
		);
	}
	const assets = excalidrawManifest.assets ?? [];
	const copiedAssets = await listFiles(path.join(DIST_DIRECTORY, "assets"));
	if (assets.length !== copiedAssets.length) {
		throw new ReleaseVerificationError(
			"Manifest assets do not match copied assets",
		);
	}
	await Promise.all(assets.map(verifyAsset));
};

await stat(ENTRY_PATH);
await stat(MANIFEST_PATH);
await verifyEntry();
await verifyManifest();
