import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ExtensionAssetDescriptor } from "orgnote-api";

const ASSETS_DIRECTORY = "assets";
const OUTPUT_PATH = "src/generated-assets.ts";

const listFiles = async (directory: string): Promise<string[]> => {
	const entries = await readdir(directory, { withFileTypes: true });
	const nested = await Promise.all(
		entries.map((entry) => {
			const entryPath = path.join(directory, entry.name);
			return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
		}),
	);
	return nested.flat().sort((left, right) => left.localeCompare(right));
};

const createDescriptor = async (
	filePath: string,
): Promise<ExtensionAssetDescriptor> => {
	const content = await readFile(filePath);
	const digest = createHash("sha256").update(content).digest("base64");
	return {
		path: path.relative(ASSETS_DIRECTORY, filePath).split(path.sep).join("/"),
		mediaType: "font/woff2",
		size: content.byteLength,
		integrity: `sha256-${digest}`,
	};
};

const serializeDescriptors = (
	descriptors: readonly ExtensionAssetDescriptor[],
): string =>
	`import type { ExtensionAssetDescriptor } from 'orgnote-api';\n\nexport const extensionAssets = ${JSON.stringify(descriptors, null, 2)} as const satisfies readonly ExtensionAssetDescriptor[];\n`;

const files = await listFiles(ASSETS_DIRECTORY);
const descriptors = await Promise.all(files.map(createDescriptor));
await writeFile(OUTPUT_PATH, serializeDescriptors(descriptors));
