import { SocialRefs } from "components";
import RandomQuotes from "components/floating-quotes";
import { useTranslation } from "lib/hooks/useTranslation";
import styles from "./AboutMe.module.css";

const translations = {
	en: {
		title: "Itamar Sharify",
		subtitle: "Software Engineer",
	},
	he: { title: "איתמר שריפי", subtitle: "מהנדס תוכנה" },
};

type Translations = {
	title: string;
	subtitle: string;
};

function AboutMe({ quotes }) {
	const texts: Translations = useTranslation(translations);
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
