import localFont from "next/font/local";

const inter = localFont({
	src: "../public/fonts/studio-inter.woff2",
	variable: "--font-inter",
	display: "swap",
	weight: "100 900",
});
const heebo = localFont({
	src: "../public/fonts/studio-heebo.woff2",
	variable: "--font-heebo",
	display: "swap",
	weight: "100 900",
	preload: false,
});
export const fontVariables = `${inter.variable} ${heebo.variable}`;
export const bodyFontClass = inter.className;
