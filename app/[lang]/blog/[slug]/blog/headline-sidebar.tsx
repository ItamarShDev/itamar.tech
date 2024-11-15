import useScrollObserver from "lib/hooks/useScrollObserver";
import useUrlHash from "lib/hooks/useUrlHash";
import styles from "./headline-sidebar.module.css";

function generateLinkMarkup($contentElement: HTMLElement | null) {
	if (!$contentElement) return [];
	const headingsElements = $contentElement.querySelectorAll(
		"h2, h3",
	) as NodeListOf<HTMLHeadingElement>;
	const headings = Array.from(headingsElements);

	const parsedHeadings = headings.map((heading) => {
		return {
			title: heading.innerText,
			depth: Number(heading.nodeName.replace(/\D/g, "")) - 1,
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

export function HeadlineSidebar({ article }: { article: HTMLElement | null }) {
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
				<span
					className={styles.line}
					style={{ height: `${scrollPercentage}%` }}
				/>
			</div>
		</aside>
	);
}
