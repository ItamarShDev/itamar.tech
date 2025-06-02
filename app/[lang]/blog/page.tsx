import { LinkCard } from "components";
import { type Post, getSortedPostsData } from "lib/posts";
import type { Metadata } from "next";

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

function BlogCard({
	post,
	lang,
}: {
	post: Post;
	lang: string;
}) {
	return (
		<LinkCard
			key={post.slug}
			route={`/${lang}/blog/${post.slug}`}
			title={post.metadata.title}
			subTitle={post.metadata.summary}
			date={post.metadata.date}
		/>
	);
}

export default async function BlogList({ params }) {
	const { lang } = await params;
	// Default to English if no locale is provided
	const allPostsData = getSortedPostsData(lang ?? "en");

	return (
		<div>
			{allPostsData.map((post) => (
				<BlogCard key={post.slug} post={post} lang={lang} />
			))}
		</div>
	);
}
