import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import useUrlHash from "lib/hooks/useUrlHash";

// Track event listeners
const eventListeners: Record<string, EventListener> = {};

// Store original globals
const originalWindow = global.window;
const originalAddEventListener = originalWindow.addEventListener;
const originalRemoveEventListener = originalWindow.removeEventListener;

const mockAddEventListener = mock((
	event: string,
	callback: EventListenerOrEventListenerObject,
	options?: boolean | AddEventListenerOptions,
) => {
	if (event === "hashchange") {
		eventListeners[event] = callback as EventListener;
	} else {
		originalAddEventListener.call(originalWindow, event, callback, options);
	}
});

const mockRemoveEventListener = mock((
	event: string,
	callback: EventListenerOrEventListenerObject,
	options?: boolean | EventListenerOptions,
) => {
	if (event === "hashchange") {
		delete eventListeners[event];
	} else {
		originalRemoveEventListener.call(originalWindow, event, callback, options);
	}
});

// Helper to trigger hash change
function triggerHashChange(newHash: string, oldHash = "") {
	const oldURL = `http://test.com${oldHash ? `#${oldHash}` : ""}`;
	const newURL = `http://test.com${newHash ? `#${newHash}` : ""}`;

	global.window.history.replaceState(null, "", newHash ? `#${newHash}` : "/");

	const hashChangeCallback = eventListeners.hashchange;
	if (hashChangeCallback) {
		const event = new Event("hashchange") as HashChangeEvent;
		Object.defineProperty(event, "oldURL", { value: oldURL });
		Object.defineProperty(event, "newURL", { value: newURL });

		hashChangeCallback(event);
	}
}

describe("useUrlHash", () => {
	beforeEach(() => {
		delete eventListeners.hashchange;
		mockAddEventListener.mockClear();
		mockRemoveEventListener.mockClear();

		global.window.history.replaceState(null, "", "/");
		global.window.addEventListener = mockAddEventListener as typeof global.window.addEventListener;
		global.window.removeEventListener = mockRemoveEventListener as typeof global.window.removeEventListener;
	});

	afterEach(() => {
		cleanup();
		global.window.addEventListener = originalAddEventListener;
		global.window.removeEventListener = originalRemoveEventListener;
		global.window.history.replaceState(null, "", "/");
	});

	test("should return false when hash does not match", () => {
		global.window.history.replaceState(null, "", "#other-hash");
		const { result } = renderHook(() => useUrlHash("test-hash"));
		expect(result.current).toBe(false);
	});

	test("should return true when hash matches", () => {
		global.window.history.replaceState(null, "", "#test-hash");
		const { result } = renderHook(() => useUrlHash("test-hash"));
		expect(result.current).toBe(true);
	});

	test("should work with or without leading # in the hash", () => {
		global.window.history.replaceState(null, "", "#test-hash");

		// Test with hash that includes #
		const { result: result1 } = renderHook(() => useUrlHash("#test-hash"));
		expect(result1.current).toBe(true);

		// Test with hash that doesn't include #
		const { result: result2 } = renderHook(() => useUrlHash("test-hash"));
		expect(result2.current).toBe(true);
	});

	test("should update when hash changes", () => {
		// Initial render with no hash
		const { result } = renderHook(() => useUrlHash("test-hash"));
		expect(result.current).toBe(false);

		// Simulate hash change
		act(() => {
			triggerHashChange("test-hash");
		});

		expect(result.current).toBe(true);

		// Simulate hash change to something else
		act(() => {
			triggerHashChange("other-hash", "test-hash");
		});

		expect(result.current).toBe(false);
	});

	test("should add hashchange event listener on mount", () => {
		renderHook(() => useUrlHash("test-hash"));
		expect(mockAddEventListener).toHaveBeenCalledWith(
			"hashchange",
			expect.any(Function),
		);
	});

	test("should remove hashchange event listener on unmount", () => {
		const { unmount } = renderHook(() => useUrlHash("test-hash"));

		// Get the event handler that was added
		const [eventName, eventHandler] = mockAddEventListener.mock.calls[0];

		unmount();

		expect(mockRemoveEventListener).toHaveBeenCalledWith(
			eventName,
			eventHandler,
		);
	});
});
