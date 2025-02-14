"use client";

import {
	COLORS,
	STATES,
} from "app/[lang]/example-projects/generator-traffic/example/helpers";
import { useTrafficStateMachine } from "app/[lang]/example-projects/generator-traffic/example/hooks";
import { createContext, useContext } from "react";
import styles from "./style.module.css";
export const TrafficContext = createContext<
	ReturnType<typeof useTrafficStateMachine>
>({
	state: STATES[0],
	restartTrafficLights: () => {},
	togglePlay: () => {},
	isPlaying: true,
});

export function TrafficLight({
	trafficId,
}: {
	trafficId: number;
}) {
	const context = useContext(TrafficContext);
	const state = context.state[trafficId];
	return (
		<div className={styles.trafficLight}>
			<div
				className={`${styles.light} ${styles.red} ${state === COLORS[0] ? styles.on : ""}`}
			/>
			<div
				className={`${styles.light} ${styles.yellow} ${state === COLORS[1] ? styles.on : ""}`}
			/>
			<div
				className={`${styles.light} ${styles.green} ${state === COLORS[2] ? styles.on : ""}`}
			/>
		</div>
	);
}

export function TrafficProvider({
	children,
	texts,
}: { children: React.ReactNode; texts: Record<string, string> }) {
	const state = useTrafficStateMachine();

	return (
		<TrafficContext.Provider value={state}>
			<section className={styles.container}>
				<div className={styles.buttons}>
					<button
						type="button"
						onClick={state.restartTrafficLights}
						className={styles.button}
					>
						{texts.restart}
					</button>
					<button
						type="button"
						onClick={state.togglePlay}
						className={styles.button}
					>
						{state.isPlaying ? texts.pause : texts.play}
					</button>
				</div>
				<div className={styles.traffic}>{children}</div>
			</section>
		</TrafficContext.Provider>
	);
}
