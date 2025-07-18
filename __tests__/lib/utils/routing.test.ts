import { describe, expect, test } from "bun:test";
import { getRoute } from "lib/utils/routing";

describe("Routing Utilities", () => {
	describe("getRoute", () => {
		test("returns root path with default locale when pathname is empty", () => {
			const result = getRoute("");
			expect(result).toBe("/en");
		});

		test("switches between he and en locales", () => {
			// Test switching from en to he
			const enPath = "/en/about";
			const hePath = getRoute(enPath, "he");
			expect(hePath).toBe("/he/about");

			// Test switching from he to en
			const backToEnPath = getRoute(hePath, "en");
			expect(backToEnPath).toBe("/en/about");
		});

		test("toggles locale when no target locale is provided", () => {
			// From en to he
			const enPath = "/en/about";
			const hePath = getRoute(enPath);
			expect(hePath).toBe("/he/about");

			// From he to en
			const backToEnPath = getRoute(hePath);
			expect(backToEnPath).toBe("/en/about");
		});

		test("handles root path correctly", () => {
			const rootPath = "/";
			const result = getRoute(rootPath, "he");
			expect(result).toBe("/he");
		});

		test("handles paths with multiple segments", () => {
			const path = "/en/blog/post-1";
			const result = getRoute(path, "he");
			expect(result).toBe("/he/blog/post-1");
		});
	});
});
