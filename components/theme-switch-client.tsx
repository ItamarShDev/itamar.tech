"use client";
import { startTransition } from 'react';
import styles from "./ThemedIcon.module.css";

export function ThemeItem({
	currentTheme,
	isSelected,
	setThemeAction,
}: {
	currentTheme: string;
	isSelected: boolean;
	setThemeAction: (theme: string) => void;
}) {
	const label = currentTheme === "gpt5" ? "GPT 5" : currentTheme;
	return (
		<li
			className={`${styles.themeItem} ${isSelected ? styles.selected : ""}`}
		>
			<button
				type="button"
				onClick={() => startTransition(() => setThemeAction(currentTheme))}
				className={styles.themeButton}
			>
				{label}
			</button>
		</li>
	);
}
