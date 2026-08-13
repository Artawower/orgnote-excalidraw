import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"orgnote-api": path.resolve("node_modules/orgnote-api"),
		},
	},
	test: {
		environment: "happy-dom",
		globals: true,
		setupFiles: ["./test/setup-tests.ts"],
		server: {
			deps: {
				inline: ["@excalidraw/excalidraw", "open-color"],
			},
		},
	},
});
