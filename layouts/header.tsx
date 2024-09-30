import Link from "next/link";
import GithubLogo from "../components/icons/github";
import LanguageSelector from "../components/language-selector";
import { ThemedIcon } from "../components/themed-icon";
import styles from "./Header.module.css";

const Header = (props) => {
	const { title } = props;
	return (
		<nav className={styles.nav}>
			<GithubLogo />
			<Link href="/" legacyBehavior>
				{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
				<a title="Click to go home" className={styles.link}>
					<span className={styles.name}>Itamar Sharify</span>
					{title && (
						<span className={styles.divider}>&nbsp;&nbsp;›&nbsp;&nbsp;</span>
					)}
					<span className={styles.title}>{title}</span>
				</a>
			</Link>
			<LanguageSelector />
			<ThemedIcon />
		</nav>
	);
};

export default Header;
