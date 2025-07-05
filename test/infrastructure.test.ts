import { describe, it, expect } from 'vitest'

describe('Test Infrastructure', () => {
  it('should have vitest working correctly', () => {
    expect(1 + 1).toBe(2)
  })

  it('should validate environment setup', () => {
    expect(process.env.NODE_ENV).toBeDefined()
    // In jsdom environment, window is available
    expect(typeof window).toBe('object')
  })

  it('should test string operations', () => {
    const testString = 'Itamar Sharify'
    expect(testString).toContain('Itamar')
    expect(testString.length).toBeGreaterThan(0)
  })

  it('should test array operations', () => {
    const pages = ['home', 'blog', 'resume', 'example-projects']
    expect(pages).toHaveLength(4)
    expect(pages).toContain('blog')
    expect(pages).not.toContain('nonexistent')
  })
})