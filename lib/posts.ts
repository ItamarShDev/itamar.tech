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
export type Post = {
	metadata: Metadata;
	slug: string;
	content: string;
};
function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	const match = frontmatterRegex.exec(fileContent);
	const frontMatterBlock = match?.[1];
	const content = fileContent.replace(frontmatterRegex, "").trim();
	const frontMatterLines = frontMatterBlock?.trim().split("\n");
	const metadata: Partial<Metadata> = {};

	for (const line of frontMatterLines || []) {
		const [key, ...valueArr] = line.split(": ");
		let value = valueArr.join(": ").trim();
		value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
		metadata[key.trim() as keyof Metadata] = value;
	}

	return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
	const rawContent = fs.readFileSync(filePath, "utf-8");
	return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
	const mdxFiles = getMDXFiles(dir);
	return mdxFiles.map((file) => {
		const { metadata, content } = readMDXFile(path.join(dir, file));
		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}
function getMDXFileData(dir: string, slug: string) {
	const mdxFiles = getMDXFiles(dir);
	const file = mdxFiles.find(
		(file) => path.basename(file, path.extname(file)) === slug,
	);
	if (!file) {
		return null;
	}
	const { metadata, content } = readMDXFile(path.join(dir, file));

	return {
		metadata,
		slug,
		content,
	};
}

const getPathByLocale = (locale: string) => {
	return path.join(process.cwd(), "app", "blog", "posts", locale);
};

export function getBlogPost(locale = "en", slug = "") {
	try {
		const postPath = getPathByLocale(locale);
		return getMDXFileData(postPath, slug);
	} catch (error) {
		console.error("Error retrieving blog post:", error);
		return null;
	}
}
export function getBlogPosts(locale = "en") {
	return getMDXData(getPathByLocale(locale));
}
export function getSortedPostsData(locale = "en") {
	const posts = getMDXData(getPathByLocale(locale));
	// Sort posts by date
	return posts.sort((a, b) => {
		if (Date.parse(a.metadata.date) < Date.parse(b.metadata.date)) {
			return 1;
		}
		return -1;
	});
}
