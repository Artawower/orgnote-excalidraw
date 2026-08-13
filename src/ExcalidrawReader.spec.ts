import { beforeEach, expect, test, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import {
	defineComponent,
	h,
	nextTick,
	onBeforeUnmount,
	onMounted,
	reactive,
	ref,
	watch,
} from "vue";
import type { Buffer, OrgNoteApi } from "orgnote-api";
import { createExcalidrawReader } from "./ExcalidrawReader";
import { loadExcalidrawRuntime } from "./runtime-assets";

interface SessionOptionsStub {
	readonly content: string;
	readonly onContentChange: (content: string) => void;
}

const mocks = vi.hoisted(() => {
	const session = {
		initialData: { elements: [], appState: {}, files: {} },
		applyBufferContent: vi.fn(),
		handleSceneChange: vi.fn(),
		handleViewportChange: vi.fn(),
		flush: vi.fn(),
	};
	const host = {
		applyScene: vi.fn(),
		updateAppearance: vi.fn(),
		destroy: vi.fn(),
	};
	return {
		createSession: vi.fn<(options: SessionOptionsStub) => typeof session>(
			() => session,
		),
		host,
		mountHost: vi.fn(async () => host),
		logger: { error: vi.fn() },
		notifications: { notify: vi.fn() },
		session,
		theme: { isDark: false },
	};
});

vi.mock("./runtime-assets", () => ({
	loadExcalidrawRuntime: vi.fn(async () => ({
		createExcalidrawSession: mocks.createSession,
		mountExcalidrawHost: mocks.mountHost,
	})),
}));

const api = {
	core: {
		useNotifications: () => mocks.notifications,
	},
	utils: {
		logger: mocks.logger,
	},
	ui: {
		useTheme: () => mocks.theme,
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

const ExcalidrawReader = createExcalidrawReader(api);

beforeEach(() => {
	vi.clearAllMocks();
	mocks.theme.isDark = false;
});

const buffer = {
	uri: "file:/drawing.excalidraw",
	path: "/drawing.excalidraw",
	title: "drawing.excalidraw",
	text: '{"type":"excalidraw"}',
} as unknown as Buffer;

test("ExcalidrawReader mounts the client host with the buffer scene", async () => {
	const wrapper = mount(ExcalidrawReader, { props: { buffer } });
	await flushPromises();

	expect(mocks.createSession).toHaveBeenCalledWith(
		expect.objectContaining({ content: buffer.text }),
	);
	expect(mocks.mountHost).toHaveBeenCalledWith(
		expect.objectContaining({
			container: wrapper.find(".excalidraw-reader").element,
			initialData: mocks.session.initialData,
			name: buffer.title,
			theme: "light",
		}),
	);
});

test("ExcalidrawReader forwards serialized scene changes to the buffer contract", async () => {
	const wrapper = mount(ExcalidrawReader, { props: { buffer } });
	await flushPromises();
	const options = mocks.createSession.mock.calls[0]![0];

	options.onContentChange('{"type":"excalidraw","version":2}');

	expect(wrapper.emitted("update:content")).toEqual([
		['{"type":"excalidraw","version":2}'],
	]);
});

test("ExcalidrawReader flushes pending changes before unmounting", async () => {
	const wrapper = mount(ExcalidrawReader, { props: { buffer } });
	await flushPromises();

	wrapper.unmount();

	expect(mocks.session.flush).toHaveBeenCalledOnce();
	expect(mocks.host.destroy).toHaveBeenCalledOnce();
});

test("ExcalidrawReader reports runtime loading failures", async () => {
	vi.mocked(loadExcalidrawRuntime).mockRejectedValueOnce(
		new TypeError("Failed to fetch dynamically imported module"),
	);

	mount(ExcalidrawReader, { props: { buffer } });
	await flushPromises();

	expect(mocks.notifications.notify).toHaveBeenCalledWith(
		expect.objectContaining({
			message: expect.stringContaining(
				"Failed to fetch dynamically imported module",
			),
		}),
	);
	expect(mocks.createSession).not.toHaveBeenCalled();
});

test("ExcalidrawReader reports invalid scene content without mounting a canvas", async () => {
	mocks.createSession.mockImplementationOnce(() => {
		throw new Error("Invalid scene");
	});

	mount(ExcalidrawReader, { props: { buffer } });
	await flushPromises();

	expect(mocks.notifications.notify).toHaveBeenCalledWith(
		expect.objectContaining({
			level: "danger",
			message: expect.stringContaining("Invalid scene"),
		}),
	);
	expect(mocks.logger.error).toHaveBeenCalledOnce();
	expect(mocks.mountHost).not.toHaveBeenCalled();
});

test("ExcalidrawReader reports canvas mounting failures", async () => {
	mocks.mountHost.mockRejectedValueOnce(new Error("Canvas unavailable"));

	mount(ExcalidrawReader, { props: { buffer } });
	await flushPromises();

	expect(mocks.notifications.notify).toHaveBeenCalledWith(
		expect.objectContaining({
			message: expect.stringContaining("Canvas unavailable"),
		}),
	);
});

test("ExcalidrawReader applies external buffer changes to the mounted canvas", async () => {
	const bufferState = reactive({ ...buffer, text: buffer.text });
	mount(ExcalidrawReader, {
		props: { buffer: bufferState as unknown as Buffer },
	});
	await flushPromises();
	const externalScene = {
		elements: [],
		appState: { viewBackgroundColor: "#eeeeee" },
		files: {},
	};
	mocks.session.applyBufferContent.mockReturnValueOnce(externalScene);

	bufferState.text = '{"type":"excalidraw","version":2}';
	await nextTick();

	expect(mocks.host.applyScene).toHaveBeenCalledWith(externalScene);
});
