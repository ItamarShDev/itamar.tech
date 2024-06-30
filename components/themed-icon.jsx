import useTheme, { getAvailableThemes } from "lib/hooks/useTheme";
import { useIsRTL } from "lib/hooks/useTranslation";
export function getIconClassAndAction(isDark) {
	if (isDark) {
		return "dark-icon";
	}
	return "light-icon";
}
function ThemeItem({ currentTheme, isSelected, setTheme }) {
	return (
		<li key={currentTheme} className={isSelected ? "selected" : ""}>
			<button type="button" onClick={() => setTheme(currentTheme)}>
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

function ThemeList({ currentThemeName, setThemeName }) {
	const isRTL = useIsRTL();
	const availableThemes = getAvailableThemes();
	return (
		<div className="container">
			<ul>
				{availableThemes.map((theme) => (
					<ThemeItem
						key={theme}
						currentTheme={theme}
						isSelected={currentThemeName === theme}
						setTheme={setThemeName}
					/>
				))}
			</ul>
			<style jsx>{`
                .container {
                    position: absolute;
                    top: 100%;
                    transform: translateX(${isRTL ? "0%" : "-50%"});
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
	const { currentThemeName, setThemeName, isDarkTheme, toggleDarkMode } =
		useTheme();

	const iconClass = getIconClassAndAction(isDarkTheme);
	const title = `Toggle ${isDarkTheme ? "light" : "dark"} mode`;
	return (
		<div className="container">
			<button
				type="button"
				onClick={toggleDarkMode}
				className={`icon ${iconClass}`}
				title={title}
			/>
			<div className="list">
				<ThemeList
					currentThemeName={currentThemeName}
					setThemeName={setThemeName}
				/>
			</div>
			<style jsx>{`
                .container {
                    position: relative;
                }
                .list {
                    display: none;
                }
                .container:hover .list {
                    display: block;
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
