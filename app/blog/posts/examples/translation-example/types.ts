import type translation from "./dictionaries/en.json";

// biome-ignore lint/suspicious/noExplicitAny: let TS above handle the type
type AllPathsProps<T, Acc extends any[] = []> = T extends string
	? Acc
	: {
			[K in Extract<keyof T, string>]: Acc | AllPathsProps<T[K], [...Acc, K]>;
		}[Extract<keyof T, string>];

type PathsToStringProps<T> = T extends string
	? []
	: {
			[K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
		}[Extract<keyof T, string>];

type Join<T extends string[], D extends string> = T extends []
	? never
	: T extends [infer F]
		? F
		: T extends [infer F, ...infer R]
			? F extends string
				? `${F}${D}${Join<Extract<R, string[]>, D>}`
				: never
			: string;

export type AllPaths = Join<AllPathsProps<typeof translation>, ".">;

export type TranslationPath = Join<PathsToStringProps<typeof translation>, ".">;
export type TemplateParams = Record<string, string>;

export type TranslationFunction<Paths extends string = TranslationPath> = (
	path?: Paths | "",
	templateParams?: TemplateParams,
) => string;

export type PrefixedPath<
	Paths extends string,
	Prefix extends string,
> = Paths extends `${Prefix}.${infer Rest}` ? Rest : never;

export type Results<T> = {
	locale: string;
	setLocale: (locale: string) => void;
	t: T;
};
