import { SocialRefs } from "components";
import RandomQuotes from "components/floating-quotes";
import { getTranslationsCache } from "lib/server-cache";
import styles from "./AboutMe.module.css";

async function AboutMe({ quotes }) {
	const texts = await getTranslationsCache("about_me");
	return (
		<div className={styles.aboutMe}>
			<div className={styles.summary}>
				<h1>{texts.title}</h1>
				<h2>{texts.subtitle}</h2>

				<SocialRefs />
				<RandomQuotes quotes={quotes} />
			</div>
		</div>
	);
}

export default AboutMe;
