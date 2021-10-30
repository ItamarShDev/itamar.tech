import { useEffect, useState } from "react";
import useTheme, {
    isDarkTheme,
    setTheme,
    getCurrentThemeName,
    getAvailableThemes,
    toggleDarkMode,
} from "lib/hooks/useTheme";
export function getIconClassAndAction(isDark) {
    if (isDark) {
        return "dark-icon";
    } else {
        return "light-icon";
    }
}
function ThemeItem({ currentTheme, currentThemeName, setTheme }) {
    const isSelected = currentThemeName === currentTheme;

    return (
        <li key={currentTheme} className={isSelected ? "selected" : ""}>
            <button onClick={() => setTheme(currentTheme)}>
                {currentTheme}
            </button>
            <style jsx>
                {`
                    li {
                        all: unset;
                        font-size: 1.4rem;
                        width: 100%;
                        text-transform: capitalize;
                    }
                    li:hover {
                        background-color: var(--colors-hoverDecorations);
                    }
                    li.selected {
                        background-color: var(--colors-decorations);
                        color: var(--colors-text);
                    }
                    li.selected button,
                    li:hover button {
                        mix-blend-mode: difference;
                    }
                    li button {
                        all: unset;
                        color: var(--colors-text);
                        padding: 1rem 2rem;
                    }
                `}
            </style>
        </li>
    );
}

function ThemeList() {
    const availableThemes = getAvailableThemes();
    const currentThemeName = getCurrentThemeName();
    const [currentTheme, setCurrentTheme] = useState(currentThemeName);
    useEffect(() => {
        setTheme(currentTheme);
    }, [currentTheme]);
    return (
        <div className="container">
            <ul>
                {availableThemes.map((theme) => (
                    <ThemeItem
                        key={theme}
                        currentTheme={theme}
                        currentThemeName={currentTheme}
                        setTheme={setCurrentTheme}
                    />
                ))}
            </ul>
            <style jsx>{`
                .container {
                    position: absolute;
                    top: 100%;
                    transform: translateX(-50%);
                    left: 0;
                }
                ul {
                    all: unset;
                    margin-block-start: 1rem;
                    cursor: default;
                    list-style: none;
                    background-color: var(--colors-modalBg);
                    border: 1px solid var(--colors-decorations);
                    border-radius: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
export const ThemedIcon = () => {
    const isDark = isDarkTheme();

    const [isHovered, setIsHovered] = useState(false);
    const iconClass = getIconClassAndAction(isDark);
    const title = `Toggle ${isDark ? "light" : "dark"} mode`;
    return (
        <div
            className="container"
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button
                onClick={toggleDarkMode}
                className={`icon ${iconClass}`}
                title={title}
            ></button>
            {isHovered && <ThemeList />}
            <style jsx>{`
                .container {
                    position: relative;
                }
                .icon {
                    all: unset;
                    height: 60px;
                    width: 60px;
                    font-size: 1.2em;
                    font-style: normal;
                    background-color: var(--colors-headerText);
                    mask-size: 20px;
                    mask-position: 1rem center;
                    mask-repeat: no-repeat;
                }
                .dark-icon {
                    mask-image: url(/icons/sun.svg);
                }
                .light-icon {
                    mask-image: url(/icons/moon.svg);
                }
            `}</style>
        </div>
    );
};
