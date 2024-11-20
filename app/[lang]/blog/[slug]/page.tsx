import { getPostData } from "lib/posts";
import { renderMarkdown } from "lib/render-markdown";
import { getTranslationsCache } from "lib/server-cache";
import type { Metadata } from "next";
import BlogClient from "./blog-client";
import styles from "./page.module.css";

interface Props {
	params: Promise<{
		slug: string;
		lang: "en" | "he";
	}>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug, lang } = await params;
	const { data } = getPostData(slug, lang);
	return {
		title: data?.title,
	};
}

export default async function BlogPost({ params }: Props) {
	const { slug, lang } = await params;
	const { data, content } = getPostData(slug, lang);
	console.log(data);
	const html = await renderMarkdown(content);
	console.log("rendered markdown");
	const translations = await getTranslationsCache("blog");
	const emailTranslations = await getTranslationsCache("email");
	console.log("translations");
	if (!data) return null;

	return (
		<div id="blog-post" className={styles.blogPost}>
			<BlogClient
				data={data}
				html={html}
				translations={translations}
				emailTranslations={emailTranslations}
			/>
		</div>
	);
}
