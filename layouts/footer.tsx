import GithubLogo from "images/GithubLogo";
import TwitterLogo from "images/TwitterLogo";
import { getTranslationsCache } from "lib/server-cache";
import styles from "./Footer.module.css";

const Footer = async () => {
	const footerTranslations = await getTranslationsCache("footer");

	return (
		<footer className={styles.footer}>
			<a
				href="https://twitter.com/ISharify"
				target="_blank"
				rel="noreferrer noopener"
				className={`${styles.link} ${styles.twitter}`}
			>
				<div className={styles.iconWrapper}>
					<TwitterLogo center />
				</div>
				{footerTranslations?.twitter || "Twitter"}
			</a>
			<a
				href="https://www.github.com/ItamarShDev"
				target="_blank"
				rel="noreferrer noopener"
				className={styles.link}
			>
				<div className={styles.iconWrapper}>
					<GithubLogo center />
				</div>
				{footerTranslations?.github || "Github"}
			</a>
		</footer>
	);
};

export default Footer;
