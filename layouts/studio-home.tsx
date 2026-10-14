import PlayfulMark from "components/portfolio/playful-mark";
import styles from "components/portfolio/portfolio.module.css";
import ProjectArt from "components/portfolio/project-art";
import { getCurrentLang } from "lib/headers";
import { workSlugs } from "lib/portfolio";
import { getTranslationsCache } from "lib/server-cache";
import Link from "next/link";

export default async function StudioHome() {
	const [lang, copy] = await Promise.all([
		getCurrentLang(),
		getTranslationsCache("portfolio"),
	]);
	return (
		<article className={styles.page} data-studio-page>
			<section className={styles.hero}>
				<div>
					<p className={styles.eyebrow}>{copy.role}</p>
					<h1>
						{copy.headline}
						<br />
						<span>{copy.headlineSecond}</span>
					</h1>
					<p className={styles.intro}>{copy.intro}</p>
					<div className={styles.heroLinks}>
						<Link className={styles.textLink} href={`/${lang}/about`}>
							{copy.moreAbout}
							<span aria-hidden="true">↗</span>
						</Link>
					</div>
				</div>
				<PlayfulMark />
			</section>
			<section aria-labelledby="selected-work">
				<div className={styles.sectionHeading}>
					<h2 id="selected-work">
						{copy.selectedWork} <sup>03</sup>
					</h2>
					<span>{copy.selectedNote}</span>
				</div>
				<div className={styles.projects}>
					{workSlugs.map((slug) => (
						<Link
							key={slug}
							href={`/${lang}/work/${slug}`}
							className={styles.project}
							data-testid={`project-${slug}`}
						>
							<ProjectArt slug={slug} />
							<div className={styles.projectInfo}>
								<div className={styles.projectTitle}>
									<h3>{copy.projects[slug].title}</h3>
									<span className={styles.arrow} aria-hidden="true">
										↗
									</span>
								</div>
								<p>{copy.projects[slug].summary}</p>
								<span className={styles.projectMeta}>
									{copy.projects[slug].category}
								</span>
							</div>
						</Link>
					))}
				</div>
			</section>
			<section
				className={styles.experiments}
				aria-labelledby="experiments-heading"
			>
				<div>
					<span className={styles.eyebrow}>{copy.experimentLabel}</span>
					<h2 id="experiments-heading">{copy.experimentTitle}</h2>
					<p>{copy.experimentDescription}</p>
				</div>
				<Link className={styles.textLink} href={`/${lang}/example-projects`}>
					{copy.experimentLink}
					<span aria-hidden="true">↗</span>
				</Link>
			</section>
		</article>
	);
}
