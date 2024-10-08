import dynamic from "next/dynamic";
import styles from "./Stats.module.css";

const Abilities = dynamic(() => import("components/charts/abilities"), {
	ssr: true,
	loading: () => <div>Loading...</div>,
});

const SocialAffect = dynamic(() => import("components/charts/social"), {
	ssr: true,
	loading: () => <div>Loading...</div>,
});

function Stats() {
	const labels = [
		"Python",
		"Node.js",
		"JavaScript",
		"CSS",
		"React",
		"Go",
		"TypeScript",
	];
	const values = [{ label: "Abilities", data: [70, 50, 90, 90, 80, 30, 90] }];
	return (
		<div>
			<div className={styles.flex}>
				<span>
					<Abilities labels={labels} values={values} />
				</span>
				<span>
					<SocialAffect />
				</span>
			</div>
		</div>
	);
}

export default Stats;
