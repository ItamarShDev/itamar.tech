// Using fallback fonts due to network issues with Google Fonts
const fallbackFonts = {
	variable: "--font-fallback",
	className: "font-sans",
};

// Heading font - elegant, distinctive
const playfair = fallbackFonts;

// Alternative heading font - modern, clean
const inter = fallbackFonts;

export const notoSans = fallbackFonts;

export const assistant = fallbackFonts;

export const rubik = fallbackFonts;

// Body text font - readable serif for long-form content
const sourceSerif = fallbackFonts;

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
