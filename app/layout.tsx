import Header from "layouts/header";
import { getCurrentLang, getCurrentTheme } from "lib/headers";
import "../globals.css";
import styles from "./layout.module.css";

export const metadata = {
	title: {
		template: "%s - Itamar Sharify",
		default: "Itamar Sharify",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const lang = await getCurrentLang();
	const theme = await getCurrentTheme();
	return (
		<html lang={lang}>
			<body data-theme={theme} dir={lang === "he" ? "rtl" : "ltr"}>
				<div id="main-view" className={styles.mainView}>
					<Header />
					<main className={styles.main}>{children}</main>
				</div>
			</body>
		</html>
	);
}
