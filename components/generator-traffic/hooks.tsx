import {
	STATES,
	getTrafficLights,
	sleep,
} from "components/generator-traffic/helpers";
import { useCallback, useEffect, useState } from "react";

export function useTrafficStateMachine() {
	const [state, setState] = useState<(typeof STATES)[number]>(STATES[0]);
	const [trafficLights, setTrafficLights] = useState(getTrafficLights());
	const [isRunning, setIsRunning] = useState(true);
	useEffect(() => {
		let loop: undefined | (() => void) = async () => {
			const nextState = trafficLights?.next();
			if (isRunning) {
				sleep(1000).then(() => {
					if (!isRunning) {
						return;
					}
					if (nextState?.value) {
						setState(nextState.value);
					}

					loop?.();
				});
			}
		};
		if (isRunning) loop();

		return () => {
			loop = undefined;
		};
	}, [trafficLights, isRunning]);

	const restartTrafficLights = useCallback(() => {
		setTrafficLights(getTrafficLights());
		setIsRunning(true);
	}, []);

	return {
		state,
		restartTrafficLights,
		togglePlay: () => {
			setIsRunning(!isRunning);
		},
		isPlaying: isRunning,
	};
}
