import useTheme, { getAvailableThemes } from "lib/hooks/useTheme";
import { useEffect, useState } from "react";
import styles from "./ThemedIcon.module.css";

export function getIconClassAndAction(isDark) {
	if (isDark) {
		return "darkIcon";
	}
	return "lightIcon";
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
	const availableThemes = getAvailableThemes();

	return (
		<div className={styles.themeListContainer}>
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

function ThemeSwitch() {
	const { toggleDarkMode, isDarkTheme } = useTheme();
	return (
		<label htmlFor="theme-switch" className={styles.themeSwitch}>
			<input
				type="checkbox"
				name="theme-switch"
				id="theme-switch"
				checked={isDarkTheme}
				onChange={() => toggleDarkMode()}
			/>
			<span className={styles.slider} />
		</label>
	);
}
export const ThemedIcon = () => {
	const { currentThemeName, setThemeName, isDarkTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		document.body.dataset.theme = currentThemeName;
	}, [currentThemeName]);
	const title = `Toggle ${isDarkTheme ? "light" : "dark"} mode`;
	return (
		<div className={styles.container}>
			<div className={styles.iconContainer}>
				<ThemeSwitch />
				<button
					type="button"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
					className={styles.icon}
					title={title}
				>
					^
				</button>
			</div>
			<div
				className={styles.list}
				style={{ display: isOpen ? "block" : "none" }}
			>
				<ThemeList
					currentThemeName={currentThemeName}
					setThemeName={(theme) => {
						setThemeName(theme);
						setIsOpen(false);
					}}
				/>
			</div>
		</div>
	);
};
