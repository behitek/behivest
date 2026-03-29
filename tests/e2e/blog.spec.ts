import { expect, test } from '@playwright/test';

test.describe('Blog', () => {
  test('should load blog listing page', async ({ page }) => {
    await page.goto('/blog');

    // Check page title
    await expect(page).toHaveTitle(/Blog.*Behivest/);

    // Check heading
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();

    // Check that blog posts are displayed
    const articles = page.locator('article');
    await expect(articles).toHaveCount(3);
  });

  test('should display sample blog posts', async ({ page }) => {
    await page.goto('/blog');

    // Check that our current blog posts are visible
    await expect(
      page.getByText(/Quỹ mở là gì\? Cách đầu tư cho người mới bắt đầu/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Lương 10 triệu thì bắt đầu đầu tư như thế nào/i)
    ).toBeVisible();
  });

  test('should navigate to single blog post', async ({ page }) => {
    await page.goto('/blog');

    // Click on the first blog post
    await page
      .getByRole('link', { name: /Đọc tiếp/i })
      .first()
      .click();

    // Wait for navigation
    await page.waitForURL(/\/blog\/.+/);

    // Check that we're on a blog post page
    expect(page.url()).toContain('/blog/');

    // Check that post content is visible
    await expect(page.locator('article')).toBeVisible();
  });

  test('should display post metadata', async ({ page }) => {
    await page.goto('/blog/mutual-funds');

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
    await page.goto('/blog/mutual-funds');

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
    await page.goto('/blog/mutual-funds');

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

  test('should have CTA to Fmarket landing page in blog post', async ({
    page,
  }) => {
    await page.goto('/blog/investing-on-10-million-salary');

    const landingLink = page.getByRole('link', {
      name: /Xem trang Fmarket cho người mới bắt đầu/i,
    });

    await expect(landingLink).toBeVisible();
    await expect(landingLink).toHaveAttribute('href', '/behivest/fmarket');
  });

  test('should have comments section placeholder', async ({ page }) => {
    await page.goto('/blog/mutual-funds');

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check that comments heading exists
    await expect(
      page.getByRole('heading', { name: /Bình luận/i })
    ).toBeVisible();

    // Check that Giscus placeholder exists
    await expect(page.locator('.giscus')).toBeVisible();
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/blog/mutual-funds');

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // Check og:title
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+Quỹ mở.+/i);
  });
});
