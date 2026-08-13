import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./test/setup-tests.ts'],
    server: {
      deps: {
        inline: ['@excalidraw/excalidraw', 'open-color'],
      },
    },
  },
});
