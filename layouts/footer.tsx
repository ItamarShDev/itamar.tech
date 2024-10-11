import GithubLogo from "images/GithubLogo";
import TwitterLogo from "images/TwitterLogo";
import styles from "./Footer.module.css";

const Footer = () => {
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
				Twitter
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
				Github
			</a>
		</footer>
	);
};

export default Footer;
