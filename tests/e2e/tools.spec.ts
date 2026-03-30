import { expect, test } from '@playwright/test';

test.describe('Tools Hub', () => {
  test('should load the beginner-first tools hub', async ({ page }) => {
    await page.goto('/tools');

    await expect(page).toHaveTitle(/Công cụ tài chính cho người mới bắt đầu/);
    await expect(
      page.getByRole('heading', {
        name: /Bắt đầu từ những con số thật của bạn/i,
      })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {
        name: /Chọn điểm bắt đầu theo đúng điều bạn đang băn khoăn/i,
      })
    ).toBeVisible();
    await expect(
      page.getByText('Tôi nên ưu tiên quỹ khẩn cấp, tiết kiệm hay đầu tư?')
    ).toBeVisible();
    await expect(
      page.getByText('Tôi có thể bắt đầu với bao nhiêu tiền mỗi tháng?')
    ).toBeVisible();
    await expect(
      page.getByText('Nếu đầu tư đều, sau vài năm có thể thành bao nhiêu?')
    ).toBeVisible();
  });

  test('should update the monthly starting preview', async ({ page }) => {
    await page.goto('/tools');

    const range = page.locator('#starter-range');
    await expect(range).toContainText('1.200.000');

    await page.locator('#starter-emergency-status').selectOption('none');

    await expect(page.locator('#starter-priority')).toContainText(
      'Ưu tiên quỹ khẩn cấp'
    );
    await expect(range).toContainText('600.000');
  });

  test('should update the SIP inline preview with presets', async ({
    page,
  }) => {
    await page.goto('/tools');

    const finalAmount = page.locator('#preview-final-amount');
    const initialText = (await finalAmount.textContent()) ?? '';

    await page.getByRole('button', { name: '2 triệu' }).click();
    await page.getByRole('button', { name: '10 năm' }).click();

    await expect(page.locator('#preview-total-invested')).toContainText(
      '240.000.000'
    );
    await expect(finalAmount).not.toHaveText(initialText);
    await expect(page.locator('#sip-preview-interpretation')).toContainText(
      'Diễn giải nhanh'
    );
  });

  test('should navigate from the hub to a new beginner tool', async ({
    page,
  }) => {
    await page.goto('/tools');

    await page
      .getByRole('link', { name: /Lập kế hoạch quỹ khẩn cấp/i })
      .click();

    await page.waitForURL('**/tools/emergency-fund-planner');
    await expect(
      page.getByRole('heading', {
        name: /Quỹ khẩn cấp của bạn đang ở đâu trên lộ trình an toàn/i,
      })
    ).toBeVisible();
  });
});

test.describe('Emergency Fund Planner', () => {
  test('should calculate emergency fund progress on load', async ({ page }) => {
    await page.goto('/tools/emergency-fund-planner');

    await expect(page.locator('#emergency-target-amount')).toContainText(
      '48.000.000'
    );
    await expect(page.locator('#emergency-progress-percent')).toContainText(
      '21%'
    );
    await expect(page.locator('#emergency-guidance')).toContainText(
      'Ưu tiên tiền mặt trước'
    );
  });
});

test.describe('Goal-Based Contribution Calculator', () => {
  test('should calculate monthly contribution from a target amount', async ({
    page,
  }) => {
    await page.goto('/tools/goal-based-contribution');

    await expect(page.locator('#goal-required-monthly')).not.toContainText(
      '0 ₫'
    );
    await expect(page.locator('#goal-interpretation')).toContainText(
      'Diễn giải nhanh'
    );

    await page.locator('#goal-target-amount').fill('120000000');
    await page.locator('#goal-return-rate').fill('0');
    await page.locator('#goal-years').fill('5');
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#goal-required-monthly')).toContainText(
      '2.000.000'
    );
  });
});

test.describe('Existing Tools', () => {
  test('should keep the SIP calculator presets and interpretation working', async ({
    page,
  }) => {
    await page.goto('/tools/sip-calculator');

    await page.getByRole('button', { name: '3 triệu' }).click();
    await page.getByRole('button', { name: '10 năm' }).click();

    await expect(page.locator('#sip-total-invested')).toContainText(
      '360.000.000'
    );
    await expect(page.locator('#sip-interpretation')).toContainText(
      'Diễn giải nhanh'
    );
  });

  test('should keep the budget allocator as a readiness tool', async ({
    page,
  }) => {
    await page.goto('/tools/budget-allocator');

    await page.locator('#monthly-income').fill('15000000');
    await page.locator('button[type="submit"]').click();

    await expect(page.locator('#savings-amount')).toContainText('3.000.000');
    await expect(page.locator('#budget-interpretation')).toContainText(
      'Diễn giải nhanh'
    );
  });

  test('should frame investment comparison as a role comparison', async ({
    page,
  }) => {
    await page.goto('/tools/investment-comparison');

    await expect(page.locator('#comparison-interpretation')).toContainText(
      'Diễn giải nhanh'
    );
    await expect(page.getByText('Tiết kiệm phù hợp hơn khi')).toBeVisible();
    await expect(page.getByText('Đầu tư phù hợp hơn khi')).toBeVisible();
  });
});

test.describe('Tools Navigation', () => {
  test('should keep back links to the tools hub on every tool page', async ({
    page,
  }) => {
    const tools = [
      '/tools/compound-interest',
      '/tools/sip-calculator',
      '/tools/budget-allocator',
      '/tools/investment-comparison',
      '/tools/emergency-fund-planner',
      '/tools/goal-based-contribution',
    ];

    for (const tool of tools) {
      await page.goto(tool);

      const backLink = page.getByRole('link', {
        name: /Quay lại (trung tâm )?công cụ/i,
      });
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveAttribute('href', '/tools');
    }
  });

  test('should remain usable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/tools');

    await expect(
      page.getByRole('link', { name: /Bắt đầu với công cụ nhanh/i })
    ).toBeVisible();
    await expect(page.locator('#starter-range')).toBeVisible();
    await expect(page.locator('#preview-final-amount')).toBeVisible();
  });
});
