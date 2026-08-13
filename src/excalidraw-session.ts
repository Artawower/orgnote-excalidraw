import type { Zoom } from '@excalidraw/excalidraw/types';
import type { BufferViewStateHandle } from 'orgnote-api';
import {
  loadExcalidrawScene,
  serializeExcalidrawScene,
  type ExcalidrawSceneSnapshot,
  type LoadedExcalidrawScene,
} from './excalidraw-scene';

const DEFAULT_SAVE_DELAY_MS = 250;

export interface ExcalidrawViewportState {
  readonly [key: string]: number;
  readonly scrollX: number;
  readonly scrollY: number;
  readonly zoom: number;
}

export interface ExcalidrawSessionOptions {
  readonly content: string;
  readonly onContentChange: (content: string) => void;
  readonly saveDelayMs?: number;
  readonly viewState?: BufferViewStateHandle<ExcalidrawViewportState>;
}

export interface ExcalidrawSession {
  readonly initialData: LoadedExcalidrawScene;
  readonly applyBufferContent: (content: string) => LoadedExcalidrawScene | undefined;
  readonly handleSceneChange: (scene: ExcalidrawSceneSnapshot) => void;
  readonly handleViewportChange: (scrollX: number, scrollY: number, zoom: Zoom) => void;
  readonly flush: () => void;
}

const serializeInitialData = (scene: LoadedExcalidrawScene): string =>
  serializeExcalidrawScene({
    elements: scene.elements ?? [],
    appState: scene.appState ?? {},
    files: scene.files ?? {},
  });

const restoreViewport = (
  scene: LoadedExcalidrawScene,
  viewport?: ExcalidrawViewportState,
): LoadedExcalidrawScene => {
  if (!viewport) return scene;
  return {
    ...scene,
    appState: {
      ...scene.appState,
      scrollX: viewport.scrollX,
      scrollY: viewport.scrollY,
      zoom: { value: viewport.zoom as Zoom['value'] },
    },
    scrollToContent: false,
  };
};

export const createExcalidrawSession = ({
  content,
  onContentChange,
  saveDelayMs = DEFAULT_SAVE_DELAY_MS,
  viewState,
}: ExcalidrawSessionOptions): ExcalidrawSession => {
  const initialData = restoreViewport(loadExcalidrawScene(content), viewState?.get());
  let lastBufferContent = content;
  let lastSerializedScene = serializeInitialData(initialData);
  let pendingScene: ExcalidrawSceneSnapshot | undefined;
  let saveTimer: ReturnType<typeof setTimeout> | undefined;

  const cancelScheduledSave = (): void => {
    if (saveTimer === undefined) return;
    clearTimeout(saveTimer);
    saveTimer = undefined;
  };

  const flush = (): void => {
    cancelScheduledSave();
    if (!pendingScene) return;
    const serialized = serializeExcalidrawScene(pendingScene);
    pendingScene = undefined;
    if (serialized === lastSerializedScene) return;
    lastBufferContent = serialized;
    lastSerializedScene = serialized;
    onContentChange(serialized);
  };

  const applyBufferContent = (nextContent: string): LoadedExcalidrawScene | undefined => {
    if (nextContent === lastBufferContent) return undefined;
    if (pendingScene) {
      flush();
      return undefined;
    }
    const scene = restoreViewport(loadExcalidrawScene(nextContent), viewState?.get());
    cancelScheduledSave();
    pendingScene = undefined;
    lastBufferContent = nextContent;
    lastSerializedScene = serializeInitialData(scene);
    return scene;
  };

  const handleSceneChange = (scene: ExcalidrawSceneSnapshot): void => {
    pendingScene = scene;
    cancelScheduledSave();
    saveTimer = setTimeout(flush, saveDelayMs);
  };

  const handleViewportChange = (scrollX: number, scrollY: number, zoom: Zoom): void => {
    viewState?.set({ scrollX, scrollY, zoom: zoom.value });
  };

  return {
    initialData,
    applyBufferContent,
    handleSceneChange,
    handleViewportChange,
    flush,
  };
};
