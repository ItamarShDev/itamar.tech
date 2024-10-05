import { useRouter } from "next/router";

export function useTranslation(translations) {
	const { locale } = useRouter();
	if (!locale) return translations.en;
	return translations[locale];
}
export function useDirection() {
	const { locale } = useRouter();
	return locale === "he" ? "rtl" : "ltr";
}
