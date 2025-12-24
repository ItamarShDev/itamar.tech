"use client";
import { ThemeItem } from "components/theme-switch-client";
import { THEMES, useThemeContext } from "providers/theme";
import styles from "./ThemedIcon.module.css";

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
						setThemeAction={selectTheme}
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
		<label
			htmlFor="theme-switch"
			className={styles.themeSwitch}
			onClick={(e) => {
				e.preventDefault();
				toggleMode(e);
			}}
		>
			<input
				type="checkbox"
				name="theme-switch"
				id="theme-switch"
				checked={selectedDark}
				readOnly
				title={selectedDark ? translations.lightMode : translations.darkMode}
			/>
			<span className={styles.slider} />
		</label>
	);
}
