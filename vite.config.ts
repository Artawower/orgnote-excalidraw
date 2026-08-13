import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { excalidrawManifest } from './src/manifest';
import { createRuntimeAssetUri } from './src/runtime-assets';

const FONT_REFERENCE_PATTERN = /(["'])\.\/fonts\/([^"']+\.woff2)\1/g;
const ASSISTANT_FONT_FACE_PATTERN = /@font-face\{font-family:Assistant;[^}]+\}/g;
const DATA_URL_GUARD_PATTERN = /if\((\w+)\.startsWith\("data"\)\)return\[\1\];/g;
const FONT_FETCH_PATTERN = /fetch\((\w+),\{cache:"force-cache",headers:\{Accept:"font\/woff2"\}\}\)/g;
const ASSETS_DIRECTORY = 'assets';
const DIST_DIRECTORY = 'dist';
const RUNTIME_ASSET_PREFIX = 'orgnote-extension-asset:';

const copyDirectory = async (source: string, target: string): Promise<void> => {
  await mkdir(target, { recursive: true });
  const entries = await readdir(source, { withFileTypes: true });
  await Promise.all(
    entries.map((entry) => {
      const sourcePath = path.join(source, entry.name);
      const targetPath = path.join(target, entry.name);
      return entry.isDirectory()
        ? copyDirectory(sourcePath, targetPath)
        : copyFile(sourcePath, targetPath);
    }),
  );
};

const runtimeAssetsPlugin = (): Plugin => ({
  name: 'orgnote-runtime-assets',
  enforce: 'pre',
  transform(code, id) {
    if (!id.includes('@excalidraw/excalidraw/dist/')) return undefined;
    return code
      .replace(ASSISTANT_FONT_FACE_PATTERN, '')
      .replace(FONT_REFERENCE_PATTERN, (_match, quote: string, assetPath: string) =>
        `${quote}${createRuntimeAssetUri(`fonts/${assetPath}`)}${quote}`,
      )
      .replace(
        DATA_URL_GUARD_PATTERN,
        (_match, uri: string) =>
          `if(${uri}.startsWith("data")||${uri}.startsWith("${RUNTIME_ASSET_PREFIX}"))return[${uri}];`,
      )
      .replace(
        FONT_FETCH_PATTERN,
        'globalThis.__orgnoteExcalidrawFetch($1)',
      );
  },
  async closeBundle() {
    await copyDirectory(ASSETS_DIRECTORY, path.join(DIST_DIRECTORY, 'assets'));
    await writeFile(
      path.join(DIST_DIRECTORY, 'manifest.json'),
      `${JSON.stringify(excalidrawManifest, null, 2)}\n`,
    );
  },
});

export default defineConfig({
  plugins: [runtimeAssetsPlugin()],
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
