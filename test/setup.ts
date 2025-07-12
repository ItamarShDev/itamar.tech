// Set up JSDOM environment for testing React components
import { cleanup } from '@testing-library/react';
import { JSDOM } from 'jsdom';

// Extend the NodeJS global type with the properties we're adding
declare global {
  namespace NodeJS {
    interface Global {
      window: Window & typeof globalThis;
      document: Document;
      navigator: Navigator;
    }
  }
}

// Create a basic DOM structure with minimal setup
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost:3000',
  // Disable certain features to avoid conflicts
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  // Add custom properties to prevent infinite recursion
  virtualConsole: new JSDOM().virtualConsole,
});

// Get the window and document objects
const { window } = dom;
const { document } = window;

// Set up global objects that would normally be available in a browser
global.window = window as unknown as Window & typeof globalThis;
global.document = document;

// Create a simplified navigator object to avoid infinite recursion
const mockNavigator = {
  userAgent: 'node.js',
  language: 'en-US',
  languages: ['en-US', 'en'],
  platform: 'node',
  maxTouchPoints: 0,
  hardwareConcurrency: 8, // Provide a default value to avoid recursion
  // Add other necessary navigator properties
  ...window.navigator,
};

global.navigator = mockNavigator as Navigator;

// Mock any problematic globals that might cause issues
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder as any;
}

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Add error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception in test:', error);
  process.exit(1);
});

// Add error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
