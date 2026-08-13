import type { ExtensionManifest } from 'orgnote-api';

export const excalidrawManifest: ExtensionManifest = {
  name: 'excalidraw',
  version: '0.1.0',
  category: 'extension',
  description: 'Open and edit Excalidraw drawings',
  source: {
    type: 'git',
    repo: 'https://github.com/Artawower/orgnote-excalidraw',
  },
  keywords: ['drawing', 'diagram', 'whiteboard', 'excalidraw'],
  license: 'GPL-3.0-or-later',
};
