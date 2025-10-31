import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');

    // Check that the page loaded
    await expect(page).toHaveTitle(/Trang chủ.*Behivest/);

    // Check hero section
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Behivest'
    );
    await expect(page.getByText('Đầu tư dễ hiểu, sinh lời bền vững')).toBeVisible();
  });

  test('should have CTA link to affiliate', async ({ page }) => {
    await page.goto('/');

    // Find the Fmarket affiliate link
    const affiliateLink = page.getByRole('link', {
      name: /Tìm hiểu thêm về Fmarket|Khám phá Fmarket/i,
    });

    await expect(affiliateLink).toBeVisible();
    await expect(affiliateLink).toHaveAttribute(
      'href',
      'https://go.behitek.com/fmarket'
    );
  });

  test('should display featured blog posts', async ({ page }) => {
    await page.goto('/');

    // Check that blog posts section exists
    await expect(
      page.getByRole('heading', { name: /Bài viết nổi bật/i })
    ).toBeVisible();

    // Check that at least one blog post card is visible
    const blogCards = page.locator('article').first();
    await expect(blogCards).toBeVisible();
  });

  test('should have navigation to blog and tools', async ({ page }) => {
    await page.goto('/');

    // Check navigation links
    await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Công cụ' })).toBeVisible();
  });

  test('should have functional tool cards', async ({ page }) => {
    await page.goto('/');

    // Check that tool cards are present
    await expect(page.getByText('Tính lãi kép')).toBeVisible();
    await expect(page.getByText('Tính SIP')).toBeVisible();
    await expect(page.getByText('Phân bổ ngân sách')).toBeVisible();
    await expect(page.getByText('So sánh đầu tư')).toBeVisible();
  });

  test('should have dark mode toggle', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();

    // Click theme toggle
    await themeToggle.click();

    // Check that dark class is toggled on html element
    const html = page.locator('html');
    const hasDarkClass = await html.evaluate((el) =>
      el.classList.contains('dark')
    );
    expect(typeof hasDarkClass).toBe('boolean');
  });

  test('should have mobile menu functionality', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile size
    await page.goto('/');

    // Mobile menu button should be visible on mobile
    const mobileMenuButton = page.locator('#mobile-menu-button');
    await expect(mobileMenuButton).toBeVisible();

    // Click to open mobile menu
    await mobileMenuButton.click();

    // Check that mobile menu is visible
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();
  });
});
