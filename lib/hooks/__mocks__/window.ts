// This file provides mock implementations for browser globals

// Store original globals
const originalWindow = { ...window };
const originalLocation = { ...window.location };

// Mock window.location
export const mockLocation = {
  ...originalLocation,
  hash: '',
  href: 'http://test.com',
  assign: jest.fn(),
};

// Mock window
export const mockWindow = {
  ...originalWindow,
  location: mockLocation,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Reset mocks
export function resetMocks() {
  mockLocation.hash = '';
  mockLocation.href = 'http://test.com';
  mockLocation.assign.mockClear();
  mockWindow.addEventListener.mockClear();
  mockWindow.removeEventListener.mockClear();
}

// Apply mocks to global scope
export function applyMocks() {
  // @ts-ignore - Override for testing
  global.window = mockWindow;
  // @ts-ignore - Override for testing
  global.location = mockLocation;
}

// Restore original globals
export function restoreMocks() {
  // @ts-ignore - Restore original
  global.window = originalWindow;
  // @ts-ignore - Restore original
  global.location = originalLocation;
}
