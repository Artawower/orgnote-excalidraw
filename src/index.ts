import type { BufferViewerEntry, Extension } from "orgnote-api";
import { createExcalidrawReader } from "./ExcalidrawReader";
import { excalidrawManifest } from "./manifest";
import { installRuntimeAssetFetch } from "./runtime-assets";
import {
	EXCALIDRAW_FILE_PATTERN,
	EXCALIDRAW_VIEWER_ID,
	EXCALIDRAW_VIEW_STATE_VERSION,
} from "./constants";

const createViewer = (
	component: BufferViewerEntry["component"],
): BufferViewerEntry => ({
	pattern: EXCALIDRAW_FILE_PATTERN,
	component,
	meta: {
		id: EXCALIDRAW_VIEWER_ID,
		name: "Excalidraw Editor",
		icon: "sym_o_draw",
		priority: 100,
		viewState: { version: EXCALIDRAW_VIEW_STATE_VERSION },
	},
});

let removeRuntimeAssetFetch: (() => void) | undefined;

export const excalidrawExtension: Extension = {
	onMounted: (api) => {
		removeRuntimeAssetFetch = installRuntimeAssetFetch(api);
		api.core
			.useBufferViewer()
			.register(createViewer(createExcalidrawReader(api)));
	},
	onUnmounted: (api) => {
		api.core.useBufferViewer().unregister(EXCALIDRAW_VIEWER_ID);
		removeRuntimeAssetFetch?.();
		removeRuntimeAssetFetch = undefined;
	},
};

export const manifest = excalidrawManifest;
export default excalidrawExtension;
