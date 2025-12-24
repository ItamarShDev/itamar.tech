"use client";
import styles from "./ThemedIcon.module.css";

export function ThemeItem({
	currentTheme,
	isSelected,
	setThemeAction,
}: {
	currentTheme: string;
	isSelected: boolean;
	setThemeAction: (theme: string, event?: React.MouseEvent) => void;
}) {
	const label = currentTheme === "gpt5" ? "GPT 5" : currentTheme;
	return (
		<li
			className={`${styles.themeItem} ${isSelected ? styles.selected : ""}`}
		>
			<button
				type="button"
				onClick={(e) => setThemeAction(currentTheme, e)}
				className={styles.themeButton}
			>
				{label}
			</button>
		</li>
	);
}
