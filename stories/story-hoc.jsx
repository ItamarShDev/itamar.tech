import { toggleTheme } from "lib/hooks/useTheme";
const HOC = (Comp, props) => {
    return (
        <>
            <button onClick={toggleTheme}>Toggle theme</button>
            <Comp {...props} />
        </>
    );
};

export default HOC;
