import { Header } from "layouts";
import ErrorBoundary from "layouts/error-boundary";
import { useTheme } from "lib/hooks";
import { getLanguageDirection } from "lib/hooks/useTranslation";
import Head from "next/head";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { centered } from "theme/styles";
import styles from "./App.module.css";
import "./globals.css";

function App({ Component, pageProps }) {
	const direction = getLanguageDirection();
	const { currentThemeName } = useTheme();
	const title = pageProps.headerTitle;
	const { className: centerClassName, styles: centerStyle } = centered({
		selector: "main",
		isColumns: true,
	});
	const { isCentered, maxWidth = "80vw", width = "120rem" } = pageProps;
	const mainClassName = isCentered
		? `${styles.main} ${centerClassName}`
		: styles.main;
	const _title = title
		? `Itamar Sharify - ${pageProps.title}`
		: "Itamar Sharify";
	useEffect(() => {
		document.body.dataset.theme = currentThemeName;
	}, [currentThemeName]);

	return (
		<div id="main-view" className={styles.mainView} style={{ ...direction }}>
			<Head>
				<title>{_title}</title>
			</Head>
			<Header title={title} />

			<main className={mainClassName} style={{ maxWidth, width }}>
				<ErrorBoundary>
					<Component {...pageProps} />
				</ErrorBoundary>
				{centerStyle}
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
