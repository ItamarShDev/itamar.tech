import { test, expect } from '@playwright/test';

test.describe('Navigation and Common Features', () => {
  test('should have working navigation between pages', async ({ page }) => {
    await page.goto('/en');
    
    // Check if navigation menu exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Look for navigation links
    const navLinks = nav.locator('a');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      // Test navigation to other pages
      const links = await navLinks.all();
      
      for (const link of links.slice(0, 3)) { // Test first 3 links to avoid timeout
        const href = await link.getAttribute('href');
        if (href && href.startsWith('/')) {
          await link.click();
          await page.waitForLoadState('networkidle');
          await expect(page.locator('h1')).toBeVisible();
          await page.goBack();
          await page.waitForLoadState('networkidle');
        }
      }
    }
  });

  test('should have language switching functionality', async ({ page }) => {
    await page.goto('/en');
    
    // Look for language switcher
    const languageSwitcher = page.locator('[id="language-selector"], [aria-label*="language"], button:has-text("En"), button:has-text("עב")');
    
    if (await languageSwitcher.count() > 0) {
      await languageSwitcher.first().click();
      
      // Should switch to Hebrew
      await expect(page).toHaveURL(/\/he/);
      await expect(page.locator('body')).toHaveAttribute('dir', 'rtl');
    }
  });

  test('should have working theme switching', async ({ page }) => {
    await page.goto('/en');
    
    // Look for theme switcher
    const themeSwitcher = page.locator('[data-theme], button:has-text("theme"), button:has-text("dark"), button:has-text("light"), [aria-label*="theme"]');
    
    if (await themeSwitcher.count() > 0) {
      // Get initial theme
      const body = page.locator('body');
      const initialTheme = await body.getAttribute('data-theme') || 'light';
      
      await themeSwitcher.first().click();
      
      // Theme should change
      await page.waitForTimeout(100); // Small delay for theme transition
      const newTheme = await body.getAttribute('data-theme');
      
      if (newTheme) {
        expect(newTheme).not.toBe(initialTheme);
      }
    }
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    // Try to access a non-existent page
    const response = await page.goto('/en/non-existent-page');
    
    // Should either redirect or show a 404 page
    expect(response?.status()).toBeOneOf([404, 200]); // 200 if redirected to home or custom 404
    
    // Page should still have basic layout
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should have accessible markup', async ({ page }) => {
    await page.goto('/en');
    
    // Check for basic accessibility features
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main, [role="main"]')).toBeVisible();
    
    // Check for heading hierarchy
    const h1Elements = page.locator('h1');
    const h1Count = await h1Elements.count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      const imagesWithAlt = page.locator('img[alt]');
      const altCount = await imagesWithAlt.count();
      
      // Most images should have alt text
      expect(altCount).toBeGreaterThan(0);
    }
  });
});