"use client";

import {
    STATES,
    getTrafficLights,
    sleep,
} from "app/[lang]/example-projects/generator-traffic/example/helpers";
import { useEffect, useState } from "react";

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

	const restartTrafficLights = () => {
		setTrafficLights(getTrafficLights());
		setIsRunning(true);
	};

	return {
		state,
		restartTrafficLights,
		togglePlay: () => {
			setIsRunning(!isRunning);
		},
		isPlaying: isRunning,
	};
}
