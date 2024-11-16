"use client";

import type { JSX } from "react";
import type { Dictionary } from "translations";
import styles from "./ThemedIcon.module.css";

interface ThemedIconProps {
	translations: Dictionary["header"];
	listComponent: JSX.Element;
	switchComponent: JSX.Element;
}

export function ThemedIconClient({
	translations,
	switchComponent,
	listComponent,
}: ThemedIconProps) {
	const text = translations.selectTheme;

	return (
		<div className={styles.container}>
			<div className={styles.iconContainer}>
				{switchComponent}
				<button type="button" className={styles.icon} title={text}>
					^
				</button>
			</div>
			<div className={styles.list}>{listComponent}</div>
		</div>
	);
}
