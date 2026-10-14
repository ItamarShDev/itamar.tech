"use client";

import { useState } from "react";
import Mark from "./mark";
import styles from "./portfolio.module.css";

export default function PlayfulMark() {
	const [turn, setTurn] = useState(0);
	return (
		<div className={styles.heroMark}>
			<button
				type="button"
				className={styles.markButton}
				data-turn={turn}
				aria-label="Rearrange the shapes"
				onClick={() => setTurn((value) => (value + 1) % 4)}
			>
				<Mark />
			</button>
			<span className={styles.markNote} aria-live="polite">
				{turn ? "A little less serious." : "Go on, give it a nudge."}
			</span>
		</div>
	);
}
