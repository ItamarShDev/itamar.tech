import { LinkCard } from "components";
import { getTranslationsCache } from "lib/server-cache";
import type { Metadata } from "next";
import styles from "./styles.module.css";

export const metadata: Metadata = {
	title: "Example Projects",
};

export default async function ExampleProjects() {
	const { links, websites, externalWebsites, examplesTitle } =
		await getTranslationsCache("example_projects");

	return (
		<div>
			<h4 className={styles.title}>{examplesTitle}</h4>
			{links.map((example) => (
				<LinkCard
					key={example.slug}
					route={`/example-projects/${example.slug}`}
					title={example.title}
					subTitle={example.summary}
				/>
			))}

			<h4 className={styles.title}>{externalWebsites}</h4>

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
