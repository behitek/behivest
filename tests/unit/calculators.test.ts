import { describe, it, expect } from 'vitest';
import {
  calculateCompoundInterest,
  calculateSIP,
  calculateBudgetAllocation,
  compareInvestmentVsSavings,
  formatCurrency,
  formatNumber,
} from '../../src/utils/calculators';

describe('calculateCompoundInterest', () => {
  it('should calculate compound interest without monthly contributions', () => {
    const result = calculateCompoundInterest(10000000, 10, 5, 0);

    expect(result.finalAmount).toBe(16105100);
    expect(result.totalContributions).toBe(10000000);
    expect(result.totalInterest).toBe(6105100);
    expect(result.yearlyBreakdown).toHaveLength(5);
  });

  it('should calculate compound interest with monthly contributions', () => {
    const result = calculateCompoundInterest(10000000, 10, 10, 1000000);

    expect(result.finalAmount).toBeGreaterThan(10000000);
    expect(result.totalContributions).toBeGreaterThan(10000000);
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.yearlyBreakdown).toHaveLength(10);
  });

  it('should handle zero interest rate', () => {
    const result = calculateCompoundInterest(10000000, 0, 5, 0);

    expect(result.finalAmount).toBe(10000000);
    expect(result.totalInterest).toBe(0);
  });

  it('should handle zero years', () => {
    const result = calculateCompoundInterest(10000000, 10, 0, 0);

    expect(result.finalAmount).toBe(10000000);
    expect(result.totalContributions).toBe(10000000);
    expect(result.yearlyBreakdown).toHaveLength(0);
  });

  it('should throw error for negative values', () => {
    expect(() => calculateCompoundInterest(-10000000, 10, 5, 0)).toThrow();
    expect(() => calculateCompoundInterest(10000000, -10, 5, 0)).toThrow();
    expect(() => calculateCompoundInterest(10000000, 10, -5, 0)).toThrow();
    expect(() => calculateCompoundInterest(10000000, 10, 5, -1000000)).toThrow();
  });

  it('should have correct yearly breakdown structure', () => {
    const result = calculateCompoundInterest(10000000, 10, 3, 500000);

    result.yearlyBreakdown.forEach((year, index) => {
      expect(year.year).toBe(index + 1);
      expect(year.balance).toBeGreaterThan(0);
      expect(year.contributions).toBeGreaterThan(0);
      expect(year.interest).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('calculateSIP', () => {
  it('should calculate SIP returns correctly', () => {
    const result = calculateSIP(1000000, 12, 10);

    expect(result.finalAmount).toBeGreaterThan(result.totalInvested);
    expect(result.totalInvested).toBe(1000000 * 12 * 10);
    expect(result.totalReturns).toBeGreaterThan(0);
    expect(result.monthlyBreakdown.length).toBeGreaterThan(0);
  });

  it('should handle zero return rate', () => {
    const result = calculateSIP(1000000, 0, 5);

    expect(result.finalAmount).toBe(result.totalInvested);
    expect(result.totalReturns).toBe(0);
  });

  it('should handle one year investment', () => {
    const result = calculateSIP(1000000, 12, 1);

    expect(result.totalInvested).toBe(12000000);
    expect(result.finalAmount).toBeGreaterThan(12000000);
  });

  it('should throw error for negative values', () => {
    expect(() => calculateSIP(-1000000, 12, 10)).toThrow();
    expect(() => calculateSIP(1000000, -12, 10)).toThrow();
    expect(() => calculateSIP(1000000, 12, -10)).toThrow();
  });

  it('should have correct breakdown structure', () => {
    const result = calculateSIP(1000000, 12, 2);

    result.monthlyBreakdown.forEach((month) => {
      expect(month.month).toBeGreaterThan(0);
      expect(month.balance).toBeGreaterThan(0);
      expect(month.invested).toBeGreaterThan(0);
      expect(month.returns).toBeGreaterThanOrEqual(0);
    });
  });

  it('should calculate realistic SIP example', () => {
    // Investing 1 million VND per month for 10 years at 12% annual return
    const result = calculateSIP(1000000, 12, 10);

    // Total invested should be 120 million
    expect(result.totalInvested).toBe(120000000);

    // Final amount should be significantly higher due to compound growth
    expect(result.finalAmount).toBeGreaterThan(200000000);
    expect(result.totalReturns).toBeGreaterThan(80000000);
  });
});

describe('calculateBudgetAllocation', () => {
  it('should allocate budget using 50/30/20 rule', () => {
    const result = calculateBudgetAllocation(20000000);

    expect(result.needs).toBe(10000000); // 50%
    expect(result.wants).toBe(6000000); // 30%
    expect(result.savings).toBe(4000000); // 20%
  });

  it('should handle zero income', () => {
    const result = calculateBudgetAllocation(0);

    expect(result.needs).toBe(0);
    expect(result.wants).toBe(0);
    expect(result.savings).toBe(0);
  });

  it('should round to nearest integer', () => {
    const result = calculateBudgetAllocation(10000001);

    expect(Number.isInteger(result.needs)).toBe(true);
    expect(Number.isInteger(result.wants)).toBe(true);
    expect(Number.isInteger(result.savings)).toBe(true);
  });

  it('should throw error for negative income', () => {
    expect(() => calculateBudgetAllocation(-20000000)).toThrow();
  });

  it('should handle realistic monthly salary', () => {
    const result = calculateBudgetAllocation(15000000);

    expect(result.needs).toBe(7500000);
    expect(result.wants).toBe(4500000);
    expect(result.savings).toBe(3000000);

    // Total should equal income
    expect(result.needs + result.wants + result.savings).toBeCloseTo(15000000, -3);
  });
});

describe('compareInvestmentVsSavings', () => {
  it('should compare investment and savings correctly', () => {
    const result = compareInvestmentVsSavings(50000000, 12, 5, 10);

    expect(result.investmentFinalAmount).toBeGreaterThan(result.savingsFinalAmount);
    expect(result.difference).toBeGreaterThan(0);
    expect(result.investmentReturns).toBeGreaterThan(result.savingsInterest);
  });

  it('should handle equal rates', () => {
    const result = compareInvestmentVsSavings(50000000, 8, 8, 10);

    expect(result.investmentFinalAmount).toBe(result.savingsFinalAmount);
    expect(result.difference).toBe(0);
    expect(result.investmentReturns).toBe(result.savingsInterest);
  });

  it('should handle zero years', () => {
    const result = compareInvestmentVsSavings(50000000, 12, 5, 0);

    expect(result.investmentFinalAmount).toBe(50000000);
    expect(result.savingsFinalAmount).toBe(50000000);
    expect(result.difference).toBe(0);
  });

  it('should throw error for negative values', () => {
    expect(() => compareInvestmentVsSavings(-50000000, 12, 5, 10)).toThrow();
    expect(() => compareInvestmentVsSavings(50000000, -12, 5, 10)).toThrow();
    expect(() => compareInvestmentVsSavings(50000000, 12, -5, 10)).toThrow();
    expect(() => compareInvestmentVsSavings(50000000, 12, 5, -10)).toThrow();
  });

  it('should calculate realistic example', () => {
    // 50 million invested at 12% vs 5% savings for 10 years
    const result = compareInvestmentVsSavings(50000000, 12, 5, 10);

    // Investment should grow to ~155 million
    expect(result.investmentFinalAmount).toBeGreaterThan(150000000);
    expect(result.investmentFinalAmount).toBeLessThan(160000000);

    // Savings should grow to ~81 million
    expect(result.savingsFinalAmount).toBeGreaterThan(80000000);
    expect(result.savingsFinalAmount).toBeLessThan(85000000);

    // Difference should be significant
    expect(result.difference).toBeGreaterThan(70000000);
  });
});

describe('formatCurrency', () => {
  it('should format currency in Vietnamese style', () => {
    const formatted = formatCurrency(10000000);

    expect(formatted).toContain('10.000.000');
    expect(formatted).toContain('₫');
  });

  it('should handle zero', () => {
    const formatted = formatCurrency(0);

    expect(formatted).toContain('0');
    expect(formatted).toContain('₫');
  });

  it('should handle large numbers', () => {
    const formatted = formatCurrency(1000000000);

    expect(formatted).toContain('1.000.000.000');
  });

  it('should handle negative numbers', () => {
    const formatted = formatCurrency(-5000000);

    expect(formatted).toContain('5.000.000');
  });
});

describe('formatNumber', () => {
  it('should format number with thousand separators', () => {
    const formatted = formatNumber(10000000);

    expect(formatted).toBe('10.000.000');
  });

  it('should handle zero', () => {
    const formatted = formatNumber(0);

    expect(formatted).toBe('0');
  });

  it('should handle small numbers', () => {
    const formatted = formatNumber(123);

    expect(formatted).toBe('123');
  });

  it('should handle large numbers', () => {
    const formatted = formatNumber(1234567890);

    expect(formatted).toBe('1.234.567.890');
  });
});

describe('Edge cases and integration', () => {
  it('should handle very large investment periods', () => {
    const result = calculateCompoundInterest(1000000, 10, 50, 0);

    expect(result.finalAmount).toBeGreaterThan(1000000);
    expect(result.yearlyBreakdown).toHaveLength(50);
  });

  it('should handle very high interest rates', () => {
    const result = calculateSIP(100000, 50, 5);

    expect(result.finalAmount).toBeGreaterThan(result.totalInvested);
  });

  it('should maintain precision in calculations', () => {
    const result = calculateCompoundInterest(10000000, 7.5, 5, 500000);

    // Check that values are reasonable and rounded
    expect(Number.isInteger(result.finalAmount)).toBe(true);
    expect(Number.isInteger(result.totalContributions)).toBe(true);
    expect(Number.isInteger(result.totalInterest)).toBe(true);
  });
});
