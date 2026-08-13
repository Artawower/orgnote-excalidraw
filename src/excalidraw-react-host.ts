import type { Excalidraw as ExcalidrawComponent } from '@excalidraw/excalidraw';
import type {
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
  SceneData,
} from '@excalidraw/excalidraw/types';
import type { createElement as ReactCreateElement } from 'react';
import type { createRoot as CreateRoot, Root } from 'react-dom/client';
import type { LoadedExcalidrawScene } from './excalidraw-scene';
import type { ExcalidrawSession } from './excalidraw-session';

export interface ExcalidrawAppearance {
  readonly isReadonly: boolean;
  readonly theme: 'light' | 'dark';
}

export interface ExcalidrawHostOptions extends ExcalidrawAppearance {
  readonly container: HTMLElement;
  readonly initialData: LoadedExcalidrawScene;
  readonly name: string;
  readonly session: ExcalidrawSession;
}

export interface ExcalidrawHost {
  readonly applyScene: (scene: LoadedExcalidrawScene) => void;
  readonly updateAppearance: (appearance: ExcalidrawAppearance) => void;
  readonly destroy: () => void;
}

interface ExcalidrawRuntime {
  readonly createElement: typeof ReactCreateElement;
  readonly createRoot: typeof CreateRoot;
  readonly Excalidraw: typeof ExcalidrawComponent;
  readonly captureNever: NonNullable<SceneData['captureUpdate']>;
}

const disableEmbeddable = (): false => false;

const loadRuntime = async (): Promise<ExcalidrawRuntime> => {
  const [{ default: styles }, react, reactDom, excalidraw] = await Promise.all([
    import('@excalidraw/excalidraw/index.css?inline'),
    import('react'),
    import('react-dom/client'),
    import('@excalidraw/excalidraw'),
  ]);
  const style = document.createElement('style');
  style.dataset.orgnoteExcalidraw = '';
  style.textContent = styles;
  document.head.append(style);
  return {
    createElement: react.createElement,
    createRoot: reactDom.createRoot,
    Excalidraw: excalidraw.Excalidraw,
    captureNever: excalidraw.CaptureUpdateAction.NEVER,
  };
};

class MountedExcalidrawHost implements ExcalidrawHost {
  private api?: ExcalidrawImperativeAPI;
  private appearance: ExcalidrawAppearance;
  private readonly root: Root;

  constructor(
    private readonly options: ExcalidrawHostOptions,
    private readonly runtime: ExcalidrawRuntime,
  ) {
    this.appearance = options;
    this.root = runtime.createRoot(options.container);
    this.render();
  }

  applyScene(scene: LoadedExcalidrawScene): void {
    if (!this.api) return;
    this.api.resetScene();
    this.api.updateScene({
      elements: scene.elements,
      appState: scene.appState,
      captureUpdate: this.runtime.captureNever,
    });
    this.api.addFiles(Object.values(scene.files));
    this.api.history.clear();
  }

  updateAppearance(appearance: ExcalidrawAppearance): void {
    this.appearance = appearance;
    this.render();
  }

  destroy(): void {
    this.root.unmount();
  }

  private createProps(): ExcalidrawProps {
    return {
      initialData: this.options.initialData,
      excalidrawAPI: (api) => {
        this.api = api;
      },
      name: this.options.name,
      theme: this.appearance.theme,
      viewModeEnabled: this.appearance.isReadonly,
      autoFocus: true,
      handleKeyboardGlobally: false,
      validateEmbeddable: disableEmbeddable,
      UIOptions: {
        canvasActions: {
          export: false,
          loadScene: false,
          saveToActiveFile: false,
          toggleTheme: false,
        },
      },
      onChange: (elements, appState, files) => {
        this.options.session.handleSceneChange({ elements, appState, files });
      },
      onScrollChange: this.options.session.handleViewportChange,
    };
  }

  private render(): void {
    const element = this.runtime.createElement(
      this.runtime.Excalidraw,
      this.createProps(),
    );
    this.root.render(element);
  }
}

export const mountExcalidrawHost = async (
  options: ExcalidrawHostOptions,
): Promise<ExcalidrawHost> => new MountedExcalidrawHost(options, await loadRuntime());
