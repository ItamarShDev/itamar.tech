import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
type Metadata = {
	id: string;
	title: string;
	slug: string;
	date: string;
	category: string;
	summary: string;
};
const postsDirectory = path.join(process.cwd(), "posts");
function getMDXFileNames(dir, locale = "en") {
	const fullPath = path.join(dir, locale);
	return fs
		.readdirSync(fullPath)
		.filter((fileName) => fileName.endsWith(".mdx"));
}
export function getSortedPostsData(locale = "en") {
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

export function getAllPostIds(locale = "en") {
	return getMDXFileNames(postsDirectory, locale).map((fileName) => {
		const fullPath = path.join(postsDirectory, locale, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data } = matter(fileContents);

		return {
			params: {
				...data,
			},
		};
	});
}

export function getPostData(slug, locale) {
	const fullPath = path.join(postsDirectory, locale, `${slug}.mdx`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// Use gray-matter to parse the post metadata section
	const { data, content } = matter(fileContents);

	return {
		content,
		data,
	};
}
