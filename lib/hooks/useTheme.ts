"use client";
import { useThemeContext } from "providers/theme";
import { useEffect, useMemo, useState } from "react";
export const SCHEMES = ["light", "dark", "monokai", "cobalt2"];

export function getCurrentThemeName() {
	if (process.browser && document.body.dataset.theme)
		return document.body.dataset.theme;
	return SCHEMES[0];
}

export const setTheme = (newTheme?: string) => {
	if (newTheme) {
		document.body.dataset.theme = newTheme;
		localStorage.setItem("theme", newTheme);
	}
};
export function isDarkTheme() {
	const currentTheme = getCurrentThemeName();
	return currentTheme !== "light";
}
export function toggleDarkMode() {
	const newTheme = getCurrentThemeName() !== "light" ? "light" : "dark";
	setTheme(newTheme);
}
export const toggleTheme = () => {
	const currentTheme = getCurrentThemeName();
	if (currentTheme in SCHEMES) {
		const newThemeIndex = (SCHEMES.indexOf(currentTheme) + 1) % SCHEMES.length;
		const newTheme = SCHEMES[newThemeIndex];
		setTheme(newTheme);
	} else {
		toggleDarkMode();
	}
};

export const getAvailableThemes = () => SCHEMES;

function setThemeFromSystem(setTheme: (theme: string) => void) {
	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
		setTheme("dark");
	} else {
		setTheme("light");
	}
}

export default function useTheme() {
	const { theme } = useThemeContext();
	const [themeConfig, setThemeConfig] = useState<CSSStyleDeclaration>();
	useEffect(() => {
		setThemeConfig(window.getComputedStyle(document.body));
	}, []);
	useEffect(() => {
		if (!theme) return;
		setTheme(theme);
		setThemeConfig(getComputedStyle(document.body));
	}, [theme]);

	return {
		themeConfig,
	};
}

export function useChartTheme() {
	const { themeConfig } = useTheme();
	return useMemo(() => {
		if (!themeConfig) {
			return {
				charts: "#448ef6",
				text: "hsl(204.2, 100%, 28.6%)",
				headerText: "hsl(204.2, 100%, 28.6%)",
			};
		}
		return {
			charts: themeConfig.getPropertyValue("--colors-charts"),
			text: themeConfig.getPropertyValue("--colors-text"),
			headerText: themeConfig.getPropertyValue("--colors-headerText"),
		};
	}, [themeConfig]);
}
