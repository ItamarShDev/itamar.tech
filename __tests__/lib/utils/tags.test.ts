import { afterEach, describe, expect, test } from "bun:test";
import {
	addTag,
	handleTagInputKeyDown,
	removeLastTag,
	removeTag,
} from "lib/utils/tags";
import { vi } from "vitest";

describe("Tag Utilities", () => {
	describe("handleTagInputKeyDown", () => {
		const mockEvent = {
			preventDefault: vi.fn(),
			key: "",
			target: { value: "test" },
		} as unknown as React.KeyboardEvent<HTMLInputElement>;

		const mockFilteredItems = ["apple", "banana", "cherry"];
		const mockOnEnter = vi.fn();
		const mockOnEscape = vi.fn();
		const mockOnBackspace = vi.fn();

		afterEach(() => {
			vi.clearAllMocks();
		});

		test("handles ArrowDown key", () => {
			const newIndex = handleTagInputKeyDown(
				{ ...mockEvent, key: "ArrowDown" },
				0,
				mockFilteredItems,
				mockOnEnter,
				mockOnEscape,
				mockOnBackspace,
			);
			expect(newIndex).toBe(1);
			expect(mockOnEnter).not.toHaveBeenCalled();
			expect(mockOnEscape).not.toHaveBeenCalled();
			expect(mockOnBackspace).not.toHaveBeenCalled();
		});

		test("handles ArrowUp key", () => {
			const newIndex = handleTagInputKeyDown(
				{ ...mockEvent, key: "ArrowUp" },
				1,
				mockFilteredItems,
				mockOnEnter,
				mockOnEscape,
				mockOnBackspace,
			);
			expect(newIndex).toBe(0);
		});

		test("handles Enter key", () => {
			const newIndex = handleTagInputKeyDown(
				{ ...mockEvent, key: "Enter" },
				1,
				mockFilteredItems,
				mockOnEnter,
				mockOnEscape,
				mockOnBackspace,
			);
			expect(newIndex).toBe(1);
			expect(mockOnEnter).toHaveBeenCalledWith("banana");
		});

		test("handles Escape key", () => {
			const newIndex = handleTagInputKeyDown(
				{ ...mockEvent, key: "Escape" },
				1,
				mockFilteredItems,
				mockOnEnter,
				mockOnEscape,
				mockOnBackspace,
			);
			expect(newIndex).toBe(1);
			expect(mockOnEscape).toHaveBeenCalled();
		});

		test("handles Backspace key with empty input", () => {
			const newIndex = handleTagInputKeyDown(
				{
					...mockEvent,
					key: "Backspace",
					target: { value: "" },
				} as unknown as typeof mockEvent,
				1,
				mockFilteredItems,
				mockOnEnter,
				mockOnEscape,
				mockOnBackspace,
			);
			expect(newIndex).toBe(1);
			expect(mockOnBackspace).toHaveBeenCalled();
		});
	});

	describe("removeTag", () => {
		test("removes the specified tag", () => {
			const tags = ["apple", "banana", "cherry"];
			const result = removeTag(tags, "banana");
			expect(result).toEqual(["apple", "cherry"]);
		});

		test("returns a new array", () => {
			const tags = ["apple", "banana"];
			const result = removeTag(tags, "banana");
			expect(result).not.toBe(tags);
		});
	});

	describe("removeLastTag", () => {
		test("removes the last tag", () => {
			const tags = ["apple", "banana", "cherry"];
			const result = removeLastTag(tags);
			expect(result).toEqual(["apple", "banana"]);
		});

		test("returns empty array for single tag", () => {
			const tags = ["apple"];
			const result = removeLastTag(tags);
			expect(result).toEqual([]);
		});

		test("returns empty array for empty input", () => {
			const result = removeLastTag([]);
			expect(result).toEqual([]);
		});
	});

	describe("addTag", () => {
		test("adds a new tag", () => {
			const tags = ["apple", "banana"];
			const result = addTag(tags, "cherry");
			expect(result).toEqual(["apple", "banana", "cherry"]);
		});

		test("does not add duplicate tags (case insensitive)", () => {
			const tags = ["apple", "banana"];
			const result = addTag(tags, "BANANA");
			expect(result).toEqual(["apple", "banana"]);
		});

		test("returns a new array", () => {
			const tags = ["apple"];
			const result = addTag(tags, "banana");
			expect(result).not.toBe(tags);
		});
	});
});
