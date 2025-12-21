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
}
