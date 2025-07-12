"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
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

  const createProxy = useCallback((name: string, testId?: string) => {
    const StateItemProxy = new Proxy(
      {},
      {
        set(target: any, property: string, value: any) {
          target[property] = { 
            value,
            __testId: testId || name
          };
          setState((prev) => ({ ...prev, [name]: StateItemProxy }));
          return true;
        },
        get(target: any, property: string) {
          return target[property]?.value;
        },
      }
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
  
  useEffect(() => {
    if (initialValue !== undefined) {
      const existingValue = state[name]?.value;
      if (existingValue === undefined) {
        createProxy(name, options?.testId);
        state[name] = { 
          value: initialValue,
          __testId: options?.testId || name
        };
      }
    }
  }, [state, name, initialValue, options?.testId, createProxy]);

  const value = state[name] as Value<T> || { 
    value: initialValue as T,
    __testId: options?.testId || name
  };
  
  return value;
}
