import styles from "app/layout.module.css";
import AnimatedViewTransition from "components/AnimatedViewTransition";
import Footer from "layouts/footer";
import Header from "layouts/header";
import type { ReactNode } from "react";

export default async function LanguageLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	return (
		<>
			<a className="skip-link" href="#content">
				{lang === "he" ? "דילוג לתוכן" : "Skip to content"}
			</a>
			<Header />
			<AnimatedViewTransition>
				<main id="content" tabIndex={-1} className={styles.main}>
					{children}
				</main>
			</AnimatedViewTransition>
			<Footer />
		</>
	);
}
