"use client";

import {
	StateProvider,
	useProxyState,
} from "app/[lang]/example-projects/proxy-state/context";
import { useTranslation } from "translations/hooks";
import styles from "./styles.module.css";

function ComputedStateExample() {
	const { translations } = useTranslation("proxy-state");
	const name = useProxyState<string>("name");
	const firstNumber = useProxyState<number>("firstNumber", 0);
	const secondNumber = useProxyState<number>("secondNumber", 1);
	const result = firstNumber.value + secondNumber.value;
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
						<input
							type="text"
							name="name"
							onChange={(e) => {
								name.value = e.target.value;
							}}
						/>
					</div>
					<div className={styles.mathItem}>{name.value}</div>
				</div>
				<div className={styles.row}>
					<div className={styles.flex}>
						<label htmlFor="firstNumber">
							{translations?.placeholders.firstNumber}
						</label>
						<input
							type="number"
							name="firstNumber"
							defaultValue={firstNumber.value}
							onChange={(e) => {
								firstNumber.value = Number(e.target.value);
							}}
						/>
					</div>
					<div className={styles.mathItem}>+</div>
					<div className={styles.flex}>
						<label htmlFor="secondNumber">
							{translations?.placeholders.secondNumber}
						</label>
						<input
							type="number"
							name="secondNumber"
							defaultValue={secondNumber.value}
							onChange={(e) => {
								secondNumber.value = Number(e.target.value);
							}}
						/>
					</div>
					<div className={styles.mathItem}> = {result || 0}</div>
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
