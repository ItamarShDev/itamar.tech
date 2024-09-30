"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./LanguageSelector.module.css";

export default function LanguageSelector() {
	const { locales, locale, asPath } = useRouter();

	const [showSelection, setShowSelection] = useState(false);
	const restLocales = locales.filter((l) => l !== locale);
	return (
		<nav className={styles.nav}>
			<button
				type="button"
				onClick={() => setShowSelection(!showSelection)}
				className={styles.button}
			>
				{locale}
			</button>
			{showSelection && (
				<div className={styles.container}>
					<ul className={styles.ul}>
						{restLocales.map((_locale) => {
							if (_locale === "default") return null;
							return (
								<li
									key={_locale}
									className={`${styles.li} ${_locale === locale ? styles.active : ""}`}
									onClick={() => setShowSelection(false)}
								>
									<Link href={`${asPath}`} locale={_locale} legacyBehavior>
										{_locale}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</nav>
	);
}
