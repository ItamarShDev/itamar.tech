"use client";
import { getRoute } from "lib/utils/routing";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { THEMES, type Theme, useThemeContext } from "providers/theme";
import { useEffect } from "react";
import type { Dictionary } from "translations";
import Mark from "./mark";
import styles from "./portfolio.module.css";

export default function PortfolioHeader({
	lang,
	copy,
}: {
	lang: string;
	copy: Dictionary["portfolio"];
}) {
	const pathname = usePathname();
	const { theme, selectTheme } = useThemeContext();
	const nextLang = lang === "he" ? "en" : "he";
	useEffect(() => {
		document.documentElement.lang = lang;
		document.body.dir = lang === "he" ? "rtl" : "ltr";
	}, [lang]);
	const links = [
		{
			href: `/${lang}`,
			text: copy.work,
			active: pathname === `/${lang}` || pathname.startsWith(`/${lang}/work/`),
		},
		{
			href: `/${lang}/about`,
			text: copy.about,
			active: pathname === `/${lang}/about`,
		},
		{
			href: `/${lang}/blog`,
			text: copy.writing,
			active: pathname.startsWith(`/${lang}/blog`),
		},
	];
	return (
		<header className={styles.header} data-testid="header">
			<Link className={styles.brand} href={`/${lang}`} aria-label={copy.home}>
				<Mark />
				<span>{copy.name}</span>
			</Link>
			<nav className={styles.nav} aria-label={copy.navigation}>
				{links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						aria-current={link.active ? "page" : undefined}
					>
						{link.text}
					</Link>
				))}
				<span className={styles.navDivider} aria-hidden="true" />
				<button
					type="button"
					className={styles.iconButton}
					aria-label={theme === "light" ? copy.darkMode : copy.lightMode}
					onClick={(event) =>
						selectTheme(theme === "light" ? "dark" : "light", event)
					}
				>
					<svg
						viewBox="0 0 20 20"
						width="18"
						height="18"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.4"
						aria-hidden="true"
					>
						<path d="M17 11.6A7.5 7.5 0 0 1 8.4 3 7.5 7.5 0 1 0 17 11.6Z" />
					</svg>
				</button>
				<details className={styles.themeMenu}>
					<summary aria-label={copy.themes}>
						<span aria-hidden="true">···</span>
					</summary>
					<div className={styles.themePopover}>
						<label htmlFor="portfolio-theme">{copy.themes}</label>
						<select
							id="portfolio-theme"
							value={theme}
							onChange={(event) => selectTheme(event.target.value as Theme)}
						>
							{THEMES.map((name) => (
								<option key={name} value={name}>
									{name === "light"
										? copy.light
										: name === "dark"
											? copy.dark
											: name}
								</option>
							))}
						</select>
					</div>
				</details>
				<Link
					className={styles.language}
					href={getRoute(pathname, nextLang)}
					hrefLang={nextLang}
					lang={nextLang}
					aria-label={nextLang === "he" ? "עברית" : "English"}
				>
					{nextLang === "he" ? "עב" : "EN"}
				</Link>
			</nav>
		</header>
	);
}
