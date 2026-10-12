export const workSlugs = ["reactwind", "hakapit", "conflict-bars"] as const;
export type WorkSlug = (typeof workSlugs)[number];
export function isWorkSlug(slug: string): slug is WorkSlug {
	return workSlugs.some((work) => work === slug);
}
export const workUrls: Record<WorkSlug, string> = {
	reactwind: "https://reactwind.itamar.dev",
	hakapit: "https://hakapit.online",
	"conflict-bars": "https://conflict-bars.itamar.dev",
};
