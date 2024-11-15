"use client";
import styles from "./ThemedIcon.module.css";

export function ThemeItem({
	currentTheme,
	isSelected,
	setTheme,
}: {
	currentTheme: string;
	isSelected: boolean;
	setTheme: (theme: string) => void;
}) {
	return (
		<li
			key={currentTheme}
			className={`${styles.themeItem} ${isSelected ? styles.selected : ""}`}
		>
			<button
				type="button"
				onClick={() => setTheme(currentTheme)}
				className={styles.themeButton}
			>
				{currentTheme}
			</button>
		</li>
	);
}
