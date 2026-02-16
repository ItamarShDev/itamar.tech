import { type Post, getSortedPostsData } from "lib/posts";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./blog-list.module.css";

export const metadata: Metadata = {
	title: "Blog",
	openGraph: {
		title: "Blog",
		description: "Blog",
		type: "website",
		url: "itamar.dev",
	},
	twitter: {
		card: "summary_large_image",
		title: "Blog",
		description: "Blog",
	},
};

function BlogRow({
	post,
	lang,
}: {
	post: Post;
	lang: string;
}) {
	return (
		<Link
			href={`/${lang}/blog/${post.slug}`}
			className={styles.blogRow}
		>
			<div className={styles.blogRowContent}>
				<span className={styles.blogRowTitle}>
					{post.metadata.title}
				</span>
				<span className={styles.blogRowSummary}>
					{post.metadata.summary}
				</span>
			</div>
			<span className={styles.blogRowDate}>{post.metadata.date}</span>
			<span className={styles.blogRowArrow}>→</span>
		</Link>
	);
}

export default async function BlogList({ params }) {
	const { lang } = await params;
	const allPostsData = getSortedPostsData(lang ?? "en");

	return (
		<div className={styles.blogList}>
			{allPostsData.map((post) => (
				<BlogRow key={post.slug} post={post} lang={lang} />
			))}
		</div>
	);
}
