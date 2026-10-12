import styles from "components/portfolio/portfolio.module.css";
import Portrait from "images/me.png";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "translations";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang } = await params;
	const { portfolio } = await getDictionary(lang);
	return { title: portfolio.about, description: portfolio.aboutIntro };
}
export default async function AboutPage({ params }: Props) {
	const { lang } = await params;
	const { portfolio: copy } = await getDictionary(lang);
	return (
		<article className={styles.page} data-studio-page>
			<Link className={styles.backLink} href={`/${lang}`}>
				<span aria-hidden="true">{lang === "he" ? "→" : "←"}</span>
				{copy.backToWork}
			</Link>
			<div className={styles.aboutGrid}>
				<section>
					<p className={styles.eyebrow}>{copy.role}</p>
					<h1>{copy.aboutTitle}</h1>
					<p>{copy.aboutIntro}</p>
					<p>{copy.aboutBody}</p>
					<p>{copy.aboutCareer}</p>
					<div className={styles.heroLinks}>
						<Link className={styles.textLink} href={`/${lang}/resume`}>
							{copy.resume}
							<span aria-hidden="true">↗</span>
						</Link>
						<a
							className={styles.quietLink}
							href="https://www.linkedin.com/in/itamar-sharify-362289149"
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn ↗
						</a>
					</div>
				</section>
				<aside>
					<Image
						className={styles.portrait}
						src={Portrait}
						alt={copy.name}
						sizes="(max-width: 600px) 100vw, 360px"
					/>
					<ul className={styles.aboutList}>
						{copy.interests.map((interest, index) => (
							<li key={interest}>
								{interest}
								<span aria-hidden="true">0{index + 1}</span>
							</li>
						))}
					</ul>
				</aside>
			</div>
		</article>
	);
}
