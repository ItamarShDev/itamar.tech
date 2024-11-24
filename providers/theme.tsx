"use client";

import { setCurrentTheme, toggleDarkTheme } from "lib/headers";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
export const THEMES = ["light", "dark", "monokai", "cobalt2"] as const;
export type Theme = (typeof THEMES)[number];
type ThemeContextType = {
	theme: Theme;
	selectTheme: (theme: Theme) => void;
	toggleMode: () => void;
};
const ThemeContext = createContext<ThemeContextType>({
	theme: "dark",
	selectTheme: () => {},
	toggleMode: () => {},
});

export function useThemeContext() {
	return useContext(ThemeContext);
}

function useTheme(currentThemeName: Theme) {
	const router = useRouter();
	const [theme, setTheme] = useState<Theme>(currentThemeName);

	const selectTheme = (theme: Theme) => {
		setCurrentTheme(theme);
		document.body.setAttribute("data-theme", theme);
		setTheme(theme);
		router.refresh();
	};
	const toggleMode = async () => {
		await toggleDarkTheme();
		const selectedDark = theme !== "light";
		const newTheme = selectedDark ? "light" : "dark";
		setTheme(newTheme);
		document.body.setAttribute("data-theme", newTheme);
		router.refresh();
	};
	return { theme, selectTheme, toggleMode };
}

export const ThemeProvider = ({
	defaultTheme,
	children,
}: {
	children: React.ReactNode;
	defaultTheme: Theme;
}) => {
	const context = useTheme(defaultTheme);
	return (
		<ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
	);
};
