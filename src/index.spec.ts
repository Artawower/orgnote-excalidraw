import { beforeEach, expect, test, vi } from "vitest";
import {
	defineComponent,
	h,
	onBeforeUnmount,
	onMounted,
	ref,
	watch,
} from "vue";
import type { OrgNoteApi } from "orgnote-api";
import { EXCALIDRAW_VIEWER_ID } from "./constants";
import { excalidrawExtension } from "./index";

const runtimeAssetMocks = vi.hoisted(() => ({
	release: vi.fn(),
	removeFetch: vi.fn(),
}));
vi.mock("./runtime-assets", () => ({
	installRuntimeAssetFetch: vi.fn(() => runtimeAssetMocks.removeFetch),
	releaseExcalidrawRuntimeAssets: runtimeAssetMocks.release,
	loadExcalidrawRuntime: vi.fn(),
}));

const register = vi.fn();
const unregister = vi.fn();
const api = {
	core: {
		useBufferViewer: () => ({ register, unregister }),
	},
	vue: {
		defineComponent,
		h,
		onBeforeUnmount,
		onMounted,
		ref,
		watch,
	},
} as unknown as OrgNoteApi;

beforeEach(() => {
	vi.clearAllMocks();
});

test("Excalidraw extension registers a versioned file viewer", async () => {
	await excalidrawExtension.onMounted?.(api);

	expect(register).toHaveBeenCalledWith(
		expect.objectContaining({
			pattern: "\\.excalidraw$",
			meta: expect.objectContaining({
				id: EXCALIDRAW_VIEWER_ID,
				viewState: { version: 1 },
			}),
		}),
	);
});

test("Excalidraw extension unregisters its viewer on deactivation", async () => {
	await excalidrawExtension.onUnmounted?.(api);

	expect(unregister).toHaveBeenCalledWith(EXCALIDRAW_VIEWER_ID);
	expect(runtimeAssetMocks.release).toHaveBeenCalledOnce();
	expect(runtimeAssetMocks.removeFetch).toHaveBeenCalledOnce();
});
