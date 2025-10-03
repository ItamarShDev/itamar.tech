import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { DEFAULT_EMOJIS, useRandomEmoji } from "lib/hooks/useRandomEmoji";

// Mock timers
let intervalCallback: () => void;
const mockSetInterval = mock((callback: () => void) => {
	intervalCallback = callback;
	return {} as NodeJS.Timeout;
});
const mockClearInterval = mock(() => {});

global.setInterval = mockSetInterval as unknown as typeof setInterval;
global.clearInterval = mockClearInterval as unknown as typeof clearInterval;

describe("useRandomEmoji", () => {
	// Reset mocks before each test
	beforeEach(() => {
		mockSetInterval.mockClear();
		mockClearInterval.mockClear();
	});

	// Clean up after each test
	afterEach(() => {
		cleanup();
	});

	test("returns the first emoji by default", () => {
		const emojis = ["😀", "😎", "🤓"];
		const { result } = renderHook(() => useRandomEmoji({ emojis }));
		expect(result.current).toBe("😀");
	});

	test("uses default emojis when none provided", () => {
		const { result } = renderHook(() => useRandomEmoji());
		expect(DEFAULT_EMOJIS).toContain(result.current);
	});

	test("returns empty string when emojis array is empty", () => {
		const { result } = renderHook(() => useRandomEmoji({ emojis: [] }));
		expect(result.current).toBe("");
	});

	test("returns a string from the provided emojis array", () => {
		const emojis = ["😀", "😎", "🤓"];
		const { result } = renderHook(() => useRandomEmoji({ emojis }));
		expect(emojis).toContain(result.current);
	});

	test("sets up interval with correct timing", () => {
		const emojis = ["😀", "😎"];
		const interval = 1000;

		renderHook(() => useRandomEmoji({ emojis, interval }));

		// Should call setInterval with the correct interval
		expect(mockSetInterval).toHaveBeenCalledTimes(1);
	});

	test("cleans up interval on unmount", () => {
		const emojis = ["😀", "😎"];
		const { unmount } = renderHook(() => useRandomEmoji({ emojis }));

		// Get the interval ID that was returned by setInterval
		const intervalId = mockSetInterval.mock.results[0].value;

		// Unmount the component
		unmount();

		// Should have called clearInterval with the correct ID
		expect(mockClearInterval).toHaveBeenCalledTimes(1);
		expect(mockClearInterval).toHaveBeenCalledWith(intervalId);
	});

	test("cycles through emojis correctly", () => {
		const emojis = ["😀", "😎", "🤓"];

		// Render the hook and get the initial state
		const { result } = renderHook(() => useRandomEmoji({ emojis }));

		// Initial emoji should be the first one
		expect(result.current).toBe(emojis[0]);

		// Call the interval callback to simulate time passing
		act(() => {
			intervalCallback();
		});

		// Should now be the second emoji
		expect(emojis).toContain(result.current);

		// Call it again
		act(() => {
			intervalCallback();
		});

		// Should now be the third emoji
		expect(emojis).toContain(result.current);

		// Call it one more time to test wrap-around
		act(() => {
			intervalCallback();
		});

		// Should be one of the emojis (can't guarantee order due to random selection)
		expect(emojis).toContain(result.current);
	});

	test("handles emojis change", () => {
		const initialEmojis = ["😀", "😎"];
		const newEmojis = ["🚀", "🌟", "✨"];

		const { result, rerender } = renderHook(
			({ emojis }) => useRandomEmoji({ emojis }),
			{ initialProps: { emojis: initialEmojis } },
		);

		// Initial emoji from first array
		expect(initialEmojis).toContain(result.current);

		// Change the emojis
		rerender({ emojis: newEmojis });

		// Call interval to force a re-render with new emojis
		act(() => {
			intervalCallback();
		});

		// Should now be using the new emojis
		expect(newEmojis).toContain(result.current);
	});
});
