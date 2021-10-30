import { useEffect, useState } from "react";
import Theme from "../../theme/theme";

export function getCurrentThemeName() {
    if (process.browser) return document.body.dataset.theme;
    return "light";
}
export const setTheme = (newTheme: string) => {
    if (process.browser) {
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
    const schemes: string[] = Object.keys(Theme);
    const newThemeIndex =
        (schemes.indexOf(getCurrentThemeName()) + 1) % schemes.length;
    const newTheme = schemes[newThemeIndex];
    setTheme(newTheme);
};

export const getAvailableThemes = () => Object.keys(Theme);
export function getCurrentTheme() {
    const currentTheme = getCurrentThemeName();
    return Theme[currentTheme];
}
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
    const [theme, setThemeName] = useState(currentTheme);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme && Theme.hasOwnProperty(savedTheme)) {
            setThemeName(savedTheme);
        } else {
            if (process.browser) {
                setThemeFromSystem(setThemeName);
            }
        }
        const listener = (e) => {
            console.log(document.body.dataset.theme);

            setThemeName(document.body.dataset.theme);
        };
        document.body.addEventListener("dataset", listener);
        return () => {
            document.body.removeEventListener("dataset", listener);
        };
    }, []);

    return {
        currentThemeName: theme,
        theme: Theme[theme],
        isSystemTheme: theme === null,
    };
}
