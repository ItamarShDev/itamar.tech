import { CustomMDX } from "components/mdx";
import { getBlogPosts } from "lib/posts";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
export async function generateStaticParams() {
	const posts = getBlogPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({ params }) {
	const { lang, slug } = await params;
	const post = getBlogPosts(lang).find((post) => post.slug === slug);
	if (!post) {
		return;
	}

	const { title, summary: description, date: publishedTime } = post.metadata;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `itamar.tech/${lang}/blog/${post.slug}`,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
	};
}

export default async function Blog({ params }) {
	const { lang, slug } = await params;
	const post = getBlogPosts(lang).find((post) => post.slug === slug);

	if (!post) {
		notFound();
	}

	return (
		<section className={styles.blogPost}>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.metadata.title,
						datePublished: post.metadata.date,
						dateModified: post.metadata.date,
						description: post.metadata.summary,
						url: `${lang}/blog/${post.slug}`,
						author: {
							"@type": "Person",
							name: "itamar sharify",
						},
					}),
				}}
			/>
			<h1 className={styles.title}>{post.metadata.title}</h1>
			<div className={styles.subTitle}>{post.metadata.summary}</div>
			<div className={styles.date}>{post.metadata.date}</div>
			<article>
				<CustomMDX source={post.content} lang={lang} />
			</article>
		</section>
	);
}
