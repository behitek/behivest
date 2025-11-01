import { test, expect } from '@playwright/test';

test.describe('Performance Page', () => {
  test('should load performance page with correct title and heading', async ({
    page,
  }) => {
    await page.goto('/performance');

    // Check page title
    await expect(page).toHaveTitle(/Hiệu suất quỹ mở.*Behivest/);

    // Check heading
    await expect(
      page.getByRole('heading', { name: 'Hiệu suất quỹ mở' })
    ).toBeVisible();
  });

  test('should display filter buttons', async ({ page }) => {
    await page.goto('/performance');

    // Check that all filter buttons are present
    await expect(page.getByRole('button', { name: 'Tất cả' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Quỹ cổ phiếu' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Quỹ trái phiếu' })
    ).toBeVisible();
  });

  test('should show loading state initially', async ({ page }) => {
    await page.goto('/performance');

    // Check for loading indicator
    const loadingState = page.locator('.loading-state');
    await expect(loadingState).toBeVisible();
  });

  test('should load and display fund data', async ({ page }) => {
    await page.goto('/performance');

    // Wait for data to load (max 10 seconds)
    await page.waitForSelector('.funds-container:not(.hidden)', {
      timeout: 10000,
    });

    // Check that funds table is visible
    const fundsTable = page.locator('.funds-container table');
    await expect(fundsTable).toBeVisible();

    // Check table headers
    await expect(page.getByText('Quỹ')).toBeVisible();
    await expect(page.getByText('Loại quỹ')).toBeVisible();
    await expect(page.getByText('NAV')).toBeVisible();
    await expect(page.getByText('1 tháng')).toBeVisible();
    await expect(page.getByText('1 năm')).toBeVisible();
    await expect(page.getByText('3 năm')).toBeVisible();
  });

  test('should display fund count', async ({ page }) => {
    await page.goto('/performance');

    // Wait for funds to load
    await page.waitForSelector('.funds-container:not(.hidden)', {
      timeout: 10000,
    });

    // Check fund count is displayed and not zero
    const fundsCount = page.locator('.funds-count');
    const countText = await fundsCount.textContent();
    expect(countText).not.toBe('0');
  });

  test('should filter by stock funds', async ({ page }) => {
    await page.goto('/performance');

    // Wait for initial data load
    await page.waitForSelector('.funds-container:not(.hidden)', {
      timeout: 10000,
    });

    // Click stock funds filter
    const stockButton = page.getByRole('button', { name: 'Quỹ cổ phiếu' });
    await stockButton.click();

    // Check that button is active
    await expect(stockButton).toHaveClass(/active/);

    // Wait for loading and data refresh
    await page.waitForSelector('.loading-state:not(.hidden)');
    await page.waitForSelector('.funds-container:not(.hidden)', {
      timeout: 10000,
    });

    // Verify funds are loaded
    const fundsCount = page.locator('.funds-count');
    const countText = await fundsCount.textContent();
    expect(countText).not.toBe('0');
  });

  test('should filter by bond funds', async ({ page }) => {
    await page.goto('/performance');

    // Wait for initial data load
    await page.waitForSelector('.funds-container:not(.hidden)', {
      timeout: 10000,
    });

    // Click bond funds filter
    const bondButton = page.getByRole('button', { name: 'Quỹ trái phiếu' });
    await bondButton.click();

    // Check that button is active
    await expect(bondButton).toHaveClass(/active/);

    // Wait for loading and data refresh
    await page.waitForSelector('.loading-state:not(.hidden)');
    await page.waitForSelector('.funds-container:not(.hidden)', {
      timeout: 10000,
    });

    // Verify funds are loaded
    const fundsCount = page.locator('.funds-count');
    const countText = await fundsCount.textContent();
    expect(countText).not.toBe('0');
  });

  test('should display fund rows with correct structure', async ({ page }) => {
    await page.goto('/performance');

    // Wait for funds to load
    await page.waitForSelector('.funds-container:not(.hidden)', {
      timeout: 10000,
    });

    // Check that at least one fund row exists
    const fundRows = page.locator('.funds-tbody tr');
    await expect(fundRows.first()).toBeVisible();

    // Check that first row has all required columns
    const firstRow = fundRows.first();
    const cells = firstRow.locator('td');
    expect(await cells.count()).toBeGreaterThanOrEqual(6);
  });

  test('should have buy buttons with affiliate links', async ({ page }) => {
    await page.goto('/performance');

    // Wait for funds to load
    await page.waitForSelector('.funds-container:not(.hidden)', {
      timeout: 10000,
    });

    // Check that buy buttons exist
    const buyButtons = page.getByRole('link', { name: 'Mua' });
    await expect(buyButtons.first()).toBeVisible();

    // Check that buy button has correct attributes
    const firstBuyButton = buyButtons.first();
    await expect(firstBuyButton).toHaveAttribute('target', '_blank');
    await expect(firstBuyButton).toHaveAttribute('rel', 'noopener noreferrer');
    const href = await firstBuyButton.getAttribute('href');
    expect(href).toContain('fmarket.vn');
  });

  test('should display CTA section', async ({ page }) => {
    await page.goto('/performance');

    // Check CTA heading
    await expect(page.getByText('Sẵn sàng bắt đầu đầu tư?')).toBeVisible();

    // Check CTA button
    const ctaButton = page.getByRole('link', {
      name: /Mở tài khoản miễn phí/i,
    });
    await expect(ctaButton).toBeVisible();
  });

  test('should display info cards', async ({ page }) => {
    await page.goto('/performance');

    // Check info card headings
    await expect(page.getByText('Quỹ cổ phiếu')).toBeVisible();
    await expect(page.getByText('Quỹ trái phiếu')).toBeVisible();
    await expect(page.getByText('So sánh hiệu suất')).toBeVisible();
  });
});

test.describe('Performance Component in MDX', () => {
  test('should render FundPerformance component in blog post', async ({
    page,
  }) => {
    await page.goto('/blog/stock-fund-performance');

    // Wait for blog post to load
    await expect(
      page.getByRole('heading', {
        name: 'Top quỹ cổ phiếu có hiệu suất tốt nhất 2024',
      })
    ).toBeVisible();

    // Check that FundPerformance component is rendered
    const fundPerformanceContainer = page.locator(
      '.fund-performance-container'
    );
    await expect(fundPerformanceContainer).toBeVisible();

    // Wait for funds to load
    await page.waitForSelector('.funds-container:not(.hidden)', {
      timeout: 10000,
    });

    // Verify data is displayed
    const fundsTable = page.locator('.funds-container table');
    await expect(fundsTable).toBeVisible();
  });
});
