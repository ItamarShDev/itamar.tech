import { useRouter } from "next/router";

export function useTranslation(
	translations: Record<"en" | "he", Record<string, string>>,
) {
	const { locale } = useRouter();
	if (!locale) return translations.en;
	return translations[locale as "en" | "he"];
}
export function useDirection() {
	const { locale } = useRouter();
	return locale === "he" ? "rtl" : "ltr";
}
