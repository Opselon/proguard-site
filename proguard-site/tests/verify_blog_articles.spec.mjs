// /app/proguard-site/tests/verify_blog_articles.spec.mjs

import { test, expect } from '@playwright/test';

test.describe('Blog Section', () => {
  test('should display blog articles and allow navigation to a single post', async ({ page }) => {
    // Navigate to the blog page in English
    await page.goto('http://localhost:8788/blog?lang=en');

    // Check that the main blog page title is visible
    await expect(page.locator('h1:has-text("ProGuard Blog")')).toBeVisible();

    // Find the link to the first blog post and click it
    const firstPostLink = page.locator('h2.blog-card__title a[href="/blog/post1?lang=en"]');
    await expect(firstPostLink).toBeVisible();
    await firstPostLink.click();

    // Wait for the navigation to complete and check the URL
    await page.waitForURL('**/blog/post1?lang=en');
    await expect(page).toHaveURL('http://localhost:8788/blog/post1?lang=en');

    // Check that the blog post title is visible on the post's page
    await expect(page.locator('h1.blog-post__title')).toHaveText('The Science Behind UltraGuard: A Deep Dive into Acrylic Waterproofing');

    // Check that the main image is visible and has the correct alt text
    const mainImage = page.locator('img');
    await expect(mainImage).toBeVisible();
    await expect(mainImage).toHaveAttribute('alt', 'The Science Behind UltraGuard: A Deep Dive into Acrylic Waterproofing');

    // Take a screenshot to verify the final state
    await page.screenshot({ path: '/home/jules/verification/verify_blog_articles.png' });
  });
});
