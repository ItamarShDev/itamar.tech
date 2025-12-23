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
					<svg 
						width="12" 
						height="12" 
						viewBox="0 0 12 12" 
						fill="none" 
						stroke="currentColor" 
						strokeWidth="2" 
						strokeLinecap="round" 
						strokeLinejoin="round"
					>
						<path d="M2 4l4 4 4-4" />
					</svg>
				</button>
			</div>
			<div className={styles.list}>{listComponent}</div>
		</div>
	);
}
