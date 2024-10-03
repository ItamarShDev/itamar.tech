import { LinkCard } from "components";
import { useTranslation } from "lib/hooks/useTranslation";
import styles from "./Links.module.css";

const transtions = {
	en: {
		resume: {
			title: "Career",
			subTitle: "Career Timeline",
		},
		blog: {
			title: "Thoughts Log",
			subTitle: "My Development Journy",
		},
		examples: {
			title: "Examples",
			subTitle: "Project examples recreated",
		},
	},
	he: {
		resume: {
			title: "קריירה",
			subTitle: "מסלול הקריירה שלי",
		},
		blog: {
			title: "מחשבות",
			subTitle: "מחשבות לאורך הדרך",
		},
		examples: {
			title: "דוגמאות",
			subTitle: "שחזור יצירות עבר",
		},
	},
};

function Links() {
	const translation = useTranslation(transtions);
	return (
		<div className={styles.container}>
			<LinkCard
				route="/resume"
				title={translation.resume.title}
				subTitle={translation.resume.subTitle}
			/>
			<LinkCard
				route="/blog"
				title={translation.blog.title}
				subTitle={translation.blog.subTitle}
			/>
			<LinkCard
				route="/example-projects"
				title={translation.examples.title}
				subTitle={translation.examples.subTitle}
			/>
		</div>
	);
}

export default Links;
