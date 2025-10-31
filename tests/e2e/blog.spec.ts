import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('should load blog listing page', async ({ page }) => {
    await page.goto('/blog');

    // Check page title
    await expect(page).toHaveTitle(/Blog.*Behivest/);

    // Check heading
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();

    // Check that blog posts are displayed
    const articles = page.locator('article');
    await expect(articles).toHaveCount(2); // We have 2 sample posts
  });

  test('should display sample blog posts', async ({ page }) => {
    await page.goto('/blog');

    // Check that our sample posts are visible
    await expect(
      page.getByText(/Quỹ mở là gì\? Cách đầu tư cho người mới bắt đầu/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Fmarket.*Ứng dụng đầu tư quỹ mở/i)
    ).toBeVisible();
  });

  test('should navigate to single blog post', async ({ page }) => {
    await page.goto('/blog');

    // Click on the first blog post
    await page.getByRole('link', { name: /Đọc tiếp/i }).first().click();

    // Wait for navigation
    await page.waitForURL(/\/blog\/.+/);

    // Check that we're on a blog post page
    expect(page.url()).toContain('/blog/');

    // Check that post content is visible
    await expect(page.locator('article')).toBeVisible();
  });

  test('should display post metadata', async ({ page }) => {
    await page.goto('/blog/quy-mo-la-gi');

    // Check title
    await expect(
      page.getByRole('heading', {
        name: /Quỹ mở là gì\? Cách đầu tư cho người mới bắt đầu/i,
      })
    ).toBeVisible();

    // Check date
    await expect(page.locator('time')).toBeVisible();

    // Check tags
    await expect(page.getByText('đầu tư')).toBeVisible();
  });

  test('should have share buttons on blog post', async ({ page }) => {
    await page.goto('/blog/quy-mo-la-gi');

    // Check that share section exists
    await expect(page.getByText(/Chia sẻ:/i)).toBeVisible();

    // Check for social share buttons
    await expect(
      page.getByRole('link', { name: /Chia sẻ lên Facebook/i })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Chia sẻ lên Twitter/i })
    ).toBeVisible();
  });

  test('should have reading progress bar', async ({ page }) => {
    await page.goto('/blog/quy-mo-la-gi');

    // Check that progress bar exists
    const progressBar = page.locator('#reading-progress');
    await expect(progressBar).toBeVisible();

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));

    // Progress bar width should change (not be 0%)
    await page.waitForTimeout(200);
    const width = await progressBar.evaluate((el) => el.style.width);
    expect(width).not.toBe('0%');
  });

  test('should have CTA to Fmarket in blog post', async ({ page }) => {
    await page.goto('/blog/fmarket-app-dau-tu-quy-mo');

    // Check for affiliate links
    const affiliateLinks = page.getByRole('link', {
      name: /Fmarket|Tìm hiểu thêm|Tải Fmarket/i,
    });

    // Should have at least one affiliate link
    await expect(affiliateLinks.first()).toBeVisible();

    // Check that it points to the affiliate URL
    const href = await affiliateLinks.first().getAttribute('href');
    expect(href).toContain('fmarket.vn?ref=affiliate-demo');
  });

  test('should have comments section placeholder', async ({ page }) => {
    await page.goto('/blog/quy-mo-la-gi');

    // Scroll to bottom
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );

    // Check that comments heading exists
    await expect(
      page.getByRole('heading', { name: /Bình luận/i })
    ).toBeVisible();

    // Check that Giscus placeholder exists
    await expect(page.locator('.giscus')).toBeVisible();
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/blog/quy-mo-la-gi');

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // Check og:title
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+Quỹ mở.+/i);
  });
});
