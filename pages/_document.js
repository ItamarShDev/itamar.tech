import Document, { Head, Html, Main, NextScript } from "next/document";
import { generateCSSThemeSelectors } from "theme/styles";
 

export default class MyDocument extends Document {
	render() {
		const themes = generateCSSThemeSelectors();
		return (
			<Html lang="en">
				<Head>
					<link rel="icon" href="/favicon.ico" />
					<meta name="title" content="Itamar Sharify" />
					<meta
						name="description"
						content="Itamar Sharify's personal website"
					/>

					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://itamar.tech/" />
					<meta property="og:title" content="Itamar Sharify" />
					<meta
						property="og:description"
						content="Itamar Sharify's personal website"
					/>
					<meta
						property="og:image"
						content="https://itamar.tech/images/meta-image.png"
					/>
					<meta
						property="og:site_name"
						content="Itamar Sharify's personal website"
					/>
					<meta
						name="twitter:image:alt"
						content="Itamar Sharify's personal websitee"
					/>

					<meta property="twitter:card" content="website" />
					<meta property="twitter:title" content="Itamar Sharify" />
					<meta property="twitter:url" content="https://itamar.tech/" />
					<meta
						property="twitter:description"
						content="Itamar Sharify's personal website"
					/>
					<meta
						property="twitter:image"
						content="https://itamar.tech/images/meta-image.png"
					/>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Codystar&display=swap"
						rel="stylesheet"
					/>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:ital,wght@0,400;0,500;1,400&family=Codystar&display=swap"
						rel="stylesheet"
					/>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap"
						rel="stylesheet"
					/>
					<style>{themes}</style>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
