import { Analytics } from "@vercel/analytics/react";
import FireworksDisplay from "components/FireworksDisplay";
import FloatingButton from "components/FloatingButton";
import PersonalChat from "components/PersonalChat";
import { ChatProvider } from "context/ChatContext";
import { FireworksProvider } from "context/FireworksContext";
import { fontVariables } from "lib/fonts";
import { getCurrentTheme } from "lib/headers";
import { ThemeProvider } from "providers/theme";
import "../globals.css";
import "../studio.css";
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
	const theme = await getCurrentTheme();

	return (
		<html lang="en" className={fontVariables} suppressHydrationWarning>
			<body data-theme={theme} dir="ltr">
				<Analytics />
				<ThemeProvider defaultTheme={theme}>
					<FireworksProvider>
						<ChatProvider>
							<FireworksDisplay />
							<div id="main-view" className={styles.mainView}>
								{children}
							</div>
							<FloatingButton />
							<PersonalChat />
						</ChatProvider>
					</FireworksProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
