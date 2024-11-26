"use client";
import get from "lodash/get";
import { useCallback, useState } from "react";
import en from "./dictionaries/en.json";
import he from "./dictionaries/he.json";
import type {
	AllPaths,
	PrefixedPath,
	Results,
	TemplateParams,
	TranslationFunction,
	TranslationPath,
} from "./types";
const LANGUAGES_RESOURCES = {
	en,
	he,
};
/**
 * @description TranslatedText component
 * Translate a text to the current locale
 * This component can be used in the JSX
 * when you are using internal functions or portals that
 * cants use the useTranslation hook
 * @param text the path to the translation
 * @param templateParams object with params to replace values in the template
 * @example
 * <TranslatedText text="builder.tagId" />
 */
export function TranslatedText({
	text,
	templateParams,
}: { text: TranslationPath; templateParams?: TemplateParams }) {
	const { t } = useTranslation();
	return <>{t(text, templateParams)}</>;
}

/**
 * Lets use translated text or set locale

 * @param prefix (optional) the prefix of the path
 * @returns
 * 1. t: a function that takes a path and returns the translated text
 * 2. setLocale: a function that takes a locale and sets it
 * 3. locale: the current locale
 * @example
 * ```typescript
 * const { t, setLocale } = useTranslation();
 * t('analysis.pageTitle.evaluation');
 *
 * const { t, setLocale } = useTranslation('analysis');
 * t('pageTitle.evaluation');
 * ```
 */
export function useTranslation(): Results<TranslationFunction>;
export function useTranslation<
	Partial extends Exclude<AllPaths, TranslationPath>,
>(
	prefix: Partial,
): Results<TranslationFunction<PrefixedPath<TranslationPath, Partial>>>;

export function useTranslation<
	Partial extends Exclude<AllPaths, TranslationPath>,
>(prefix?: Partial) {
	const [locale, setLocale] = useState("en");

	const t = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny: let TS above handle the type
		(path: any, templateParams = {}): string =>
			prefix
				? getTranslation(`${locale}.${prefix}.${path}`, templateParams)
				: getTranslation(`${locale}.${path}`, templateParams),
		[locale, prefix],
	);

	return { t, locale, setLocale };
}

export function getTranslation(
	keyPath = "",
	templateParams: TemplateParams = {},
): string {
	let translation =
		(get(LANGUAGES_RESOURCES, keyPath) as unknown as string) || "";

	for (const templateKey in templateParams) {
		translation = translation.replaceAll(
			`\${${templateKey}}`,
			templateParams[templateKey],
		);
	}

	return translation;
}
