import { Analytics } from "@vercel/analytics/react";
import Header from "layouts/header";
import { fontVariables } from "lib/fonts";
import { getCurrentLang, getCurrentTheme } from "lib/headers";
import { ThemeProvider } from "providers/theme";
import { FireworksProvider } from "../context/FireworksContext";
import FireworksDisplay from "../components/FireworksDisplay";
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
		<html lang={lang} className={fontVariables}>
			<Analytics />
			<ThemeProvider defaultTheme={theme}>
        <FireworksProvider>
          <body data-theme={theme} dir={lang === "he" ? "rtl" : "ltr"}>
            <FireworksDisplay />
            <div id="main-view" className={styles.mainView}>
              <Header />
              <main className={styles.main}>{children}</main>
            </div>
          </body>
        </FireworksProvider>
      </ThemeProvider>
		</html>
	);
}
