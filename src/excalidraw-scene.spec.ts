import { expect, test } from "vitest";
import {
	InvalidExcalidrawSceneError,
	loadExcalidrawScene,
	serializeExcalidrawScene,
} from "./excalidraw-scene";
import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";

const EMPTY_APP_STATE = {
	viewBackgroundColor: "#ffffff",
} as AppState;

const createSceneFile = (files: BinaryFiles = {}): string =>
	JSON.stringify({
		type: "excalidraw",
		version: 2,
		source: "https://excalidraw.com",
		elements: [],
		appState: { viewBackgroundColor: "#ffffff" },
		files,
	});

test("loadExcalidrawScene creates a blank scene for empty content", async () => {
	const scene = await loadExcalidrawScene("");

	expect(scene.elements).toEqual([]);
	expect(scene.files).toEqual({});
	expect(scene.scrollToContent).toBe(true);
});

test("loadExcalidrawScene restores embedded files", async () => {
	const files = {
		image: {
			id: "image",
			mimeType: "image/png",
			dataURL: "data:image/png;base64,AA==",
			created: 1,
		},
	} as unknown as BinaryFiles;

	const scene = await loadExcalidrawScene(createSceneFile(files));

	expect(scene.files).toEqual(files);
	expect(scene.appState?.viewBackgroundColor).toBe("#ffffff");
});

test("loadExcalidrawScene identifies Org content stored as a drawing", () => {
	expect(() =>
		loadExcalidrawScene(":PROPERTIES:\n:ID: note-id\n:END:\n"),
	).toThrow("the file contains Org-mode content");
});

test("loadExcalidrawScene rejects invalid content without normalizing it", () => {
	expect(() => loadExcalidrawScene("{invalid")).toThrow(
		InvalidExcalidrawSceneError,
	);
});

test("serializeExcalidrawScene includes standard scene metadata and files", () => {
	const files = {
		image: {
			id: "image",
			mimeType: "image/png",
			dataURL: "data:image/png;base64,AA==",
			created: 1,
		},
	} as unknown as BinaryFiles;

	const elements = [
		{ type: "image", fileId: "image", isDeleted: false },
	] as unknown as readonly ExcalidrawElement[];
	const serialized = serializeExcalidrawScene({
		elements,
		appState: EMPTY_APP_STATE,
		files,
	});
	const scene = loadExcalidrawScene(serialized);

	expect(scene.elements).toHaveLength(1);
	expect(scene.files).toEqual(files);
});
