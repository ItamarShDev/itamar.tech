/**
 * Converts a hex color string to an RGB tuple
 * @param hex - Hex color string (e.g., "#FF0000" or "#F00")
 * @returns Tuple of [red, green, blue] values (0-255)
 * @throws {Error} If the hex string is invalid
 */
export function hexToRgb(hex: string): [number, number, number] {
	if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		throw new Error("Invalid hex color format");
	}

	let c = hex.substring(1).split("");
	if (c.length === 3) {
		c = [c[0], c[0], c[1], c[1], c[2], c[2]];
	}
	const color = Number(`0x${c.join("")}`);
	return [(color >> 16) & 255, (color >> 8) & 255, color & 255];
}

/**
 * Converts a hex color string to an HSL tuple
 * @param H - Hex color string (e.g., "#FF0000" or "#F00")
 * @param index - Optional index parameter (unused in current implementation)
 * @returns Tuple of [hue, saturation, lightness] values (hue: 0-360, saturation/lightness: 0-100)
 */
export function hexToHSL(H: string, index = 0): [number, number, number] {
	// Validate hex format
	if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(H)) {
		throw new Error("Invalid hex color format");
	}

	// Convert hex to RGB first
	let r = 0;
	let g = 0;
	let b = 0;
	
	if (H.length === 4) {
		r = Number(`0x${H[1]}${H[1]}`);
		g = Number(`0x${H[2]}${H[2]}`);
		b = Number(`0x${H[3]}${H[3]}`);
	} else {
		r = Number(`0x${H[1]}${H[2]}`);
		g = Number(`0x${H[3]}${H[4]}`);
		b = Number(`0x${H[5]}${H[6]}`);
	}

	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;

	const cmin = Math.min(r, g, b);
	const cmax = Math.max(r, g, b);
	const delta = cmax - cmin;
	
	let h = 0;
	let s = 0;
	let l = 0;

	if (delta === 0) h = 0;
	else if (cmax === r) h = ((g - b) / delta) % 6;
	else if (cmax === g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);
	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;
	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return [h, s, l];
}
