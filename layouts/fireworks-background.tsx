import styles from "./FireworksBackground.module.css";

function FireworksBackground() {
	return (
		<div className={styles.fireworksContainer}>
			<div className={styles.pyro}>
				<div className={styles.before} />
				<div className={styles.after} />
			</div>
		</div>
	);
}

export default FireworksBackground;