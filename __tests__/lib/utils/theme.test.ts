import { describe, expect, test } from "bun:test";
import { getIconClassAndAction } from '../../../lib/utils/theme';

describe("Theme Utilities", () => {
	describe("getIconClassAndAction", () => {
		test('returns "darkIcon" for dark theme', () => {
			const result = getIconClassAndAction(true);
			expect(result).toBe("darkIcon");
		});

		test('returns "lightIcon" for light theme', () => {
			const result = getIconClassAndAction(false);
			expect(result).toBe("lightIcon");
		});
	});
});
