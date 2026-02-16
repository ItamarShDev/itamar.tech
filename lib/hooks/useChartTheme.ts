"use client";
import { useThemeContext } from "providers/theme";
import { useEffect, useState } from "react";
export const SCHEMES = ["light", "dark", "monokai", "cobalt2"];

const setTheme = (newTheme?: string) => {
	if (newTheme) {
		document.body.dataset.theme = newTheme;
		localStorage.setItem("theme", newTheme);
	}
};

function useTheme() {
	const { theme } = useThemeContext();
	const [themeConfig, setThemeConfig] = useState<CSSStyleDeclaration>();
	useEffect(() => {
		// Avoid synchronous state update warning
		requestAnimationFrame(() => {
			setThemeConfig(window.getComputedStyle(document.body));
		});
	}, []);
	useEffect(() => {
		if (!theme) return;
		setTheme(theme);
		// Avoid synchronous state update warning
		requestAnimationFrame(() => {
			setThemeConfig(getComputedStyle(document.body));
		});
	}, [theme]);

	return {
		themeConfig,
	};
}

export function useChartTheme() {
	const { themeConfig } = useTheme();
	if (!themeConfig) {
		return {
			charts: "#448ef6",
			text: "#1a365d",
			headerText: "#1a365d",
		};
	}
	const charts = themeConfig.getPropertyValue("--colors-charts")?.trim() || "#448ef6";
	const text = themeConfig.getPropertyValue("--colors-text")?.trim() || "#1a365d";
	const headerText = themeConfig.getPropertyValue("--colors-headerText")?.trim() || "#1a365d";

	return {
		charts,
		text,
		headerText,
	};
}
