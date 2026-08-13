import { expect, test, vi } from 'vitest';
import type { AppState, Zoom } from '@excalidraw/excalidraw/types';
import type { BufferViewStateHandle } from 'orgnote-api';
import {
  createExcalidrawSession,
  type ExcalidrawViewportState,
} from './excalidraw-session';

const EMPTY_SCENE = JSON.stringify({
  type: 'excalidraw',
  version: 2,
  source: 'https://excalidraw.com',
  elements: [],
  appState: { viewBackgroundColor: '#ffffff' },
  files: {},
});

test('createExcalidrawSession restores the initial buffer without rewriting it', () => {
  const onContentChange = vi.fn();
  const session = createExcalidrawSession({
    content: EMPTY_SCENE,
    onContentChange,
  });

  expect(session.initialData.elements).toEqual([]);
  expect(session.initialData.appState?.viewBackgroundColor).toBe('#ffffff');
  expect(onContentChange).not.toHaveBeenCalled();
});

test('Excalidraw session flushes a pending scene change to the buffer', () => {
  const onContentChange = vi.fn();
  const session = createExcalidrawSession({ content: EMPTY_SCENE, onContentChange });

  session.handleSceneChange({
    elements: [],
    appState: { viewBackgroundColor: '#eeeeee' } as AppState,
    files: {},
  });
  expect(onContentChange).not.toHaveBeenCalled();

  session.flush();

  const saved = JSON.parse(onContentChange.mock.calls[0]![0]) as {
    appState: { viewBackgroundColor: string };
  };
  expect(saved.appState.viewBackgroundColor).toBe('#eeeeee');
});

test('Excalidraw session debounces scene serialization', async () => {
  vi.useFakeTimers();
  const onContentChange = vi.fn();
  const session = createExcalidrawSession({
    content: EMPTY_SCENE,
    onContentChange,
    saveDelayMs: 20,
  });

  session.handleSceneChange({
    elements: [],
    appState: { viewBackgroundColor: '#dddddd' } as AppState,
    files: {},
  });
  await vi.advanceTimersByTimeAsync(19);
  expect(onContentChange).not.toHaveBeenCalled();

  await vi.advanceTimersByTimeAsync(1);
  expect(onContentChange).toHaveBeenCalledOnce();
  vi.useRealTimers();
});

test('Excalidraw session restores and persists tab viewport state', () => {
  const savedViewport = {
    scrollX: 10,
    scrollY: 20,
    zoom: 2,
  };
  const set = vi.fn();
  const viewState = {
    get: vi.fn(() => savedViewport),
    set,
    clear: vi.fn(),
  } satisfies BufferViewStateHandle<ExcalidrawViewportState>;
  const session = createExcalidrawSession({
    content: EMPTY_SCENE,
    onContentChange: vi.fn(),
    viewState,
  });

  expect(session.initialData.appState).toEqual(
    expect.objectContaining({
      scrollX: savedViewport.scrollX,
      scrollY: savedViewport.scrollY,
      zoom: { value: savedViewport.zoom },
    }),
  );

  const nextViewport = { scrollX: 30, scrollY: 40, zoom: { value: 1.5 } as Zoom };
  session.handleViewportChange(
    nextViewport.scrollX,
    nextViewport.scrollY,
    nextViewport.zoom,
  );
  expect(set).toHaveBeenCalledWith({
    scrollX: nextViewport.scrollX,
    scrollY: nextViewport.scrollY,
    zoom: nextViewport.zoom.value,
  });
});

test('Excalidraw session flushes local changes before an external update', () => {
  const onContentChange = vi.fn();
  const session = createExcalidrawSession({ content: EMPTY_SCENE, onContentChange });
  session.handleSceneChange({
    elements: [],
    appState: { viewBackgroundColor: '#bbbbbb' } as AppState,
    files: {},
  });

  const applied = session.applyBufferContent(
    EMPTY_SCENE.replace('#ffffff', '#cccccc'),
  );

  expect(applied).toBeUndefined();
  expect(onContentChange).toHaveBeenCalledOnce();
  expect(onContentChange.mock.calls[0]![0]).toContain('#bbbbbb');
});

test('Excalidraw session applies external buffer changes without echoing them', () => {
  const onContentChange = vi.fn();
  const session = createExcalidrawSession({ content: EMPTY_SCENE, onContentChange });
  const externalContent = JSON.stringify({
    type: 'excalidraw',
    version: 2,
    source: 'https://excalidraw.com',
    elements: [],
    appState: { viewBackgroundColor: '#cccccc' },
    files: {},
  });

  expect(session.applyBufferContent(EMPTY_SCENE)).toBeUndefined();
  const externalScene = session.applyBufferContent(externalContent);
  expect(externalScene?.appState?.viewBackgroundColor).toBe('#cccccc');

  session.handleSceneChange({
    elements: externalScene?.elements ?? [],
    appState: externalScene?.appState ?? {},
    files: externalScene?.files ?? {},
  });
  session.flush();
  expect(onContentChange).not.toHaveBeenCalled();
});
