import type { Buffer, BufferViewStateHandle, OrgNoteApi } from "orgnote-api";
import { to } from "orgnote-api/utils";
import type {
	ExcalidrawSession,
	ExcalidrawViewportState,
} from "./excalidraw-session";
import type {
	ExcalidrawAppearance,
	ExcalidrawHost,
} from "./excalidraw-react-host";
import { loadExcalidrawRuntime } from "./runtime-assets";

interface ExcalidrawReaderProps {
	readonly buffer: Buffer;
	readonly readonly?: boolean;
	readonly viewState?: BufferViewStateHandle<ExcalidrawViewportState>;
}

export const createExcalidrawReader = (api: OrgNoteApi) => {
	const { defineComponent, h, onBeforeUnmount, onMounted, ref, watch } =
		api.vue;
	return defineComponent({
		name: "ExcalidrawReader",
		props: {
			buffer: { type: Object, required: true },
			readonly: Boolean,
			viewState: { type: Object, default: undefined },
		},
		emits: ["update:content"],
		setup(componentProps, { emit }) {
			const props = componentProps as unknown as ExcalidrawReaderProps;
			const container = ref<HTMLDivElement>();
			const theme = api.ui.useTheme();
			let host: ExcalidrawHost | undefined;
			let session: ExcalidrawSession | undefined;
			let isUnmounted = false;

			const getAppearance = (): ExcalidrawAppearance => ({
				isReadonly: props.readonly ?? false,
				theme: theme.isDark ? "dark" : "light",
			});

			const getRootCause = (error: Error): Error =>
				error.cause instanceof Error ? getRootCause(error.cause) : error;

			const notifyLoadError = (error?: Error): void => {
				const cause = error ? getRootCause(error) : undefined;
				if (cause) api.utils.logger.error(cause.message, cause);
				const detail = cause?.message ? `: ${cause.message}` : "";
				api.core.useNotifications().notify({
					message: `Unable to open the Excalidraw drawing${detail}`,
					level: "danger",
				});
			};

			const initializeReader = async (): Promise<void> => {
				const hostContainer = container.value;
				if (!hostContainer) return;

				const runtimeResult = await to(
					loadExcalidrawRuntime,
					"Failed to load Excalidraw runtime",
				)(api);
				if (runtimeResult.isErr()) return notifyLoadError(runtimeResult.error);

				const sessionResult = to(
					runtimeResult.value.createExcalidrawSession,
					"Failed to parse Excalidraw drawing",
				)({
					content: props.buffer.text,
					onContentChange: (content) => emit("update:content", content),
					viewState: props.viewState,
				});
				if (sessionResult.isErr()) return notifyLoadError(sessionResult.error);
				session = sessionResult.value;

				const hostResult = await to(
					runtimeResult.value.mountExcalidrawHost,
					"Failed to mount Excalidraw canvas",
				)({
					container: hostContainer,
					initialData: session.initialData,
					name: props.buffer.title,
					session,
					...getAppearance(),
				});
				if (hostResult.isErr()) return notifyLoadError(hostResult.error);
				if (!isUnmounted) host = hostResult.value;
				if (isUnmounted) hostResult.value.destroy();
			};

			const applyBufferContent = (content: string): void => {
				if (!session || !host) return;
				const result = to(
					session.applyBufferContent,
					"Failed to reload Excalidraw",
				)(content);
				if (result.isErr()) return notifyLoadError();
				if (result.value) host.applyScene(result.value);
			};

			const flushWhenHidden = (): void => {
				if (document.visibilityState === "hidden") session?.flush();
			};

			watch(() => props.buffer.text, applyBufferContent);
			watch([() => props.readonly, () => theme.isDark], () =>
				host?.updateAppearance(getAppearance()),
			);

			onMounted(() => {
				document.addEventListener("visibilitychange", flushWhenHidden);
				void initializeReader();
			});

			onBeforeUnmount(() => {
				isUnmounted = true;
				document.removeEventListener("visibilitychange", flushWhenHidden);
				session?.flush();
				host?.destroy();
			});

			return () =>
				h("div", {
					ref: container,
					class: "excalidraw-reader",
					style: {
						width: "100%",
						height: "100%",
						minHeight: 0,
						overflow: "hidden",
					},
				});
		},
	});
};
