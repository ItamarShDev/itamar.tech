import { getCurrentLang } from "lib/headers";
import { getDirectionCache, getTranslationsCache } from "lib/server-cache";
import Link from "next/link";
import type { Dictionary } from "translations";
import ClientHeader from "../components/ClientHeader";
import LanguageSelector from "../components/language-selector";
import { ThemedIcon } from "../components/themed-icon";
import styles from "./Header.module.css";

const Header = async (props) => {
	const { title } = props;
	const lang = await getCurrentLang();
	const direction = await getDirectionCache();
	const translation = (await getTranslationsCache(
		"header",
	)) as Dictionary["header"];
	return (
		<nav className={styles.nav} dir="ltr" data-testid="header">
			<LanguageSelector />
			<ThemedIcon translations={translation} />
			<Link
				href={`/${lang}`}
				scroll={false}
				title="Click to go home"
				className={styles.link}
				dir={direction}
				data-testid={lang}
			>
				<>
					<span className={styles.name}>{translation.title}</span>
					{title && (
						<span className={styles.divider}>&nbsp;&nbsp;›&nbsp;&nbsp;</span>
					)}
					<span className={styles.title}>{title}</span>
				</>
			</Link>
			<ClientHeader title={title} translation={translation} />
		</nav>
	);
};

export default Header;
