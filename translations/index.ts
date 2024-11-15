const dictionaries = {
	en: () => import("./dictionaries/en.json").then((module) => module.default),
	he: () => import("./dictionaries/he.json").then((module) => module.default),
};
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export const getDictionary: (locale: string) => Promise<Dictionary> = async (
	locale,
) => dictionaries[locale]();

export async function getTranslations<P extends keyof Dictionary>(
	locale: string,
	path: P,
) {
	const dictionary = await getDictionary(locale);
	return dictionary[path];
}
