import GithubLogo from "images/GithubLogo";
import TwitterLogo from "images/TwitterLogo";
import { grid } from "theme/styles";
import styles from "./SocialRefs.module.css";

function SocialRefs({ withTitle = false }) {
	const { className: gridClass, styles: gridStyle } = grid({
		rows: 1,
		cols: 2,
		gap: 20,
	});

	return (
		<div className={styles.row}>
			{withTitle && <h5>Feel free to contact me here:</h5>}
			<div className={`${gridClass} ${styles.refs}`}>
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

				{gridStyle}
			</div>
		</div>
	);
}

export default SocialRefs;
