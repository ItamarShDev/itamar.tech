export const properties = await import(
	"../static-props/technologies.json"
).then((module) => module.default);

export type Properties = Awaited<typeof properties>;
