"use client";

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from "react";
type State = Record<string, unknown>;
type Value<T> = { value: T };

const StateContext = createContext<{
	state: State;
	createProxy: (name: string) => Value<unknown>;
} | null>(null);

export function StateProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<State>({});
	const ref = useRef<State>(state);

	const createProxy = useCallback((name: string) => {
		const StateItemProxy = new Proxy(
			{},
			{
				set(target, property, value) {
					target[property] = { value };
					setState((prev) => ({ ...prev, [name]: StateItemProxy }));
					return true;
				},
				get(target, property) {
					return target[property]?.value;
				},
			},
		);
		ref.current = { ...ref.current, [name]: StateItemProxy };
		return ref.current[name] as Value<unknown>;
	}, []);

	return (
		<StateContext.Provider value={{ state: ref.current, createProxy }}>
			{children}
		</StateContext.Provider>
	);
}

function useStateContext() {
	const state = useContext(StateContext);
	if (state === null) {
		throw new Error("useState must be used within a StateProvider");
	}
	return state;
}

export function useProxyState<T>(name: string, defaultValue?: T) {
	const { state, createProxy } = useStateContext();
	const item = useMemo(() => {
		let item = state[name] as Value<T>;
		if (!state[name]) {
			item = createProxy(name) as Value<T>;
			state[name] = item;
		}
		if (defaultValue !== undefined && item.value === undefined) {
			item.value = defaultValue;
		}
		return item;
	}, [state, createProxy, name, defaultValue]);
	return item;
}
