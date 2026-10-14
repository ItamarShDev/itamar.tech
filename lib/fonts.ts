import localFont from "next/font/local";

const inter = localFont({
	src: "../public/fonts/studio-inter.woff2",
	variable: "--font-inter",
	display: "swap",
	weight: "100 900",
});
export const fontVariables = inter.variable;
export const bodyFontClass = inter.className;
