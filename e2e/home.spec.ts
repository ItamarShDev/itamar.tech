import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page in English', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Itamar Sharify/);
    
    // Check for main content elements
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should load home page in Hebrew', async ({ page }) => {
    await page.goto('/he');
    await expect(page).toHaveTitle(/Itamar Sharify/);
    
    // Check for main content elements
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // Check that Hebrew RTL direction is applied
    await expect(page.locator('body')).toHaveAttribute('dir', 'rtl');
  });

  test('should have responsive layout', async ({ page }) => {
    await page.goto('/en');
    
    // Test desktop layout
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page.locator('nav')).toBeVisible();
    
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('nav')).toBeVisible();
  });
});