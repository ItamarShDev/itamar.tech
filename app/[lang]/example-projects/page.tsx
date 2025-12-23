import { LinkCard } from "components";
import { getCurrentLang } from "lib/headers";
import { getTranslationsCache } from "lib/server-cache";
import type { Metadata } from "next";
import styles from "./styles.module.css";

export const metadata: Metadata = {
	title: "Itamar Sharify - Example Projects",
	openGraph: {
		title: "Example Projects",
		description: "Example Projects",
		type: "website",
		url: "itamar.dev/example-projects",
		images: ["/images/meta-image.png"],
	},
	twitter: {
		card: "summary_large_image",
		title: "Example Projects",
		description: "Example Projects",
		images: ["/images/meta-image.png"],
	},
};

export default async function ExampleProjects() {
	const lang = await getCurrentLang();
	const { links, websites, externalWebsites, examplesTitle } =
		await getTranslationsCache("example_projects");

	return (
		<div>
			<h4 className={styles.title}>{examplesTitle}</h4>
			{links.map((example) => (
				<LinkCard
					key={example.slug}
					route={`/${lang}/example-projects/${example.slug}`}
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
