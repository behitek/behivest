import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('should load contact page', async ({ page }) => {
    await page.goto('/contact');

    // Check page title
    await expect(page).toHaveTitle(/Liên hệ.*Behivest/);

    // Check heading
    await expect(page.getByRole('heading', { name: 'Liên hệ' })).toBeVisible();
  });

  test('should display contact form', async ({ page }) => {
    await page.goto('/contact');

    // Check that form exists
    const form = page.locator('#contact-form');
    await expect(form).toBeVisible();

    // Check form fields
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#subject')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();

    // Check submit button
    await expect(
      page.getByRole('button', { name: /Gửi tin nhắn/i })
    ).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    await page.goto('/contact');

    // Check for contact info section
    await expect(
      page.getByRole('heading', { name: /Thông tin liên hệ/i })
    ).toBeVisible();

    // Check for email
    await expect(page.getByText(/hello@behivest\.com/i)).toBeVisible();

    // Check for location
    await expect(page.getByText(/Thành phố Hồ Chí Minh/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /Gửi tin nhắn/i });
    await submitButton.click();

    // HTML5 validation should prevent submission
    // Check that we're still on the contact page (not submitted)
    expect(page.url()).toContain('/contact');
  });

  test('should fill and prepare form submission', async ({ page }) => {
    await page.goto('/contact');

    // Fill out form
    await page.locator('#name').fill('Nguyen Van A');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#subject').fill('Test Subject');
    await page.locator('#message').fill('This is a test message.');

    // Check that form is filled
    expect(await page.locator('#name').inputValue()).toBe('Nguyen Van A');
    expect(await page.locator('#email').inputValue()).toBe('test@example.com');
    expect(await page.locator('#subject').inputValue()).toBe('Test Subject');
    expect(await page.locator('#message').inputValue()).toBe(
      'This is a test message.'
    );

    // Note: We don't actually submit to avoid hitting Formspree in tests
    // In a real scenario, you'd mock the Formspree endpoint
  });

  test('should display help information', async ({ page }) => {
    await page.goto('/contact');

    // Check for help/FAQ section
    await expect(page.getByText(/Bạn cần hỗ trợ\?/i)).toBeVisible();

    // Check for links to blog and tools
    const blogLink = page
      .locator('text=/Bạn cần hỗ trợ\\?/i')
      .locator('..')
      .getByRole('link', { name: /Blog/i });
    await expect(blogLink).toBeVisible();
  });

  test('should have social media section', async ({ page }) => {
    await page.goto('/contact');

    // Check for social media heading
    await expect(page.getByText(/Theo dõi chúng tôi/i)).toBeVisible();
  });

  test('should have valid email link', async ({ page }) => {
    await page.goto('/contact');

    // Find email link
    const emailLink = page.getByRole('link', {
      name: /hello@behivest\.com/i,
    });
    await expect(emailLink).toHaveAttribute(
      'href',
      'mailto:hello@behivest.com'
    );
  });
});
