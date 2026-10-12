import styles from "components/portfolio/portfolio.module.css";
import { getCurrentLang } from "lib/headers";
import { getTranslationsCache } from "lib/server-cache";
import Link from "next/link";
export default async function Footer() {
	const [lang, copy] = await Promise.all([
		getCurrentLang(),
		getTranslationsCache("portfolio"),
	]);
	return (
		<footer className={styles.footer}>
			<span className={styles.footerNote}>{copy.footer}</span>
			<nav aria-label={copy.elsewhere}>
				<Link href={`/${lang}/resume`}>{copy.resume}</Link>
				<a
					href="https://github.com/ItamarShDev"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub ↗
				</a>
				<a
					href="https://www.linkedin.com/in/itamar-sharify-362289149"
					target="_blank"
					rel="noopener noreferrer"
				>
					LinkedIn ↗
				</a>
			</nav>
		</footer>
	);
}
