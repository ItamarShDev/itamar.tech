import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    exclude: ['**/node_modules/**', '**/e2e/**', '**/dist/**'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      'components': resolve(__dirname, './components'),
      'lib': resolve(__dirname, './lib'),
      'layouts': resolve(__dirname, './layouts'),
      'app': resolve(__dirname, './app'),
    },
  },
})