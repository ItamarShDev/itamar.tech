import { Analytics } from "@vercel/analytics/react";
import AnimatedViewTransition from "components/AnimatedViewTransition";
import FireworksDisplay from "components/FireworksDisplay";
import FloatingButton from "components/FloatingButton";
import PersonalChat from "components/PersonalChat";
import { ChatProvider } from "context/ChatContext";
import { FireworksProvider } from "context/FireworksContext";
import Header from "layouts/header";
import { fontVariables } from "lib/fonts";
import { getCurrentLang, getCurrentTheme } from "lib/headers";
import { ThemeProvider } from "providers/theme";
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
		<html lang={lang} className={fontVariables} suppressHydrationWarning>
			<Analytics />
			<ThemeProvider defaultTheme={theme}>
				<FireworksProvider>
					<ChatProvider>
						<body data-theme={theme} dir={lang === "he" ? "rtl" : "ltr"}>
							<FireworksDisplay />
							<div id="main-view" className={styles.mainView}>
								<Header />
								<AnimatedViewTransition>
									<main className={styles.main}>{children}</main>
								</AnimatedViewTransition>
							</div>
							<FloatingButton />
							<PersonalChat />
						</body>
					</ChatProvider>
				</FireworksProvider>
			</ThemeProvider>
		</html>
	);
}
