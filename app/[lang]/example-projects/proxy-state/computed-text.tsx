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
}: { name: string; defaultValue: number | string }) {
	const value = useProxyState(name, defaultValue);
	return (
		<input
			type={typeof defaultValue === "number" ? "number" : "text"}
			name={name}
			onChange={(e) => {
				value.value =
					typeof defaultValue === "number"
						? Number(e.target.value)
						: e.target.value;
			}}
			value={value.value}
		/>
	);
}

function Result() {
	const firstNumber = useProxyState("firstNumber", 0);
	const secondNumber = useProxyState("secondNumber", 1);
	const result = firstNumber.value + secondNumber.value;
	return <div className={styles.mathItem}> = {result || 0}</div>;
}

function ComputedStateExample() {
	const { translations } = useTranslation("proxy-state");
	const name = useProxyState<string>("name");
	return (
		<>
			<div>
				<h2>{translations?.title}</h2>
				<section className={styles.explanation}>
					<code>{translations?.explanation}</code>
				</section>

				<div className={styles.row}>
					<div className={styles.flex}>
						<label htmlFor="name">{translations?.placeholders.name}</label>
						<Input name="name" defaultValue="John Doe" />
					</div>
					<div className={styles.mathItem}>{name.value}</div>
				</div>
				<div className={styles.row}>
					<div className={styles.flex}>
						<label htmlFor="firstNumber">
							{translations?.placeholders.firstNumber}
						</label>
						<Input name="firstNumber" defaultValue={0} />
					</div>
					<div className={styles.mathItem}>+</div>
					<div className={styles.flex}>
						<label htmlFor="secondNumber">
							{translations?.placeholders.secondNumber}
						</label>
						<Input name="secondNumber" defaultValue={1} />
					</div>
					<Result />
				</div>
			</div>
		</>
	);
}

export function ComputedProxyStateExample() {
	return (
		<StateProvider>
			<ComputedStateExample />
		</StateProvider>
	);
}
