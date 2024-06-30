
export function useTranslation(translations) {
	return translations['he'];
}
export function getLanguageDirection(lang?: string): object {
	return { direction: lang === "he" ? "rtl" : "ltr" };
}
export function useIsRTL(): boolean {
	return true
}
