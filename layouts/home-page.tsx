import { AboutMe, Avatar, Links, Stats } from "components";
import styles from "./HomePage.module.css";

export default function HomePage({ quotes }) {
	return (
		<article className={styles.article}>
			<section className={styles.image}>
				<Avatar />
			</section>
			<section className={styles.aboutMe}>
				<AboutMe quotes={quotes} />
			</section>
			<section className={`${styles.stats} ${styles.section}`}>
				<Stats />
			</section>
			<section className={`${styles.links} ${styles.section}`}>
				<Links />
			</section>
		</article>
	);
}
