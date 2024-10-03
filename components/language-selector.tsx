"use client";
import { Switch } from "components/switch";
import { useRouter } from "next/router";
import styles from "./LanguageSelector.module.css";

export default function LanguageSelector() {
	const { locale, asPath, replace } = useRouter();

	return (
		<nav className={styles.nav}>
			<Switch
				id="language-selector"
				checked={locale === "en"}
				onChange={() => {
					replace(asPath, asPath, { locale: locale === "en" ? "he" : "en" });
				}}
				selectedText={"En"}
				unselectedText={"עב"}
			/>
		</nav>
	);
}
