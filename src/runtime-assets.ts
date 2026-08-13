import { getExtensionAssetPath, type OrgNoteApi } from "orgnote-api";
import { excalidrawManifest } from "./manifest";

const RUNTIME_ASSET_PREFIX = "orgnote-extension-asset:";
const ASSISTANT_FONTS = [
	{ path: "fonts/Assistant/Assistant-Regular.woff2", weight: "400" },
	{ path: "fonts/Assistant/Assistant-Medium.woff2", weight: "500" },
	{ path: "fonts/Assistant/Assistant-SemiBold.woff2", weight: "600" },
	{ path: "fonts/Assistant/Assistant-Bold.woff2", weight: "700" },
] as const;

const RUNTIME_MODULE_PATH = "runtime.js";

type ExcalidrawAssetFetch = (uri: string | URL) => Response | Promise<Response>;

interface ExcalidrawRuntimeModule {
	readonly createExcalidrawSession: typeof import("./excalidraw-session").createExcalidrawSession;
	readonly mountExcalidrawHost: typeof import("./excalidraw-react-host").mountExcalidrawHost;
}

let runtimePromise: Promise<ExcalidrawRuntimeModule> | undefined;
let runtimeModuleUrl: string | undefined;
let assistantFontsPromise: Promise<() => void> | undefined;
let releaseAssistantFonts: (() => void) | undefined;

type ExcalidrawRuntimeGlobal = typeof globalThis & {
	__orgnoteExcalidrawFetch?: ExcalidrawAssetFetch;
};

export const createRuntimeAssetUri = (assetPath: string): string =>
	`${RUNTIME_ASSET_PREFIX}${assetPath}`;

export const isRuntimeAssetUri = (uri: string): boolean =>
	uri.startsWith(RUNTIME_ASSET_PREFIX);

export const readRuntimeAsset = async (
	api: OrgNoteApi,
	uri: string,
): Promise<ArrayBuffer> => {
	const assetPath = uri.slice(RUNTIME_ASSET_PREFIX.length);
	const runtimePath = getExtensionAssetPath(excalidrawManifest, assetPath);
	const content = await api.core
		.useFileSystem()
		.readFile(runtimePath, "binary");
	if (!content)
		throw new Error(`Excalidraw runtime asset is missing: ${assetPath}`);
	return Uint8Array.from(content).buffer;
};

const createRuntimeResponse = async (
	api: OrgNoteApi,
	uri: string,
): Promise<Response> => {
	const content = await readRuntimeAsset(api, uri);
	return new Response(content, {
		status: 200,
		headers: { "Content-Type": "font/woff2" },
	});
};

const loadAssistantFont = async (
	api: OrgNoteApi,
	descriptor: (typeof ASSISTANT_FONTS)[number],
): Promise<FontFace> => {
	const content = await readRuntimeAsset(
		api,
		createRuntimeAssetUri(descriptor.path),
	);
	const font = new FontFace("Assistant", content, {
		weight: descriptor.weight,
	});
	return font.load();
};

const installAssistantFonts = async (api: OrgNoteApi): Promise<() => void> => {
	const fonts = await Promise.all(
		ASSISTANT_FONTS.map((font) => loadAssistantFont(api, font)),
	);
	fonts.forEach((font) => document.fonts.add(font));
	return () => fonts.forEach((font) => document.fonts.delete(font));
};

const importRuntime = async (
	api: OrgNoteApi,
): Promise<ExcalidrawRuntimeModule> => {
	const content = await readRuntimeAsset(
		api,
		createRuntimeAssetUri(RUNTIME_MODULE_PATH),
	);
	const moduleUrl = URL.createObjectURL(
		new Blob([content], { type: "text/javascript" }),
	);
	runtimeModuleUrl = moduleUrl;
	const modulePromise = import(/* @vite-ignore */ moduleUrl);
	void modulePromise.catch(() => {
		if (runtimeModuleUrl !== moduleUrl) return;
		URL.revokeObjectURL(moduleUrl);
		runtimeModuleUrl = undefined;
	});
	return modulePromise as Promise<ExcalidrawRuntimeModule>;
};

const cacheAssistantFonts = (api: OrgNoteApi): Promise<() => void> => {
	const pendingFonts = installAssistantFonts(api);
	assistantFontsPromise = pendingFonts;
	void pendingFonts.then((release) => {
		releaseAssistantFonts = release;
	});
	void pendingFonts.catch(() => {
		if (assistantFontsPromise === pendingFonts)
			assistantFontsPromise = undefined;
	});
	return pendingFonts;
};

const reportAssistantFontError = (api: OrgNoteApi, error: unknown): void => {
	api.utils.logger.warn("Unable to load Excalidraw Assistant fonts", error);
};

const loadAssistantFonts = (api: OrgNoteApi): void => {
	const fonts = assistantFontsPromise ?? cacheAssistantFonts(api);
	void fonts.catch((error: unknown) => reportAssistantFontError(api, error));
};

const cacheRuntime = (api: OrgNoteApi): Promise<ExcalidrawRuntimeModule> => {
	const pendingRuntime = importRuntime(api);
	runtimePromise = pendingRuntime;
	void pendingRuntime.catch(() => {
		if (runtimePromise === pendingRuntime) runtimePromise = undefined;
	});
	return pendingRuntime;
};

export const loadExcalidrawRuntime = async (
	api: OrgNoteApi,
): Promise<ExcalidrawRuntimeModule> => {
	const runtime = await (runtimePromise ?? cacheRuntime(api));
	loadAssistantFonts(api);
	return runtime;
};

export const releaseExcalidrawRuntimeAssets = (): void => {
	releaseAssistantFonts?.();
	releaseAssistantFonts = undefined;
	assistantFontsPromise = undefined;
	runtimePromise = undefined;
	if (!runtimeModuleUrl) return;
	URL.revokeObjectURL(runtimeModuleUrl);
	runtimeModuleUrl = undefined;
};

export const installRuntimeAssetFetch = (api: OrgNoteApi): (() => void) => {
	const runtimeGlobal = globalThis as ExcalidrawRuntimeGlobal;
	const fetchRuntimeAsset: ExcalidrawAssetFetch = (input) => {
		const uri = input.toString();
		if (!isRuntimeAssetUri(uri)) {
			throw new Error(`Unsupported Excalidraw runtime asset URI: ${uri}`);
		}
		return createRuntimeResponse(api, uri);
	};
	runtimeGlobal.__orgnoteExcalidrawFetch = fetchRuntimeAsset;
	return () => {
		runtimeGlobal.__orgnoteExcalidrawFetch = undefined;
	};
};
