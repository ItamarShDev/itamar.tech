import { createContext, useContext, useEffect, useState } from "react";
import Theme from "../../theme/theme";
export const ThemeContext = createContext(Theme.light);

/**
 * uses System define theme
 * @param {Function} setTheme
 */
function setThemeFromSystem(setTheme: Function) {
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
    const sysTheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (sysTheme.addListener) {
        sysTheme.addListener((e) => {
            setTheme(e.matches ? "dark" : "light");
        });
    } else if (sysTheme.addEventListener) {
        sysTheme.addEventListener("change", (e) => {
            setTheme(e.matches ? "dark" : "light");
        });
    }
}

export default function useTheme(currentTheme: string = "light") {
    const [theme, setTheme] = useState(currentTheme);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme && Theme.hasOwnProperty(savedTheme)) {
            setTheme(savedTheme);
        } else {
            if (process.browser) {
                setThemeFromSystem(setTheme);
            }
        }
    }, []);
    const getAvailableThemes = () => Object.keys(Theme);
    const toggleTheme = () => {
        const schemes: string[] = Object.keys(Theme);
        const newThemeIndex = (schemes.indexOf(theme) + 1) % schemes.length;
        const newTheme = schemes[newThemeIndex];
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };
    const setNewTheme = (newTheme: string) => {
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    const toggleDarkMode = () => {
        const newTheme = theme !== "light" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };
    const setSystemTheme = () => {
        localStorage.removeItem("theme");
        setTheme(null);
        if (process.browser) {
            setThemeFromSystem(setTheme);
        }
    };

    return {
        currentThemeName: theme,
        theme: Theme[theme],
        ThemeContext,
        toggleTheme,
        toggleDarkMode,
        setSystemTheme,
        getAvailableThemes,
        setTheme: setNewTheme,
        isDark: theme != "light",
        isSystemTheme: theme === null,
    };
}

export function useThemeContext() {
    return useContext(ThemeContext);
}
