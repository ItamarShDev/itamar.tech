import { Header } from "layouts";
import ErrorBoundary from "layouts/error-boundary";
import { useTheme } from "lib/hooks";
import Head from "next/head";
import PropTypes from "prop-types";
import { useEffect } from "react";
import "../globals.css";
import styles from "./App.module.css";

function App({ Component, pageProps }) {
	const { currentThemeName } = useTheme();
	const title = pageProps.headerTitle;

	const { isCentered, maxWidth = "80vw", width = "120rem" } = pageProps;
	const mainClassName = isCentered
		? `${styles.main} ${styles.centered}`
		: styles.main;
	const _title = title
		? `Itamar Sharify - ${pageProps.title}`
		: "Itamar Sharify";
	useEffect(() => {
		if (currentThemeName) document.body.dataset.theme = currentThemeName;
	}, [currentThemeName]);

	return (
		<div id="main-view" className={styles.mainView}>
			<Head>
				<title>{_title}</title>
			</Head>
			<Header title={title} />

			<main className={mainClassName} style={{ maxWidth, width }}>
				<ErrorBoundary>
					<Component {...pageProps} />
				</ErrorBoundary>
			</main>
		</div>
	);
}

App.propTypes = {
	pageProps: PropTypes.shape({
		headerTitle: PropTypes.string,
	}),
};

export default App;
