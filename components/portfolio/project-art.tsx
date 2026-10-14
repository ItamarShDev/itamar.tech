import type { WorkSlug } from "lib/portfolio";
import Image from "next/image";
import { ViewTransition } from "react";
import styles from "./portfolio.module.css";
export default function ProjectArt({
	slug,
	hero = false,
}: {
	slug: WorkSlug;
	hero?: boolean;
}) {
	return (
		<ViewTransition name={`work-${slug}`} share="project-morph" default="none">
			<div
				className={`${styles.art} ${hero ? styles.heroArt : ""}`}
				data-project={slug}
			>
				<Image
					src={`/project-artwork/${slug}.svg`}
					alt=""
					width={640}
					height={400}
					loading={hero ? "eager" : "lazy"}
				/>
			</div>
		</ViewTransition>
	);
}
