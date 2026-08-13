import { restore, serializeAsJSON } from "@excalidraw/excalidraw";
import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types";
import type { ImportedDataState } from "@excalidraw/excalidraw/data/types";
import type { RestoredDataState } from "@excalidraw/excalidraw/data/restore";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import { isPresent, to } from "orgnote-api/utils";

export interface ExcalidrawSceneSnapshot {
	readonly elements: readonly ExcalidrawElement[];
	readonly appState: Partial<AppState>;
	readonly files: BinaryFiles;
}

export interface LoadedExcalidrawScene {
	readonly elements: RestoredDataState["elements"];
	readonly appState: RestoredDataState["appState"];
	readonly files: BinaryFiles;
	readonly scrollToContent?: boolean;
}

export class InvalidExcalidrawSceneError extends Error {
	constructor(cause?: unknown) {
		super("The file does not contain a valid Excalidraw scene", { cause });
		this.name = "InvalidExcalidrawSceneError";
	}
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === "object" && isPresent(value);

const isImportedScene = (value: unknown): value is ImportedDataState => {
	if (!isRecord(value) || value.type !== "excalidraw") return false;
	if (value.elements !== undefined && !Array.isArray(value.elements))
		return false;
	if (value.appState !== undefined && !isRecord(value.appState)) return false;
	return value.files === undefined || isRecord(value.files);
};

const createBlankScene = (): LoadedExcalidrawScene => ({
	...restore({ elements: [], appState: {}, files: {} }, null, null),
	scrollToContent: true,
});

const parseAndRestoreScene = to(
	(content: string): LoadedExcalidrawScene => {
		const parsed: unknown = JSON.parse(content);
		if (!isImportedScene(parsed)) throw new InvalidExcalidrawSceneError();
		return restore(parsed, null, null, { repairBindings: true });
	},
	(cause): InvalidExcalidrawSceneError =>
		cause instanceof InvalidExcalidrawSceneError
			? cause
			: new InvalidExcalidrawSceneError(cause),
);

export const loadExcalidrawScene = (content: string): LoadedExcalidrawScene => {
	if (!content.trim()) return createBlankScene();

	const result = parseAndRestoreScene(content);
	if (result.isErr()) throw result.error;
	return result.value;
};

export const serializeExcalidrawScene = ({
	elements,
	appState,
	files,
}: ExcalidrawSceneSnapshot): string =>
	serializeAsJSON(elements, appState, files, "local");
