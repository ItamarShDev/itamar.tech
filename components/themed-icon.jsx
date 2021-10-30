import { useContext, useState } from "react";
import { ThemeContext } from "lib/hooks";
export function getIconClassAndAction(isDark) {
    if (isDark) {
        return "dark-icon";
    } else {
        return "light-icon";
    }
}
function ThemeItem({ currentTheme }) {
    const { setTheme, theme, currentThemeName } = useContext(ThemeContext);
    return (
        <li
            key={currentTheme}
            className={currentThemeName === currentTheme ? "selected" : ""}
        >
            <button onClick={() => setTheme(currentTheme)}>
                {currentTheme}
            </button>
            <style jsx>
                {`
                    li {
                        all: unset;
                        font-size: 1.4rem;
                        width: 100%;
                    }
                    li:hover {
                        background-color: ${theme.hoverDecorations};
                    }
                    li.selected {
                        background-color: ${theme.decorations};
                        color: ${theme.text};
                    }
                    li.selected button,
                    li:hover button {
                        mix-blend-mode: difference;
                    }
                    li button {
                        all: unset;
                        color: ${theme.text};
                        padding: 1rem 2rem;
                    }
                `}
            </style>
        </li>
    );
}

function ThemeList() {
    const { getAvailableThemes, theme } = useContext(ThemeContext);
    const availableThemes = getAvailableThemes();

    return (
        <div className="container">
            <ul>
                {availableThemes.map((theme) => (
                    <ThemeItem key={theme} currentTheme={theme} />
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
                    background-color: ${theme.modalBg};
                    border: 1px solid ${theme.decorations};
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
    const { toggleDarkMode, isDark, theme } = useContext(ThemeContext);
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
                onClick={() => toggleDarkMode()}
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
                    background-color: ${theme.headerText};
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
