import NextJSLogo from "public/logos/nextjs.png";
import PythonLogo from "public/logos/python.svg";
import CLJSLogo from "public/logos/cljs.png";
import JSLogo from "public/logos/javascript.svg";
import HTMLLogo from "public/logos/html-5.svg";
import ReactLogo from "public/logos/react-logo.png";
import JupyterLogo from "public/logos/jupyter.png";
import MobXLogo from "public/logos/mobx.png";
import { useContext } from "react";
import { ThemeContext } from "lib/hooks";
import { invertByTheme } from "theme/styles";
import { Image } from "components";

export default function LibrariesAndLanguagesLogos() {
    const { isDark } = useContext(ThemeContext);

    const { className: inverted, styles: invertedStyle } = invertByTheme(
        isDark
    );
    return (
        <>
            <Image
                image={NextJSLogo}
                className={inverted}
                alt="nextjs"
                title="Next.js"
                size="3em"
            />
            <Image image={PythonLogo} alt="python" title="Python" size="3em" />
            <Image
                image={CLJSLogo}
                alt="clojurescript"
                title="clojure"
                size="3em"
            />
            <Image
                image={JSLogo}
                alt="javascript"
                title="javascript"
                size="3em"
            />
            <Image image={HTMLLogo} alt="HTML5" title="HTML5" size="3em" />
            <Image image={ReactLogo} size="3em" title="React" alt="react" />
            <Image
                image={JupyterLogo}
                alt="jupyter"
                title="Jupyter"
                size="3em"
            />
            <Image image={MobXLogo} alt="mobx" title="MobX" size="3em" />
            {invertedStyle}
        </>
    );
}
