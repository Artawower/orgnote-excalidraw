import "vitest-canvas-mock";
import { afterEach, vi } from "vitest";

Object.defineProperty(globalThis, "ResizeObserver", {
	configurable: true,
	value: vi.fn(() => ({
		disconnect: vi.fn(),
		observe: vi.fn(),
		unobserve: vi.fn(),
	})),
});

afterEach(() => {
	vi.useRealTimers();
});
