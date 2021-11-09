import PropTypes from "prop-types";
import { useTheme } from "lib/hooks";
import { Header } from "layouts";
import { centered } from "theme/styles";
import Head from "next/head";
import React, { useEffect } from "react";
import { useLanguageDirection } from "lib/hooks/useTranslation";
function App({ Component, pageProps }) {
    const direction = useLanguageDirection();
    const { currentThemeName } = useTheme();
    const title = pageProps.headerTitle;
    const { className: centerClassName, styles: centerStyle } = centered({
        selector: "main",
        isColumns: true,
    });
    const { isCentered, maxWidth = "80vw", width = "120rem" } = pageProps;
    const mainClassName = isCentered ? centerClassName : "";
    const _title = title
        ? `Itamar Sharify - ${pageProps.title}`
        : "Itamar Sharify";
    useEffect(() => {
        document.body.dataset.theme = currentThemeName;
    }, [currentThemeName]);

    return (
        <div id="main-view" style={{ ...direction }}>
            <Head>
                <title>{_title}</title>
            </Head>
            <Header title={title} />

            <main className={mainClassName}>
                <Component {...pageProps} />
                {centerStyle}
            </main>
            <style jsx>{`
                main {
                    max-width: ${maxWidth};
                    width: ${width};
                    margin: 0 auto;
                    display: block;
                    transition: filter 0.5s linear;
                }
            `}</style>

            <style jsx global>{`
                *,
                *::before,
                *::after {
                    box-sizing: inherit;
                }
                html {
                    font-size: 10px;
                    box-sizing: border-box;
                    scroll-behavior: smooth;
                }

                @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");
                @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400&display=swap");

                body {
                    background-color: var(--colors-bg);
                    color: var(--colors-text);
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }
                #main-view {
                    display: grid;
                    min-height: 100vh;
                    grid-template-rows: 6rem 1fr;
                }

                a {
                    color: var(--colors-link);
                    scroll-margin-top: 6.5rem;
                }

                h1 {
                    font-size: 4rem;
                }
                h2 {
                    font-size: 3rem;
                }
                h3 {
                    font-size: 2.5rem;
                }
                h4 {
                    font-size: 2rem;
                }
                h5 {
                    font-size: 1.8rem;
                }
                h6 {
                    font-size: 1.2rem;
                }

                .logo {
                    height: 1rem;
                }
            `}</style>
        </div>
    );
}

App.propTypes = {
    pageProps: PropTypes.shape({
        headerTitle: PropTypes.string,
    }),
};

export default App;
