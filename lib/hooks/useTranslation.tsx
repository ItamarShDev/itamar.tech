import { useRouter } from "next/router";

export function useTranslation(translations) {
    const { locale } = useRouter();
    return translations[locale];
}
export function useLanguageDirection(): object {
    const { locale } = useRouter();
    return { direction: locale === "he" ? "rtl" : "ltr" };
}
export function useIsRTL(): boolean {
    const { locale } = useRouter();
    return locale === "he";
}
