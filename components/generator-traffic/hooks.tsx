import { STATES, getTrafficLights } from "components/generator-traffic/helpers";
import { useEffect, useState } from "react";

export function useTrafficStateMachine() {
	const [state, setState] = useState<(typeof STATES)[number]>(STATES[0]);
	useEffect(() => {
		const trafficLights = getTrafficLights();
		(async () => {
			while (true) {
				const nextState = await trafficLights.next();
				if (nextState.value) {
					setState(nextState.value);
				}
			}
		})();
	}, []);
	return state;
}
