import { describe, expect, test } from "bun:test";
import { type QuotesCollection, extractQuotesByPerson } from "lib/utils/quote";

describe("Quote Utilities", () => {
	describe("extractQuotesByPerson", () => {
		test("extracts and flattens quotes from a nested collection", () => {
			const mockQuotes: QuotesCollection = {
				"Person 1": {
					role: "Role 1",
					profile: "Profile 1",
					quotes: ["Quote 1", "Quote 2"],
				},
				"Person 2": {
					role: "Role 2",
					profile: "Profile 2",
					quotes: ["Quote 3"],
				},
			};

			const result = extractQuotesByPerson(mockQuotes);

			expect(result).toHaveLength(3);
			expect(result).toContainEqual({
				role: "Role 1",
				profile: "Profile 1",
				quote: "Quote 1",
			});
			expect(result).toContainEqual({
				role: "Role 1",
				profile: "Profile 1",
				quote: "Quote 2",
			});
			expect(result).toContainEqual({
				role: "Role 2",
				profile: "Profile 2",
				quote: "Quote 3",
			});
		});

		test("returns an empty array for an empty collection", () => {
			const result = extractQuotesByPerson({});
			expect(result).toEqual([]);
		});

		test("handles a collection with empty quotes array", () => {
			const mockQuotes: QuotesCollection = {
				"Person 1": {
					role: "Role 1",
					profile: "Profile 1",
					quotes: [],
				},
			};

			const result = extractQuotesByPerson(mockQuotes);
			expect(result).toEqual([]);
		});
	});
});
