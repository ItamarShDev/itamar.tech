import {
	Assistant,
	Inter,
	Lora,
	Noto_Sans,
	Playfair_Display,
	Rubik,
} from "next/font/google";

// Heading font - elegant, distinctive
const playfair = Playfair_Display({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-playfair",
});

// Alternative heading font - modern, clean
const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const notoSans = Noto_Sans({
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap",
	variable: "--font-noto-sans",
});

export const assistant = Assistant({
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap",
	variable: "--font-assistant",
});

export const rubik = Rubik({
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap",
	variable: "--font-rubik",
});

// Body text font - readable serif for long-form content
const sourceSerif = Lora({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-source-serif",
});

// Font class variables for use in layout
export const fontVariables = [
	playfair.variable,
	inter.variable,
	sourceSerif.variable,
	notoSans.variable,
	assistant.variable,
	rubik.variable,
].join(" ");

// Export a body font class for use in blog/article content
export const bodyFontClass = `${notoSans.className} ${assistant.className} ${rubik.className}`;
