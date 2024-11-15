import { cache } from "react";
import { type Dictionary, getTranslations } from "../translations";
import { getCurrentLang } from "./headers";

export async function getTranslationsCache<P extends keyof Dictionary>(
	path: P,
) {
	const lang = await getCurrentLang();
	return await getTranslations(lang, path);
}
export const getDirectionCache = async () => {
	const lang = await getCurrentLang();
	return lang === "he" ? "rtl" : "ltr";
};

// You can add more cached functions here
export const getSiteConfig = cache(async () => {
	// Example of another cached function
	return {
		title: "Itamar Sharify",
		description: "Personal Website",
	};
});
