import { readFile } from "node:fs/promises";
import path from "node:path";

const ENTRY_PATH = path.resolve("dist/index.js");
const MANIFEST_PATH = path.resolve("dist/manifest.json");

class ReleaseSmokeError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ReleaseSmokeError";
	}
}

const entry = await readFile(ENTRY_PATH, "utf8");
const manifest = await readFile(MANIFEST_PATH, "utf8");
const exportBlock = entry.slice(entry.lastIndexOf("export {"));

if (!/\bas default\b/.test(exportBlock)) {
	throw new ReleaseSmokeError(
		"Release does not expose a default extension export",
	);
}
if (!/\bas manifest\b/.test(exportBlock)) {
	throw new ReleaseSmokeError("Release does not expose its manifest");
}
if (!manifest.includes('"name": "excalidraw"')) {
	throw new ReleaseSmokeError("Release manifest does not identify Excalidraw");
}
