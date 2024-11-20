import { LinkCard } from "components";
import { type Post, formatDate, getSortedPostsData } from "lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
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
			date={formatDate(post.metadata.date)}
		/>
	);
}

export default async function BlogList({ params }) {
	const { lang } = await params;
	// Default to English if no locale is provided
	const allPostsData = getSortedPostsData(lang ?? "en");
	// console.log(allPostsData);

	return (
		<div>
			{allPostsData.map((post) => (
				<BlogCard key={post.slug} post={post} lang={lang} />
			))}
		</div>
	);
}
