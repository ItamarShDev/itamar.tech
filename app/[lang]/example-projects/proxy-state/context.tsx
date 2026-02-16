"use client";
/* eslint-disable react-hooks/refs */

import {
  createContext,
  useContext, useRef,
  useState
} from "react";

type State = Record<string, any>;

type Value<T> = {
  value: T;
  __testId?: string;
};

type StateContextType = {
  state: State;
  createProxy: (name: string, testId?: string) => Value<unknown>;
};

const StateContext = createContext<StateContextType | null>(null);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>({});
  const ref = useRef<State>(state);
  const createProxyRef = useRef<(name: string, testId?: string) => Value<unknown>>();

  if (!createProxyRef.current) {
    createProxyRef.current = (name: string, testId?: string) => {
      const StateItemProxy = new Proxy(
        {},
        {
          set(target: any, property: string, value: any) {
            target[property] = {
              value,
              __testId: testId || name,
            };
            setState((prev) => ({ ...prev, [name]: StateItemProxy }));
            return true;
          },
          get(target: any, property: string) {
            return target[property]?.value;
          },
        },
      );

      ref.current = { ...ref.current, [name]: StateItemProxy };
      return ref.current[name] as Value<unknown>;
    };
  }

  return (
    <StateContext.Provider value={{ state: ref.current, createProxy: createProxyRef.current }}>
      {children}
    </StateContext.Provider>
  );
}

export function useProxyState<T = any>(
  name: string,
  initialValue?: T,
  options?: { testId?: string }
): Value<T> {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("useProxyState must be used within a StateProvider");
  }

  const { state, createProxy } = context;

  if (!state[name]) {
    const proxy = createProxy(name, options?.testId);
    if (initialValue !== undefined && proxy.value === undefined) {
      proxy.value = initialValue as T;
    }
    return proxy as Value<T>;
  }

  return state[name] as Value<T>;
}
