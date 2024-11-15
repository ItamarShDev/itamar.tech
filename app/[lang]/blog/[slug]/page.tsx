import { getAllPostIds, getPostData } from "lib/posts";
import renderMarkdown from "lib/render-markdown";
import { getTranslationsCache } from "lib/server-cache";
import type { Metadata } from "next";
import BlogClient from "./blog-client";
import styles from "./page.module.css";

interface Props {
	params: {
		slug: string;
		lang: string;
	};
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { data } = getPostData(params.slug, params.lang);
	return {
		title: data?.title,
	};
}

export async function generateStaticParams() {
	const paths = getAllPostIds();
	return paths.map((path) => ({
		slug: path.params.slug,
	}));
}

export default async function BlogPost({ params }: Props) {
	const { data, content } = getPostData(params.slug, params.lang);
	const html = await renderMarkdown(content);
	const translations = await getTranslationsCache("blog");
	const emailTranslations = await getTranslationsCache("email");
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
