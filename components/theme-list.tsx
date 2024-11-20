"use client";
import { ThemeItem } from "components/theme-switch-client";
import { setCurrentTheme, toggleDarkTheme } from "lib/headers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./ThemedIcon.module.css";

export function getIconClassAndAction(isDark: boolean) {
	if (isDark) {
		return "darkIcon";
	}
	return "lightIcon";
}

export function ThemeList({ currentThemeName }) {
	const [selectedTheme, setSelectedTheme] = useState(currentThemeName);
	const router = useRouter();
	const setTheme = (theme: string) => {
		setCurrentTheme(theme);
		document.body.setAttribute("data-theme", theme);
		setSelectedTheme(theme);
		router.refresh();
	};
	return (
		<div className={styles.themeListContainer}>
			<ul className={styles.themeList}>
				{["light", "dark", "monokai", "cobalt2"].map((theme) => (
					<ThemeItem
						key={theme}
						currentTheme={theme}
						isSelected={selectedTheme === theme}
						setTheme={setTheme}
					/>
				))}
			</ul>
		</div>
	);
}

export function ThemeSwitch({ translations, isDarkTheme }) {
	const [selectedDark, setSelectedDark] = useState(isDarkTheme);
	const router = useRouter();
	const toggleMode = async () => {
		await toggleDarkTheme();
		setSelectedDark(!selectedDark);
		document.body.setAttribute("data-theme", selectedDark ? "light" : "dark");
		router.refresh();
	};
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
