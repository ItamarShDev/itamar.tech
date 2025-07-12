"use client";

import {
	StateProvider,
	useProxyState,
} from "app/[lang]/example-projects/proxy-state/context";
import { useTranslation } from "translations/hooks";
import styles from "./styles.module.css";

function Input({
  name,
  defaultValue,
}: { 
  name: string; 
  defaultValue: number | string 
}) {
  const value = useProxyState(name, defaultValue, { 
    testId: `input-${name}`
  });
  
  return (
    <input
      data-testid={`input-${name}`}
      type={typeof defaultValue === "number" ? "number" : "text"}
      name={name}
      onChange={(e) => {
        value.value =
          typeof defaultValue === "number"
            ? Number(e.target.value)
            : e.target.value;
      }}
      value={value.value}
      aria-label={name}
    />
  );
}

function Result() {
  const firstNumber = useProxyState("firstNumber", 0, { testId: 'first-number' });
  const secondNumber = useProxyState("secondNumber", 1, { testId: 'second-number' });
  const result = firstNumber.value + secondNumber.value;
  
  return (
    <div 
      className={styles.mathItem}
      data-testid="result-display"
      aria-live="polite"
      aria-atomic="true"
    >
      = <span data-testid="result-value">{result || 0}</span>
    </div>
  );
}

function ComputedStateExample() {
	const { translations } = useTranslation("proxy-state");
	const name = useProxyState<string>("name", translations?.placeholders.name || '', { 
    testId: 'name-input' 
  });
  
  return (
    <div data-testid="computed-state-example">
      <div>
        <h2 data-testid="example-title">{translations?.title}</h2>
        <section 
          className={styles.explanation}
          data-testid="explanation-section"
        >
          <code>{translations?.explanation}</code>
        </section>

        <div className={styles.row} data-testid="input-container">
          <div className={styles.flex} data-testid="name-input-container">
            <label htmlFor="name">{translations?.placeholders.name}</label>
            <Input 
              name="name" 
              defaultValue={translations?.placeholders.name} 
            />
          </div>
          
          <div className={styles.flex} data-testid="first-number-container">
            <label htmlFor="firstNumber">
              {translations?.placeholders.firstNumber}
            </label>
            <Input
              name="firstNumber"
              defaultValue={translations?.placeholders.firstNumber}
            />
          </div>
          
          <div className={styles.flex} data-testid="second-number-container">
            <label htmlFor="secondNumber">
              {translations?.placeholders.secondNumber}
            </label>
            <Input
              name="secondNumber"
              defaultValue={translations?.placeholders.secondNumber}
            />
          </div>
        </div>
        
        <Result />
      </div>
    </div>
  );
}

export function ComputedProxyStateExample() {
	return (
		<StateProvider>
			<ComputedStateExample />
		</StateProvider>
	);
}
