import { test, expect } from '@playwright/test';

test.describe('Blog Pages', () => {
  test('should load blog listing page in English', async ({ page }) => {
    await page.goto('/en/blog');
    await expect(page).toHaveTitle(/Blog - Itamar Sharify/);
    
    // Check for blog posts or content
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should load blog listing page in Hebrew', async ({ page }) => {
    await page.goto('/he/blog');
    await expect(page).toHaveTitle(/Blog - Itamar Sharify/);
    
    // Check for blog posts or content
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    
    // Check that Hebrew RTL direction is applied
    await expect(page.locator('body')).toHaveAttribute('dir', 'rtl');
  });

  test('should load individual blog post', async ({ page }) => {
    // Test with a known blog post slug
    await page.goto('/en/blog/theme-management-with-nextjs-cookies');
    
    // Should load the blog post page
    await expect(page).toHaveTitle(/Theme Management/);
    
    // Check for blog post content
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('article, main')).toBeVisible();
  });

  test('should navigate from blog listing to individual post', async ({ page }) => {
    await page.goto('/en/blog');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Look for blog post links
    const blogLinks = page.locator('a[href*="/blog/"]');
    const linkCount = await blogLinks.count();
    
    if (linkCount > 0) {
      // Click on the first blog post link
      await blogLinks.first().click();
      
      // Should navigate to a blog post page
      await expect(page).toHaveURL(/\/blog\/[^\/]+$/);
      await expect(page.locator('h1')).toBeVisible();
    }
  });
});