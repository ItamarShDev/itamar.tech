import { useTheme } from "lib/hooks";
const HOC = (Comp, props) => {
    const { theme, toggleTheme, ThemeContext, isDark } = useTheme();

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            <button onClick={toggleTheme}>Toggle theme</button>
            <Comp {...props} />
        </ThemeContext.Provider>
    );
};

export default HOC;
