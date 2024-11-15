import { LinkCard } from "components";
import { getTranslationsCache } from "lib/server-cache";
import styles from "./Links.module.css";

async function Links() {
	const translation = await getTranslationsCache("links");
	return (
		<div className={styles.container}>
			<LinkCard
				route="/resume"
				title={translation.resume.title}
				subTitle={translation.resume.subTitle}
			/>
			<LinkCard
				route="/blog"
				title={translation.blog.title}
				subTitle={translation.blog.subTitle}
			/>
			<LinkCard
				route="/example-projects"
				title={translation.examples.title}
				subTitle={translation.examples.subTitle}
			/>
		</div>
	);
}

export default Links;
