export function useTranslation(translations) {
	return translations.he;
}
export function getLanguageDirection(lang?: string) {
	return { direction: lang === "he" ? "rtl" : "ltr" };
}
export function useIsRTL(): boolean {
	return getLanguageDirection().direction === "rtl";
}
