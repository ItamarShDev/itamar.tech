import { useScrollObserver, useUrlHash } from "lib/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./headline-sidebar.module.css";

function generateLinkMarkup($contentElement) {
	const headings = [...$contentElement.querySelectorAll("h2, h3")];
	const parsedHeadings = headings.map((heading) => {
		return {
			title: heading.innerText,
			depth: heading.nodeName.replace(/\D/g, "") - 1,
			id: heading.getAttribute("id"),
		};
	});
	return parsedHeadings;
}

function HeaderTitle({ header }) {
	const isCurrentTitle = useUrlHash(header.id);
	const titleClass = isCurrentTitle ? styles.bold : styles.dim;
	const AnchorLink = (
		<a href={`#${header.id}`} className={styles.link}>
			{header.title}
		</a>
	);
	let title = <dt className={titleClass}>{AnchorLink}</dt>;
	if (header.depth > 1) {
		title = <dd className={titleClass}>{AnchorLink}</dd>;
	}
	return title;
}

function LocalesLinks() {
	const { locales, locale, asPath } = useRouter();
	return (
		<>
			<span className={styles.translationsTitle}>Translations</span>
			<ul className={styles.localesList}>
				{locales?.map((_locale) => {
					if (_locale === "default") return null;
					return (
						<li
							key={_locale}
							className={_locale === locale ? styles.active : ""}
						>
							<Link href={`${asPath}`} locale={_locale}>
								{_locale}
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export function HeadlineSidebar({ article }) {
	const scrollPercentage = useScrollObserver();
	const headers = generateLinkMarkup(article);
	const headings = headers.map((header) => (
		<HeaderTitle key={header.id} header={header} />
	));
	return (
		<aside className={styles.sidebar}>
			<div className={styles.container}>
				<div className={styles.headlinesSection}>
					<h5 className={styles.headlinesTitle}>Headlines</h5>
					<dl className={styles.headlinesList}>{headings}</dl>
				</div>
				<LocalesLinks />
				<span
					className={styles.line}
					style={{ height: `${scrollPercentage}%` }}
				/>
			</div>
		</aside>
	);
}
