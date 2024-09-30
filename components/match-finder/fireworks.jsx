import styles from "./Fireworks.module.css";

function Fireworks(props) {
	return (
		<div className={props.percentage >= 90 ? styles.pyro : ""}>
			<div className={styles.before} />
			<div className={styles.after} />
		</div>
	);
}

export default Fireworks;
