import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import useUrlHash from "lib/hooks/useUrlHash";

// Mock window and location objects
interface MockLocation extends Location {
	hash: string;
	href: string;
	assign: ReturnType<typeof mock>;
	onhashchange?: (event: HashChangeEvent) => void;
}

const mockLocation: MockLocation = {
	hash: "",
	href: "http://test.com",
	assign: mock(() => {}),
	onhashchange: undefined,
	// Add required Location properties with dummy values
	ancestorOrigins: [] as unknown as DOMStringList,
	host: "test.com",
	hostname: "test.com",
	origin: "http://test.com",
	pathname: "/",
	port: "",
	protocol: "http:",
	search: "",
	replace: mock(() => {}),
	reload: mock(() => {}),
	toString: () => "http://test.com",
};

// Track event listeners
const eventListeners: Record<string, EventListener> = {};

const mockAddEventListener = mock((event: string, callback: EventListener) => {
	eventListeners[event] = callback;
});

const mockRemoveEventListener = mock((event: string) => {
	delete eventListeners[event];
});

// Store original globals
const originalWindow = global.window;
const originalLocation = global.location;

// Helper to trigger hash change
function triggerHashChange(newHash: string, oldHash = "") {
	const oldURL = `http://test.com${oldHash ? `#${oldHash}` : ""}`;
	const newURL = `http://test.com${newHash ? `#${newHash}` : ""}`;

	mockLocation.hash = newHash ? `#${newHash}` : "";

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
		// Reset mocks and state
		mockLocation.hash = "";
		mockLocation.href = "http://test.com";
		mockLocation.assign.mockClear();
		mockAddEventListener.mockClear();
		mockRemoveEventListener.mockClear();

		// Apply mocks
		global.window = {
			...global.window,
			addEventListener: mockAddEventListener,
			removeEventListener: mockRemoveEventListener,
			location: mockLocation,
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as any;

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		global.location = mockLocation as any;
	});

	afterEach(() => {
		// Restore original globals
		global.window = originalWindow;
		global.location = originalLocation;
	});

	test("should return false when hash does not match", () => {
		mockLocation.hash = "#other-hash";
		const { result } = renderHook(() => useUrlHash("test-hash"));
		expect(result.current).toBe(false);
	});

	test("should return true when hash matches", () => {
		mockLocation.hash = "#test-hash";
		const { result } = renderHook(() => useUrlHash("test-hash"));
		expect(result.current).toBe(true);
	});

	test("should work with or without leading # in the hash", () => {
		mockLocation.hash = "#test-hash";

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
