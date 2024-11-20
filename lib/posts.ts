import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
type Metadata = {
	id: string;
	title: string;
	slug: string;
	date: string;
	category: string;
	summary: string;
};
/**
 * Gets a list of all MDX file names in a directory.
 *
 * @param dir - The directory to search in.
 * @param locale - The locale to search for.
 * @returns An array of MDX file names.
 */
function getMDXFileNames(dir: string, locale = "en"): string[] {
	const fullPath = path.join(dir, locale);
	return fs
		.readdirSync(fullPath)
		.filter((fileName) => fileName.endsWith(".mdx"));
}
export function getSortedPostsData(locale = "en") {
	const postsDirectory = path.join(process.cwd(), "public", "posts");
	// Get file names under /posts
	const allPostsData = getMDXFileNames(postsDirectory, locale).map(
		(fileName) => {
			// Remove ".md" from file name to get id
			const id = fileName.replace(/\.md$/, "");
			// Read markdown file as string
			const fullPath = path.join(postsDirectory, locale, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");

			// Use gray-matter to parse the post metadata section
			const matterResult = matter(fileContents);
			// Combine the data with the id
			return {
				id,
				...matterResult.data,
			} as Metadata;
		},
	);

	// Sort posts by dateallPostsData
	return allPostsData.sort((a, b) => {
		if (Date.parse(a.date) < Date.parse(b.date)) {
			return 1;
		}
		return -1;
	});
}

/**
 * Get all post IDs.
 *
 * @param locale Post locale.
 * @returns Array of objects with "params" property containing post metadata.
 */
export function getAllPostIds(locale = "en"): { params: Metadata }[] {
	const postsDirectory = path.join(process.cwd(), "public", "posts");
	return getMDXFileNames(postsDirectory, locale).map((fileName) => {
		const fullPath = path.join(postsDirectory, locale, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data } = matter(fileContents);

		return {
			params: data as Metadata,
		};
	});
}

/**
 * Get post data by slug and locale.
 *
 * @param slug Post slug.
 * @param locale Post locale.
 * @returns Post data.
 */
export function getPostData(slug: string, locale: "en" | "he") {
	const postsDirectory = path.join(process.cwd(), "public", "posts");
	const fullPath = path.join(postsDirectory, locale, `${slug}.mdx`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	// Use gray-matter to parse the post metadata section
	const { data, content } = matter(fileContents);
	return {
		content,
		data,
	};
}
