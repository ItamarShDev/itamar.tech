"use client";

import { setCurrentTheme, toggleDarkTheme } from "lib/headers";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

export const THEMES = ["light", "dark", "monokai", "cobalt2", "gpt5", "cursor", "opus"] as const;
export type Theme = (typeof THEMES)[number];

async function applyThemeWithRipple(newTheme: Theme, event?: React.MouseEvent) {
	// Get click coordinates for ripple origin
	const x = event?.clientX ?? window.innerWidth / 2;
	const y = event?.clientY ?? 0;

	// Calculate the maximum radius needed to cover the entire screen
	const maxRadius = Math.hypot(
		Math.max(x, window.innerWidth - x),
		Math.max(y, window.innerHeight - y)
	);

	// Check if View Transitions API is supported
	if (!document.startViewTransition) {
		document.body.setAttribute("data-theme", newTheme);
		return;
	}

	// Set CSS custom properties for the ripple origin
	document.documentElement.style.setProperty("--ripple-x", `${x}px`);
	document.documentElement.style.setProperty("--ripple-y", `${y}px`);
	document.documentElement.style.setProperty("--ripple-radius", `${maxRadius}px`);

	// Add class to enable ripple-specific CSS
	document.documentElement.classList.add("theme-transition");

	const transition = document.startViewTransition(() => {
		document.body.setAttribute("data-theme", newTheme);
	});

	await transition.ready;

	// Clean up after animation completes
	await transition.finished;
	document.documentElement.classList.remove("theme-transition");
}

type ThemeContextType = {
	theme: Theme;
	selectTheme: (theme: Theme, event?: React.MouseEvent) => void;
	toggleMode: (event?: React.MouseEvent) => void;
};

const ThemeContext = createContext<ThemeContextType>({
	theme: "dark",
	selectTheme: () => { },
	toggleMode: () => { },
});

export function useThemeContext() {
	return useContext(ThemeContext);
}

function useTheme(currentThemeName: Theme) {
	const router = useRouter();
	const [theme, setTheme] = useState<Theme>(currentThemeName);

	const selectTheme = async (theme: Theme, event?: React.MouseEvent) => {
		await applyThemeWithRipple(theme, event);
		setTheme(theme);
		await setCurrentTheme(theme);
		router.refresh();
	};

	const toggleMode = async (event?: React.MouseEvent) => {
		const selectedDark = theme !== "light";
		const newTheme = selectedDark ? "light" : "dark";
		await applyThemeWithRipple(newTheme, event);
		setTheme(newTheme);
		await toggleDarkTheme();
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
