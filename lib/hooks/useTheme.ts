"use client";
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
	const [themeName, setThemeName] = useState<string | undefined>();
	const [theme, setThemeConfig] = useState<CSSStyleDeclaration | undefined>();
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme && savedTheme !== "undefined") {
			setThemeName(savedTheme);
		} else {
			setThemeFromSystem(setThemeName);
		}

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "data-theme" &&
					document.body.dataset.theme !== "undefined" &&
					document.body.dataset.theme !== undefined
				) {
					setThemeName(document.body.dataset.theme);
				}
			}
		});
		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});
		return () => {
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!themeName) return;
		setTheme(themeName);
		setThemeConfig(getComputedStyle(document.body));
	}, [themeName]);

	return {
		currentThemeName: themeName,
		setThemeName,
		theme,
		isDarkTheme: themeName !== "light",
		toggleDarkMode: () => {
			const newTheme = themeName !== "light" ? "light" : "dark";
			setThemeName(newTheme);
		},
		isSystemTheme: themeName === null,
	};
}

export function useChartTheme() {
	const { theme } = useTheme();
	return useMemo(() => {
		if (!theme) {
			return {
				charts: "#448ef6",
				text: "hsl(204.2, 100%, 28.6%)",
				headerText: "hsl(204.2, 100%, 28.6%)",
			};
		}
		return {
			charts: theme.getPropertyValue("--colors-charts"),
			text: theme.getPropertyValue("--colors-text"),
			headerText: theme.getPropertyValue("--colors-headerText"),
		};
	}, [theme]);
}
