import { LinkCard } from "components";
import { getTranslationsCache } from "lib/server-cache";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Example Projects",
};

export default async function ExampleProjects() {
	const { links, websites } = await getTranslationsCache("example_projects");

	return (
		<div>
			{links.map((example) => (
				<LinkCard
					key={example.slug}
					route={`/example-projects/${example.slug}`}
					title={example.title}
					subTitle={example.summary}
				/>
			))}

			<LinkCard
				key={"hakapit"}
				newTab
				route={websites.hakapit.link}
				title={websites.hakapit.title}
				subTitle={websites.hakapit.summary}
			/>
		</div>
	);
}
