import { COLORS, STATES } from "components/generator-traffic/helpers";
import { useTrafficStateMachine } from "components/generator-traffic/hooks";
import { createContext, useContext } from "react";
import styles from "./style.module.css";
export const TrafficContext = createContext<
	ReturnType<typeof useTrafficStateMachine>
>(STATES[0]);
export function TrafficLight({
	trafficId,
}: {
	trafficId: number;
}) {
	const context = useContext(TrafficContext);
	const state = context[trafficId];
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

export function TrafficProvider({ children }) {
	const state = useTrafficStateMachine();

	return (
		<TrafficContext.Provider value={state}>{children}</TrafficContext.Provider>
	);
}
