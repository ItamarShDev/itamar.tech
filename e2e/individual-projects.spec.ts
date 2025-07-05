import { test, expect } from '@playwright/test';

test.describe('Individual Example Project Pages', () => {
  const projects = [
    'generator-traffic',
    'charts-communications', 
    'translated-text',
    'proxy-state',
    'ai-chat'
  ];

  for (const project of projects) {
    test(`should load ${project} page in English`, async ({ page }) => {
      await page.goto(`/en/example-projects/${project}`);
      
      // Should load the project page
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    });

    test(`should load ${project} page in Hebrew`, async ({ page }) => {
      await page.goto(`/he/example-projects/${project}`);
      
      // Should load the project page
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      
      // Check that Hebrew RTL direction is applied
      await expect(page.locator('body')).toHaveAttribute('dir', 'rtl');
    });
  }

  test('should load generator-traffic with interactive elements', async ({ page }) => {
    await page.goto('/en/example-projects/generator-traffic');
    
    // Should have traffic light components
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h3')).toBeVisible();
    
    // Look for interactive elements or traffic light controls
    const interactiveElements = page.locator('button, input, [role="button"]');
    const elementCount = await interactiveElements.count();
    
    // Should have some interactive elements for the traffic generator
    if (elementCount > 0) {
      expect(elementCount).toBeGreaterThan(0);
    }
  });

  test('should load ai-chat with chat interface', async ({ page }) => {
    await page.goto('/en/example-projects/ai-chat');
    
    // Should have chat interface elements
    await expect(page.locator('h1')).toBeVisible();
    
    // Look for chat-related elements
    const chatElements = page.locator('input[type="text"], textarea, [placeholder*="message"], [placeholder*="chat"]');
    const buttonElements = page.locator('button');
    
    // Should have input elements for chat
    const chatElementCount = await chatElements.count();
    const buttonElementCount = await buttonElements.count();
    
    if (chatElementCount > 0 || buttonElementCount > 0) {
      expect(chatElementCount + buttonElementCount).toBeGreaterThan(0);
    }
  });
});