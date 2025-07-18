import { describe, expect, test } from "bun:test";
import { hexToHSL, hexToRgb } from "lib/utils/color";

describe("Color Utilities", () => {
	describe("hexToRgb", () => {
		test("converts 3-digit hex to RGB", () => {
			expect(hexToRgb("#F00")).toEqual([255, 0, 0]);
			expect(hexToRgb("#0F0")).toEqual([0, 255, 0]);
			expect(hexToRgb("#00F")).toEqual([0, 0, 255]);
			expect(hexToRgb("#FFF")).toEqual([255, 255, 255]);
			expect(hexToRgb("#000")).toEqual([0, 0, 0]);
		});

		test("converts 6-digit hex to RGB", () => {
			expect(hexToRgb("#FF0000")).toEqual([255, 0, 0]);
			expect(hexToRgb("#00FF00")).toEqual([0, 255, 0]);
			expect(hexToRgb("#0000FF")).toEqual([0, 0, 255]);
			expect(hexToRgb("#FFFFFF")).toEqual([255, 255, 255]);
			expect(hexToRgb("#000000")).toEqual([0, 0, 0]);
		});

		test("throws error for invalid hex format", () => {
			expect(() => hexToRgb("red")).toThrow("Invalid hex color format");
			expect(() => hexToRgb("#FF")).toThrow("Invalid hex color format");
			expect(() => hexToRgb("#FFFFF")).toThrow("Invalid hex color format");
			expect(() => hexToRgb("#GGGGGG")).toThrow("Invalid hex color format");
		});
	});

	describe("hexToHSL", () => {
		test("converts hex to HSL", () => {
			// Red
			expect(hexToHSL("#F00")).toEqual([0, 100, 50]);
			// Green
			expect(hexToHSL("#0F0")).toEqual([120, 100, 50]);
			// Blue
			expect(hexToHSL("#00F")).toEqual([240, 100, 50]);
			// White
			expect(hexToHSL("#FFF")).toEqual([0, 0, 100]);
			// Black
			expect(hexToHSL("#000")).toEqual([0, 0, 0]);
			// Random color
			const [h, s, l] = hexToHSL("#1E88E5");
			expect(h).toBeGreaterThanOrEqual(0);
			expect(h).toBeLessThanOrEqual(360);
			expect(s).toBeGreaterThanOrEqual(0);
			expect(s).toBeLessThanOrEqual(100);
			expect(l).toBeGreaterThanOrEqual(0);
			expect(l).toBeLessThanOrEqual(100);
		});

		test("throws error for invalid hex format", () => {
			expect(() => hexToHSL("red")).toThrow("Invalid hex color format");
			expect(() => hexToHSL("#FF")).toThrow("Invalid hex color format");
			expect(() => hexToHSL("#FFFFF")).toThrow("Invalid hex color format");
			expect(() => hexToHSL("#GGGGGG")).toThrow("Invalid hex color format");
		});
	});
});
