import Link from "next/link";
import GithubLogo from "../components/icons/github";
import LanguageSelector from "../components/language-selector";
import { ThemedIcon } from "../components/themed-icon";
import styles from "./Header.module.css";

const Header = (props) => {
	const { title } = props;
	return (
		<nav className={styles.nav}>
			<LanguageSelector />
			<ThemedIcon />
			<Link href="/" title="Click to go home" className={styles.link}>
				<>
					<span className={styles.name}>Itamar Sharify</span>
					{title && (
						<span className={styles.divider}>&nbsp;&nbsp;›&nbsp;&nbsp;</span>
					)}
					<span className={styles.title}>{title}</span>
				</>
			</Link>
			<GithubLogo />
		</nav>
	);
};

export default Header;
