import { test, expect } from '@playwright/test';

test.describe('Example Projects Pages', () => {
  test('should load example projects listing page in English', async ({ page }) => {
    await page.goto('/en/example-projects');
    await expect(page).toHaveTitle(/Example Projects - Itamar Sharify/);
    
    // Check for main content elements
    await expect(page.locator('h1, h4')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should load example projects listing page in Hebrew', async ({ page }) => {
    await page.goto('/he/example-projects');
    await expect(page).toHaveTitle(/Example Projects - Itamar Sharify/);
    
    // Check for main content elements
    await expect(page.locator('h1, h4')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    
    // Check that Hebrew RTL direction is applied
    await expect(page.locator('body')).toHaveAttribute('dir', 'rtl');
  });

  test('should display project links', async ({ page }) => {
    await page.goto('/en/example-projects');
    
    // Look for project links
    const projectLinks = page.locator('a[href*="/example-projects/"]');
    const linkCount = await projectLinks.count();
    
    // Should have at least one project link
    expect(linkCount).toBeGreaterThan(0);
  });

  test('should navigate to individual project pages', async ({ page }) => {
    await page.goto('/en/example-projects');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Look for project links
    const projectLinks = page.locator('a[href*="/example-projects/"]');
    const linkCount = await projectLinks.count();
    
    if (linkCount > 0) {
      // Click on the first project link
      await projectLinks.first().click();
      
      // Should navigate to a project page
      await expect(page).toHaveURL(/\/example-projects\/[^\/]+$/);
      await expect(page.locator('h1')).toBeVisible();
    }
  });
});