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

function getMDXFiles(dir) {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
	const rawContent = fs.readFileSync(filePath, "utf-8");
	return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
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
export function getBlogPosts(locale = "en") {
	return getMDXData(path.join(process.cwd(), "app", "blog", "posts", locale));
}

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
	const posts = getBlogPosts(locale);
	// Sort posts by date
	return posts.sort((a, b) => {
		if (Date.parse(a.metadata.date) < Date.parse(b.metadata.date)) {
			return 1;
		}
		return -1;
	});
}

export function formatDate(_date: string, includeRelative = false) {
	const currentDate = new Date();
	let date = _date;
	if (!date.includes("T")) {
		date = `${date}T00:00:00`;
	}
	const targetDate = new Date(date);

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	const daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = "Today";
	}

	const fullDate = targetDate.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	if (!includeRelative) {
		return fullDate;
	}

	return `${fullDate} (${formattedDate})`;
}
