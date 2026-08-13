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

const ORG_CONTENT_PATTERN = /^(?::PROPERTIES:|#\+[A-Z_]+:|\*\s)/i;

export class InvalidExcalidrawSceneError extends Error {
	constructor(cause?: unknown, content = "") {
		const detail = ORG_CONTENT_PATTERN.test(content.trimStart())
			? ": the file contains Org-mode content"
			: "";
		super(`The file does not contain a valid Excalidraw scene${detail}`, {
			cause,
		});
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

const parseJson = to((content: string): unknown =>
	Reflect.apply(JSON.parse, JSON, [content]),
);

const restoreScene = (
	parsed: unknown,
	content: string,
): LoadedExcalidrawScene => {
	if (!isImportedScene(parsed)) {
		throw new InvalidExcalidrawSceneError(undefined, content);
	}
	return restore(parsed, null, null, { repairBindings: true });
};

const parseAndRestoreScene = (content: string) =>
	parseJson(content)
		.mapErr((cause) => new InvalidExcalidrawSceneError(cause, content))
		.andThen(
			to(
				(parsed): LoadedExcalidrawScene => restoreScene(parsed, content),
				(cause): InvalidExcalidrawSceneError =>
					cause instanceof InvalidExcalidrawSceneError
						? cause
						: new InvalidExcalidrawSceneError(cause, content),
			),
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
