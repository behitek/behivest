import { test, expect } from '@playwright/test';

test.describe('Tools Page', () => {
  test('should load tools listing page', async ({ page }) => {
    await page.goto('/tools');

    // Check page title
    await expect(page).toHaveTitle(/Công cụ tài chính.*Behivest/);

    // Check heading
    await expect(
      page.getByRole('heading', { name: 'Công cụ tài chính' })
    ).toBeVisible();

    // Check that all 4 tools are listed
    await expect(page.getByText('Tính lãi kép')).toBeVisible();
    await expect(page.getByText('Tính SIP')).toBeVisible();
    await expect(page.getByText('Phân bổ ngân sách')).toBeVisible();
    await expect(page.getByText('So sánh đầu tư')).toBeVisible();
  });

  test('should navigate to individual tools', async ({ page }) => {
    await page.goto('/tools');

    // Click on compound interest tool
    await page.getByRole('link', { name: /Tính lãi kép/i }).click();

    // Wait for navigation
    await page.waitForURL('/tools/compound-interest');

    // Check that we're on the compound interest page
    await expect(
      page.getByRole('heading', { name: /Tính lãi kép/i })
    ).toBeVisible();
  });
});

test.describe('Compound Interest Calculator', () => {
  test('should perform calculation with default values', async ({ page }) => {
    await page.goto('/tools/compound-interest');

    // Check that form exists
    const form = page.locator('#compound-form');
    await expect(form).toBeVisible();

    // Submit form (should auto-calculate on load)
    await page.waitForTimeout(500);

    // Check that results are displayed and not zero
    const finalAmount = page.locator('#final-amount');
    const text = await finalAmount.textContent();
    expect(text).not.toBe('0 ₫');
    expect(text).toContain('₫');
  });

  test('should update results when inputs change', async ({ page }) => {
    await page.goto('/tools/compound-interest');

    // Get initial result
    await page.waitForTimeout(300);
    const initialResult = await page.locator('#final-amount').textContent();

    // Change principal amount
    await page.locator('#principal').fill('20000000');

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Wait for calculation
    await page.waitForTimeout(300);

    // Check that result changed
    const newResult = await page.locator('#final-amount').textContent();
    expect(newResult).not.toBe(initialResult);
  });

  test('should display yearly breakdown', async ({ page }) => {
    await page.goto('/tools/compound-interest');

    await page.waitForTimeout(500);

    // Check that breakdown section exists
    await expect(page.getByText(/Chi tiết theo năm/i)).toBeVisible();

    // Check that breakdown items are displayed
    const breakdownItems = page.locator('#breakdown-list > div');
    await expect(breakdownItems.first()).toBeVisible();
  });
});

test.describe('SIP Calculator', () => {
  test('should perform SIP calculation', async ({ page }) => {
    await page.goto('/tools/sip-calculator');

    // Wait for auto-calculation
    await page.waitForTimeout(500);

    // Check results are displayed
    const finalAmount = page.locator('#sip-final-amount');
    const text = await finalAmount.textContent();
    expect(text).not.toBe('0 ₫');

    // Check that total invested is shown
    const totalInvested = page.locator('#sip-total-invested');
    const investedText = await totalInvested.textContent();
    expect(investedText).not.toBe('0 ₫');
  });

  test('should show ratio bar', async ({ page }) => {
    await page.goto('/tools/sip-calculator');

    await page.waitForTimeout(500);

    // Check that ratio bar exists and has width
    const ratioBar = page.locator('#sip-ratio-bar');
    const width = await ratioBar.evaluate((el) => el.style.width);
    expect(width).not.toBe('0%');
  });
});

test.describe('Budget Allocator', () => {
  test('should allocate budget using 50/30/20 rule', async ({ page }) => {
    await page.goto('/tools/budget-allocator');

    // Input monthly income
    await page.locator('#monthly-income').fill('20000000');

    // Submit
    await page.locator('button[type="submit"]').click();

    await page.waitForTimeout(300);

    // Check results
    const needs = await page.locator('#needs-amount').textContent();
    const wants = await page.locator('#wants-amount').textContent();
    const savings = await page.locator('#savings-amount').textContent();

    // Should show 50%, 30%, 20% of 20M = 10M, 6M, 4M
    expect(needs).toContain('10.000.000');
    expect(wants).toContain('6.000.000');
    expect(savings).toContain('4.000.000');
  });

  test('should display visual allocation chart', async ({ page }) => {
    await page.goto('/tools/budget-allocator');

    // Check that visual chart exists
    await expect(page.getByText(/Biểu đồ phân bổ/i)).toBeVisible();
  });
});

test.describe('Investment Comparison', () => {
  test('should compare investment vs savings', async ({ page }) => {
    await page.goto('/tools/investment-comparison');

    // Wait for auto-calculation
    await page.waitForTimeout(500);

    // Check that results are displayed
    const investmentFinal = await page
      .locator('#investment-final')
      .textContent();
    const savingsFinal = await page.locator('#savings-final').textContent();
    const difference = await page.locator('#difference-amount').textContent();

    expect(investmentFinal).not.toBe('0 ₫');
    expect(savingsFinal).not.toBe('0 ₫');
    expect(difference).not.toBe('0 ₫');
  });

  test('should show investment outperforms savings', async ({ page }) => {
    await page.goto('/tools/investment-comparison');

    // Input values where investment clearly wins
    await page.locator('#initial-amount').fill('50000000');
    await page.locator('#investment-rate').fill('12');
    await page.locator('#savings-rate').fill('5');
    await page.locator('#comparison-years').fill('10');

    // Submit
    await page.locator('button[type="submit"]').click();

    await page.waitForTimeout(300);

    // Get difference percentage
    const diffPercent = await page
      .locator('#difference-percent')
      .textContent();

    // Difference should be positive
    expect(diffPercent).toContain('%');
    const percentValue = parseFloat(diffPercent?.replace('%', '') || '0');
    expect(percentValue).toBeGreaterThan(0);
  });
});

test.describe('Tools Navigation', () => {
  test('should have back to tools link on each tool page', async ({
    page,
  }) => {
    const tools = [
      '/tools/compound-interest',
      '/tools/sip-calculator',
      '/tools/budget-allocator',
      '/tools/investment-comparison',
    ];

    for (const tool of tools) {
      await page.goto(tool);

      // Check for back link
      const backLink = page.getByRole('link', { name: /Quay lại công cụ/i });
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveAttribute('href', '/tools');
    }
  });

  test('should have informational content on each tool', async ({ page }) => {
    await page.goto('/tools/compound-interest');

    // Check for explanation section
    await expect(page.getByText(/Lãi kép là gì\?/i)).toBeVisible();
  });
});
