// Export a function to get properties instead of top-level await
export async function getProperties() {
	return await import("../static-props/technologies.json").then((module) => module.default);
}

// For backwards compatibility, create a promise
export const properties = getProperties();

export type Properties = Awaited<ReturnType<typeof getProperties>>;
