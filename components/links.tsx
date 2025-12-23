import { LinkCard } from "components";
import { getCurrentLang } from "lib/headers";
import { getTranslationsCache } from "lib/server-cache";
import styles from "./Links.module.css";

async function Links() {
	const lang = await getCurrentLang();
	const translation = await getTranslationsCache("links");
	return (
		<div className={styles.container}>
			<LinkCard
				route={`/${lang}/resume`}
				title={translation.resume.title}
				subTitle={translation.resume.subTitle}
			/>
			<LinkCard
				route={`/${lang}/blog`}
				title={translation.blog.title}
				subTitle={translation.blog.subTitle}
			/>
			<LinkCard
				route={`/${lang}/example-projects`}
				title={translation.examples.title}
				subTitle={translation.examples.subTitle}
			/>
		</div>
	);
}

export default Links;
