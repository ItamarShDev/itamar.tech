import styles from "./HomeBackground.module.css";

function getNarrowAngle() {
	const degree = Math.random() * 360;
	if (degree % 60 > 30) return degree + 30;
	return degree;
}

function HomeBackground() {
	const randomDegree = getNarrowAngle();
	const bgStyle = {
		backgroundImage: `linear-gradient(-${randomDegree}deg, var(--colors-bg) 50%, var(--colors-hoverDecorations) 50%)`,
	};

	return (
		<>
			<div className={styles.bg} style={bgStyle} />
			<div className={`${styles.bg} ${styles.bg2}`} style={bgStyle} />
			<div className={`${styles.bg} ${styles.bg3}`} style={bgStyle} />
		</>
	);
}

export default HomeBackground;
