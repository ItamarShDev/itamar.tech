import GithubLogo from "images/GithubLogo";
import MediumLogo from "images/MediumLogo";
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
			<a
				href="https://medium.com/@itamarsharify"
				target="_blank"
				className={`${styles.link} ${styles.medium}`}
				rel="noreferrer noopener"
			>
				<div className={styles.iconWrapper}>
					<MediumLogo center />
				</div>
				Medium
			</a>
		</footer>
	);
};

export default Footer;
