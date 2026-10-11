import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "bun:test";
import { ChatProvider, useChatContext } from "context/ChatContext";

describe("chat loading lifecycle", () => {
	test("defers loading until first open and retains it after closing", () => {
		const { result } = renderHook(() => useChatContext(), {
			wrapper: ChatProvider,
		});
		expect(result.current.isChatOpen).toBe(false);
		expect(result.current.hasChatOpened).toBe(false);
		act(() => result.current.openChat());
		expect(result.current.isChatOpen).toBe(true);
		expect(result.current.hasChatOpened).toBe(true);
		act(() => result.current.closeChat());
		expect(result.current.isChatOpen).toBe(false);
		expect(result.current.hasChatOpened).toBe(true);
	});

	test("the toggle also loads chat and keeps it mounted when closed", () => {
		const { result } = renderHook(() => useChatContext(), {
			wrapper: ChatProvider,
		});
		act(() => result.current.toggleChat());
		expect(result.current.isChatOpen).toBe(true);
		expect(result.current.hasChatOpened).toBe(true);
		act(() => result.current.toggleChat());
		expect(result.current.isChatOpen).toBe(false);
		expect(result.current.hasChatOpened).toBe(true);
	});
});
