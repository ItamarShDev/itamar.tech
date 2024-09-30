import { AboutMe, Avatar, Links, Stats } from "components";
import FloatingButton from "components/FloatingButton";
import { useTrackVisibility } from "lib/hooks";
import styles from "./HomePage.module.css";

export default function HomePage({ quotes }) {
	const [ref, { isVisible, wasEverVisible }] = useTrackVisibility();
	const showStats = isVisible || wasEverVisible;
	return (
		<article className={styles.article}>
			<section className={styles.image}>
				<Avatar />
			</section>
			<section className={styles.aboutMe}>
				<AboutMe quotes={quotes} />
			</section>
			<section className={`${styles.stats} ${styles.section}`} ref={ref}>
				{showStats && <Stats />}
			</section>
			<section className={`${styles.links} ${styles.section}`}>
				<Links />
			</section>
			<footer className={styles.footer}>
				<FloatingButton />
			</footer>
		</article>
	);
}
