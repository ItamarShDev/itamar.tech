import Header from "layouts/header";
import { getCurrentLang, getCurrentTheme } from "lib/headers";
import {
	Alegreya_Sans_SC,
	Codystar,
	Fira_Code,
	Quicksand,
	Roboto,
} from "next/font/google";
import "../globals.css";
import styles from "./layout.module.css";

export const metadata = {
	title: {
		template: "%s - Itamar Sharify",
		default: "Itamar Sharify",
	},
};

const alegreya = Alegreya_Sans_SC({ weight: "400", subsets: ["latin"] });
const fira = Fira_Code({ weight: "400", subsets: ["latin"] });
const curs = Codystar({ weight: "400", subsets: ["latin"] });
const quick = Quicksand({ weight: "400", subsets: ["latin"] });
const rob = Roboto({ weight: "400", subsets: ["latin"] });
function classes(...names: string[]) {
	return names.join(" ");
}
export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const lang = await getCurrentLang();
	const theme = await getCurrentTheme();
	return (
		<html
			lang={lang}
			className={classes(
				alegreya.className,
				fira.className,
				curs.className,
				quick.className,
				rob.className,
			)}
		>
			<body data-theme={theme} dir={lang === "he" ? "rtl" : "ltr"}>
				<div id="main-view" className={styles.mainView}>
					<Header />
					<main className={styles.main}>{children}</main>
				</div>
			</body>
		</html>
	);
}
