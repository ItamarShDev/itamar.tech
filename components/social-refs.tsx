import GithubLogo from "images/GithubLogo";
import TwitterLogo from "images/TwitterLogo";
import styles from "./SocialRefs.module.css";

function SocialRefs({ withTitle = false }) {
	return (
		<div>
			{withTitle && <h5>Feel free to contact me here:</h5>}
			<div className={`${styles.row} ${styles.refs}`}>
				<a
					className={`${styles.item} ${styles.twitter}`}
					href="https://twitter.com/ISharify"
					target="_blank"
					rel="noreferrer noopener"
					title="Twitter"
				>
					<TwitterLogo />
				</a>
				<a
					className={`${styles.item} ${styles.github}`}
					href="https://www.github.com/ItamarShDev"
					target="_blank"
					rel="noreferrer noopener"
					title="Github"
				>
					<GithubLogo />
				</a>
			</div>
		</div>
	);
}

export default SocialRefs;
