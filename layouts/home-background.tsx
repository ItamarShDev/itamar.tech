import styles from "./HomeBackground.module.css";

function getNarrowAngle(baseDegree: number) {
	const randomDegree = Math.random() * 360;
	let degree = baseDegree + randomDegree;
	if (Math.random() > 0.8) degree = baseDegree - randomDegree;
	if (degree % 60 > 30) return degree + 30;
	return degree;
}

function HomeBackground() {
	const baseDegree = Math.random() * 360;
	return (
		<>
			<div
				className={styles.bg}
				style={{
					backgroundImage: `linear-gradient(-${getNarrowAngle(baseDegree)}deg, var(--colors-bg) 50%, var(--colors-hoverDecorations) 50%)`,
				}}
			/>
			<div
				className={`${styles.bg} ${styles.bg2}`}
				style={{
					backgroundImage: `linear-gradient(-${getNarrowAngle(baseDegree)}deg, var(--colors-bg) 50%, var(--colors-hoverDecorations) 50%)`,
				}}
			/>
			<div
				className={`${styles.bg} ${styles.bg3}`}
				style={{
					backgroundImage: `linear-gradient(-${getNarrowAngle(baseDegree)}deg, var(--colors-bg) 50%, var(--colors-hoverDecorations) 50%)`,
				}}
			/>
		</>
	);
}

export default HomeBackground;
