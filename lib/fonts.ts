// Fallback fonts configuration for environments where Google Fonts are blocked
// This ensures the build succeeds even when fonts.googleapis.com is not accessible

// Mock font configuration that provides fallback CSS variables
const createFallbackFont = (variable: string) => ({
	variable,
	className: '',
});

// Heading font - elegant, distinctive (fallback to serif)
const playfair = createFallbackFont("--font-playfair");

// Alternative heading font - modern, clean (fallback to sans-serif)
const inter = createFallbackFont("--font-inter");

export const notoSans = createFallbackFont("--font-noto-sans");

export const assistant = createFallbackFont("--font-assistant");

export const rubik = createFallbackFont("--font-rubik");

// Body text font - readable serif for long-form content (fallback to serif)
const sourceSerif = createFallbackFont("--font-source-serif");

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
