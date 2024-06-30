export function hexToRgb(hex) {
	let c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split("");
		if (c.length === 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = Number(`0x${c.join("")}`);
		return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
	}
	throw new Error("Bad Hex");
}

export function hexToHSL(H, index = 0) {
	// Convert hex to RGB first
	let r = 0;
	let g = 0;
	let b = 0;
	if (H.length === 4) {
		r = Number(`0x${H[1]}${H[1]}`);
		g = Number(`0x${H[2]}${H[2]}`);
		b = Number(`0x${H[3]}${H[3]}`);
	} else if (H.length === 7) {
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
	h = (h - index * 91) % 361;
	return [h, s, l];
}
