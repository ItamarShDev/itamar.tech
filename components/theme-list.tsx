"use client";
import { ThemeItem } from "components/theme-switch-client";
import { THEMES, useThemeContext } from "providers/theme";
import styles from "./ThemedIcon.module.css";

export function getIconClassAndAction(isDark: boolean) {
	if (isDark) {
		return "darkIcon";
	}
	return "lightIcon";
}

export function ThemeList() {
	const { theme: selectedTheme, selectTheme } = useThemeContext();
	return (
		<div className={styles.themeListContainer}>
			<ul className={styles.themeList}>
				{THEMES.map((theme) => (
					<ThemeItem
						key={theme}
						currentTheme={theme}
						isSelected={selectedTheme === theme}
						setTheme={selectTheme}
					/>
				))}
			</ul>
		</div>
	);
}

export function ThemeSwitch({ translations }) {
	const { theme, toggleMode } = useThemeContext();
	const selectedDark = theme !== "light";
	return (
		<label htmlFor="theme-switch" className={styles.themeSwitch}>
			<input
				type="checkbox"
				name="theme-switch"
				id="theme-switch"
				checked={selectedDark}
				onChange={() => toggleMode()}
				title={selectedDark ? translations.lightMode : translations.darkMode}
			/>
			<span className={styles.slider} />
		</label>
	);
}
