import styles from "components/portfolio/portfolio.module.css";
import ProjectArt from "components/portfolio/project-art";
import { isWorkSlug, workSlugs, workUrls } from "lib/portfolio";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "translations";

type Props = { params: Promise<{ lang: string; slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang, slug } = await params;
	if (!isWorkSlug(slug)) notFound();
	const { portfolio } = await getDictionary(lang);
	return {
		title: portfolio.projects[slug].title,
		description: portfolio.projects[slug].summary,
	};
}
export default async function WorkPage({ params }: Props) {
	const { lang, slug } = await params;
	if (!isWorkSlug(slug)) notFound();
	const { portfolio: copy } = await getDictionary(lang);
	const project = copy.projects[slug];
	const next = workSlugs[(workSlugs.indexOf(slug) + 1) % workSlugs.length];
	return (
		<article className={styles.page} data-studio-page>
			<Link className={styles.backLink} href={`/${lang}`}>
				<span aria-hidden="true">{lang === "he" ? "→" : "←"}</span>
				{copy.backToWork}
			</Link>
			<header className={styles.detailHeader}>
				<div>
					<p className={styles.eyebrow}>{project.category}</p>
					<h1>{project.title}</h1>
					<p className={styles.intro}>{project.summary}</p>
				</div>
				<a
					className={styles.textLink}
					href={workUrls[slug]}
					target="_blank"
					rel="noopener noreferrer"
				>
					{copy.visitSite}
					<span aria-hidden="true">↗</span>
				</a>
			</header>
			<ProjectArt slug={slug} hero />
			<div className={styles.detailCopy}>
				<section>
					<h2>{copy.aboutProject}</h2>
					<p>{project.description}</p>
				</section>
				<dl>
					<div>
						<dt>{copy.category}</dt>
						<dd>{project.category}</dd>
					</div>
					<div>
						<dt>{copy.projectType}</dt>
						<dd>{copy.webProject}</dd>
					</div>
				</dl>
			</div>
			<Link className={styles.nextProject} href={`/${lang}/work/${next}`}>
				<span>
					<small>{copy.nextProject}</small>
					{copy.projects[next].title}
				</span>
				<span aria-hidden="true">↗</span>
			</Link>
		</article>
	);
}
