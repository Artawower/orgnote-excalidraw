export interface RuntimeFontFaceInput {
	readonly family: string;
	readonly urls: readonly (string | URL)[];
	readonly sources: string;
	readonly descriptors: FontFaceDescriptors;
	readonly replace: (font: FontFace) => void;
}

export type RuntimeFontFaceFactory = (input: RuntimeFontFaceInput) => FontFace;

export type RuntimeFontFaceResolver = (
	font: string,
	text: string,
) => Promise<void>;

interface RuntimeFontRegistration {
	readonly family: string;
	readonly uri: string;
	readonly descriptors: FontFaceDescriptors;
	readonly placeholder: FontFace;
	readonly replace: (font: FontFace) => void;
}

interface RuntimeFontBridgeOptions {
	readonly isRuntimeAssetUri: (uri: string) => boolean;
	readonly readRuntimeAsset: (uri: string) => Promise<ArrayBuffer>;
}

export interface RuntimeFontBridge {
	readonly createFontFace: RuntimeFontFaceFactory;
	readonly resolveFontFaces: RuntimeFontFaceResolver;
	readonly release: () => void;
}

const PENDING_FONT_FAMILY = "__orgnote_pending_font__";
const UNICODE_RANGE_PREFIX = "U+";
const WILDCARD_CHARACTER = "?";

const parseRangeBoundary = (value: string, wildcardDigit: string): number =>
	Number.parseInt(value.replaceAll(WILDCARD_CHARACTER, wildcardDigit), 16);

const isCodePointInRange = (codePoint: number, range: string): boolean => {
	const normalized = range
		.trim()
		.toUpperCase()
		.replace(UNICODE_RANGE_PREFIX, "");
	const [start, end] = normalized.split("-");
	if (!start) return false;
	const lowerBound = parseRangeBoundary(start, "0");
	const upperBound = parseRangeBoundary(end ?? start, "F");
	return codePoint >= lowerBound && codePoint <= upperBound;
};

const isTextInUnicodeRange = (text: string, unicodeRange?: string): boolean => {
	if (!unicodeRange) return true;
	const ranges = unicodeRange.split(",");
	return Array.from(text).some((character) => {
		const codePoint = character.codePointAt(0);
		return (
			codePoint !== undefined &&
			ranges.some((range) => isCodePointInRange(codePoint, range))
		);
	});
};

const findRuntimeAssetUri = (
	urls: readonly (string | URL)[],
	isRuntimeAssetUri: (uri: string) => boolean,
): string | undefined => urls.map(String).find(isRuntimeAssetUri);

const createPlaceholderFont = (
	family: string,
	descriptors: FontFaceDescriptors,
): FontFace =>
	new FontFace(family, `local("${PENDING_FONT_FAMILY}")`, descriptors);

const matchesFontRequest = (
	registration: RuntimeFontRegistration,
	font: string,
	text: string,
): boolean =>
	font.includes(registration.family) &&
	isTextInUnicodeRange(text, registration.descriptors.unicodeRange);

export const createRuntimeFontBridge = (
	options: RuntimeFontBridgeOptions,
): RuntimeFontBridge => {
	const registrations = new Set<RuntimeFontRegistration>();
	const loadedFonts = new Set<FontFace>();
	const loadingFonts = new WeakMap<
		RuntimeFontRegistration,
		Promise<FontFace>
	>();
	let isReleased = false;

	const loadFont = async (
		registration: RuntimeFontRegistration,
	): Promise<FontFace> => {
		const content = await options.readRuntimeAsset(registration.uri);
		const font = await new FontFace(
			registration.family,
			content,
			registration.descriptors,
		).load();
		if (isReleased) return font;
		document.fonts.delete(registration.placeholder);
		document.fonts.add(font);
		loadedFonts.add(font);
		registration.replace(font);
		return font;
	};

	const resolveRegistration = async (
		registration: RuntimeFontRegistration,
	): Promise<void> => {
		const loading = loadingFonts.get(registration) ?? loadFont(registration);
		loadingFonts.set(registration, loading);
		await loading;
	};

	const createFontFace: RuntimeFontFaceFactory = (input) => {
		const uri = findRuntimeAssetUri(input.urls, options.isRuntimeAssetUri);
		if (!uri)
			return new FontFace(input.family, input.sources, input.descriptors);
		const placeholder = createPlaceholderFont(input.family, input.descriptors);
		registrations.add({
			family: input.family,
			uri,
			descriptors: input.descriptors,
			placeholder,
			replace: input.replace,
		});
		return placeholder;
	};

	const resolveFontFaces: RuntimeFontFaceResolver = async (font, text) => {
		const matching = Array.from(registrations).filter((registration) =>
			matchesFontRequest(registration, font, text),
		);
		await Promise.all(matching.map(resolveRegistration));
	};

	const release = (): void => {
		isReleased = true;
		registrations.forEach(({ placeholder }) =>
			document.fonts.delete(placeholder),
		);
		loadedFonts.forEach((font) => document.fonts.delete(font));
		registrations.clear();
		loadedFonts.clear();
	};

	return { createFontFace, resolveFontFaces, release };
};
