"use client";
import useTheme, { getAvailableThemes } from "lib/hooks/useTheme";
import { useIsRTL } from "lib/hooks/useTranslation";
import { useEffect } from "react";
import styles from "./ThemedIcon.module.css";

export function getIconClassAndAction(isDark) {
	if (isDark) {
		return "dark-icon";
	}
	return "light-icon";
}

function ThemeItem({ currentTheme, isSelected, setTheme }) {
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

function ThemeList({ currentThemeName, setThemeName }) {
	const isRTL = useIsRTL();
	const availableThemes = getAvailableThemes();

	return (
		<div
			className={styles.themeListContainer}
			style={{ transform: `translateX(${isRTL ? "0%" : "-50%"})` }}
		>
			<ul className={styles.themeList}>
				{availableThemes.map((theme) => (
					<ThemeItem
						key={theme}
						currentTheme={theme}
						isSelected={currentThemeName === theme}
						setTheme={setThemeName}
					/>
				))}
			</ul>
		</div>
	);
}

export const ThemedIcon = () => {
	const { currentThemeName, setThemeName, isDarkTheme, toggleDarkMode } =
		useTheme();
	useEffect(() => {
		document.body.dataset.theme = currentThemeName;
	}, [currentThemeName]);
	const iconClass = getIconClassAndAction(isDarkTheme);
	const title = `Toggle ${isDarkTheme ? "light" : "dark"} mode`;
	return (
		<div className={styles.container}>
			<button
				type="button"
				onClick={toggleDarkMode}
				className={`${styles.icon} ${styles[iconClass]}`}
				title={title}
			/>
			<div className={styles.list}>
				<ThemeList
					currentThemeName={currentThemeName}
					setThemeName={setThemeName}
				/>
			</div>
		</div>
	);
};
