import { LinkCard } from "components";
import { getSortedPostsData } from "lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
};

function BlogCard({ post }) {
	return (
		<LinkCard
			key={post.id}
			route={`/blog/${post.slug}`}
			title={post.title}
			subTitle={post.summary}
			date={post.date}
		/>
	);
}

export default async function BlogList({ params }) {
	// Default to English if no locale is provided
	const allPostsData = getSortedPostsData((await params.lang) ?? "en");

	return (
		<div>
			{allPostsData.map((post) => (
				<BlogCard key={post.slug} post={post} />
			))}
		</div>
	);
}
