import { LinkCard } from "components";
import { getSortedPostsData } from "../lib/posts";

function Blog({ post }) {
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

export default function Blogs({ allPostsData }) {
	return (
		<div>
			{allPostsData.map((post) => (
				<Blog key={post.slug} post={post} />
			))}
		</div>
	);
}
export function getStaticProps({ locale }) {
	const allPostsData = getSortedPostsData(locale);
	return {
		props: {
			allPostsData,
			headerTitle: "Blog",
			title: "Blog",
			isCentered: true,
		},
	};
}
