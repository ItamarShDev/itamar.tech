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

// Create a basic DOM structure
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost:3000',
});

// Set up global objects that would normally be available in a browser
const { window } = dom;
const { document } = window;

global.window = window as unknown as Window & typeof globalThis;
global.document = document;
global.navigator = window.navigator;

// Clean up after each test
afterEach(() => {
  cleanup();
});
