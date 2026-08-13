import { getExtensionAssetPath, type OrgNoteApi } from 'orgnote-api';
import { excalidrawManifest } from './manifest';

const RUNTIME_ASSET_PREFIX = 'orgnote-extension-asset:';

type ExcalidrawAssetFetch = (uri: string | URL) => Response | Promise<Response>;

type ExcalidrawRuntimeGlobal = typeof globalThis & {
  __orgnoteExcalidrawFetch?: ExcalidrawAssetFetch;
};

export const createRuntimeAssetUri = (assetPath: string): string =>
  `${RUNTIME_ASSET_PREFIX}${assetPath}`;

export const isRuntimeAssetUri = (uri: string): boolean => uri.startsWith(RUNTIME_ASSET_PREFIX);

export const readRuntimeAsset = async (api: OrgNoteApi, uri: string): Promise<ArrayBuffer> => {
  const assetPath = uri.slice(RUNTIME_ASSET_PREFIX.length);
  const runtimePath = getExtensionAssetPath(excalidrawManifest, assetPath);
  const content = await api.core.useFileSystem().readFile(runtimePath, 'binary');
  if (!content) throw new Error(`Excalidraw runtime asset is missing: ${assetPath}`);
  return Uint8Array.from(content).buffer;
};

const createRuntimeResponse = async (api: OrgNoteApi, uri: string): Promise<Response> => {
  const content = await readRuntimeAsset(api, uri);
  return new Response(content, {
    status: 200,
    headers: { 'Content-Type': 'font/woff2' },
  });
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
