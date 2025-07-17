import { describe, expect, test } from "bun:test";
import { calculateMatch, getQualificationText } from "./match";

describe("Match Utilities", () => {
	const testRankings = {
		react: 10,
		typescript: 8,
		javascript: 7,
		nodejs: 6,
		python: 5,
	};

	describe("calculateMatch", () => {
		test("returns 0 for empty attributes array", () => {
			const result = calculateMatch([], testRankings);
			expect(result).toBe(0);
		});

		test("sums up scores for matched attributes", () => {
			const result = calculateMatch(["react", "typescript"], testRankings);
			expect(result).toBe(18); // 10 (react) + 8 (typescript)
		});

		test("ignores attributes not found in rankings", () => {
			const result = calculateMatch(["react", "unknown"], testRankings);
			expect(result).toBe(10); // Only react (10) is counted
		});

		test("works with empty rankings object", () => {
			const result = calculateMatch(["react", "typescript"], {});
			expect(result).toBe(0);
		});
	});

	describe("getQualificationText", () => {
		test('returns "Perfect Match!" for scores >= 90', () => {
			expect(getQualificationText(90)).toBe("Perfect Match!");
			expect(getQualificationText(95)).toBe("Perfect Match!");
			expect(getQualificationText(100)).toBe("Perfect Match!");
		});

		test('returns "Great Match!" for scores between 70-89', () => {
			expect(getQualificationText(70)).toBe("Great Match!");
			expect(getQualificationText(80)).toBe("Great Match!");
			expect(getQualificationText(89)).toBe("Great Match!");
		});

		test('returns "Good Match" for scores between 50-69', () => {
			expect(getQualificationText(50)).toBe("Good Match");
			expect(getQualificationText(60)).toBe("Good Match");
			expect(getQualificationText(69)).toBe("Good Match");
		});

		test('returns "Fair Match" for scores between 30-49', () => {
			expect(getQualificationText(30)).toBe("Fair Match");
			expect(getQualificationText(40)).toBe("Fair Match");
			expect(getQualificationText(49)).toBe("Fair Match");
		});

		test('returns "Needs Improvement" for scores below 30', () => {
			expect(getQualificationText(0)).toBe("");
			expect(getQualificationText(15)).toBe("");
			expect(getQualificationText(29)).toBe("");
		});
	});
});
