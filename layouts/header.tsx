import { useDirection, useTranslation } from "lib/hooks/useTranslation";
import Link from "next/link";
import GithubLogo from "../components/icons/github";
import LanguageSelector from "../components/language-selector";
import { ThemedIcon } from "../components/themed-icon";
import styles from "./Header.module.css";

const Header = (props) => {
	const { title } = props;
	const direction = useDirection();
	const translation = useTranslation({
		en: {
			title: "Itamar Sharify",
		},
		he: {
			title: "איתמר שריפי",
		},
	});
	return (
		<nav className={styles.nav} dir="ltr">
			<LanguageSelector />
			<ThemedIcon />
			<Link
				href="/"
				title="Click to go home"
				className={styles.link}
				dir={direction}
			>
				<>
					<span className={styles.name}>{translation.title}</span>
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
