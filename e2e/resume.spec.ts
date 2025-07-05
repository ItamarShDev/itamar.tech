import { test, expect } from '@playwright/test';

test.describe('Resume Page', () => {
  test('should load resume page in English', async ({ page }) => {
    await page.goto('/en/resume');
    await expect(page).toHaveTitle(/Resume - Itamar Sharify/);
    
    // Check for main content elements
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('should load resume page in Hebrew', async ({ page }) => {
    await page.goto('/he/resume');
    await expect(page).toHaveTitle(/Resume - Itamar Sharify/);
    
    // Check for main content elements
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    
    // Check that Hebrew RTL direction is applied
    await expect(page.locator('body')).toHaveAttribute('dir', 'rtl');
  });

  test('should have downloadable resume or contact information', async ({ page }) => {
    await page.goto('/en/resume');
    
    // Look for download links, contact information, or resume content
    const hasDownloadLink = await page.locator('a[href*=".pdf"], a[download]').count() > 0;
    const hasContactInfo = await page.locator('text=/email|contact|phone/i').count() > 0;
    const hasResumeContent = await page.locator('text=/experience|education|skills/i').count() > 0;
    
    // At least one of these should be present
    expect(hasDownloadLink || hasContactInfo || hasResumeContent).toBeTruthy();
  });
});