import { Header } from "layouts";
import ErrorBoundary from "layouts/error-boundary";
import { useTheme } from "lib/hooks";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../globals.css";
import styles from "./App.module.css";

function App({ Component, pageProps }) {
	const { locale } = useRouter();
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
		<div
			id="main-view"
			className={styles.mainView}
			lang={locale}
			dir={locale === "he" ? "rtl" : "ltr"}
		>
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

export default App;
