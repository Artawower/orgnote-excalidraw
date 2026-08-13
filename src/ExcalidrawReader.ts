import type {
  Buffer,
  BufferViewStateHandle,
  OrgNoteApi,
} from 'orgnote-api';
import { to } from 'orgnote-api/utils';
import type {
  ExcalidrawSession,
  ExcalidrawViewportState,
} from './excalidraw-session';
import type {
  ExcalidrawAppearance,
  ExcalidrawHost,
} from './excalidraw-react-host';

interface ExcalidrawReaderProps {
  readonly buffer: Buffer;
  readonly readonly?: boolean;
  readonly viewState?: BufferViewStateHandle<ExcalidrawViewportState>;
}

export const createExcalidrawReader = (api: OrgNoteApi) => {
  const { defineComponent, h, onBeforeUnmount, onMounted, ref, watch } = api.vue;
  return defineComponent({
    name: 'ExcalidrawReader',
    props: {
      buffer: { type: Object, required: true },
      readonly: Boolean,
      viewState: { type: Object, default: undefined },
    },
    emits: ['update:content'],
    setup(componentProps, { emit }) {
      const props = componentProps as unknown as ExcalidrawReaderProps;
      const container = ref<HTMLDivElement>();
      const theme = api.ui.useTheme();
      let host: ExcalidrawHost | undefined;
      let session: ExcalidrawSession | undefined;
      let isUnmounted = false;

      const getAppearance = (): ExcalidrawAppearance => ({
        isReadonly: props.readonly ?? false,
        theme: theme.isDark ? 'dark' : 'light',
      });

      const notifyLoadError = (): void => {
        api.core.useNotifications().notify({
          message: 'Unable to open the Excalidraw drawing',
          level: 'danger',
        });
      };

      const initializeReader = async (): Promise<void> => {
        const hostContainer = container.value;
        if (!hostContainer) return;
        const initialize = to(async () => {
          const [sessionModule, hostModule] = await Promise.all([
            import('./excalidraw-session'),
            import('./excalidraw-react-host'),
          ]);
          session = sessionModule.createExcalidrawSession({
            content: props.buffer.text,
            onContentChange: (content) => emit('update:content', content),
            viewState: props.viewState,
          });
          const mountedHost = await hostModule.mountExcalidrawHost({
            container: hostContainer,
            initialData: session.initialData,
            name: props.buffer.title,
            session,
            ...getAppearance(),
          });
          if (!isUnmounted) host = mountedHost;
          if (isUnmounted) mountedHost.destroy();
        }, 'Failed to initialize Excalidraw');

        const result = await initialize();
        if (result.isErr()) notifyLoadError();
      };

      const applyBufferContent = (content: string): void => {
        if (!session || !host) return;
        const result = to(session.applyBufferContent, 'Failed to reload Excalidraw')(content);
        if (result.isErr()) return notifyLoadError();
        if (result.value) host.applyScene(result.value);
      };

      const flushWhenHidden = (): void => {
        if (document.visibilityState === 'hidden') session?.flush();
      };

      watch(() => props.buffer.text, applyBufferContent);
      watch(
        [() => props.readonly, () => theme.isDark],
        () => host?.updateAppearance(getAppearance()),
      );

      onMounted(() => {
        document.addEventListener('visibilitychange', flushWhenHidden);
        void initializeReader();
      });

      onBeforeUnmount(() => {
        isUnmounted = true;
        document.removeEventListener('visibilitychange', flushWhenHidden);
        session?.flush();
        host?.destroy();
      });

      return () => h('div', { ref: container, class: 'excalidraw-reader' });
    },
  });
};
