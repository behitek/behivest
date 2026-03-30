/**
 * Financial calculator utilities
 * All functions are pure and exported for unit testing
 */

export interface CompoundInterestResult {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: YearData[];
}

export interface YearData {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

export interface SIPResult {
  finalAmount: number;
  totalInvested: number;
  totalReturns: number;
  monthlyBreakdown: MonthData[];
}

export interface MonthData {
  month: number;
  balance: number;
  invested: number;
  returns: number;
}

export interface BudgetAllocation {
  needs: number;
  wants: number;
  savings: number;
}

export interface InvestmentComparison {
  investmentFinalAmount: number;
  savingsFinalAmount: number;
  difference: number;
  investmentReturns: number;
  savingsInterest: number;
}

export type BeginnerReadinessStage =
  | 'focus-emergency-fund'
  | 'split-between-cash-and-investing'
  | 'ready-to-invest';

export type EmergencyFundStatus = 'none' | 'building' | 'ready';

export interface EmergencyFundPlan {
  targetAmount: number;
  currentProgress: number;
  progressPercent: number;
  remainingAmount: number;
  readinessStage: BeginnerReadinessStage;
}

export interface GoalBasedContributionResult {
  requiredMonthlyContribution: number;
  totalContributed: number;
  estimatedGrowth: number;
}

export interface StarterInvestmentRange {
  suggestedMonthlyAmountMin: number;
  suggestedMonthlyAmountMax: number;
  readinessStage: BeginnerReadinessStage;
}

function roundToNearestStep(value: number, step: number = 50_000): number {
  return Math.max(0, Math.round(value / step) * step);
}

/**
 * Calculate compound interest with optional monthly contributions
 * @param principal - Initial investment amount
 * @param rate - Annual interest rate (as percentage, e.g., 10 for 10%)
 * @param years - Investment duration in years
 * @param monthlyContribution - Monthly contribution amount (default: 0)
 * @returns CompoundInterestResult
 */
export function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number,
  monthlyContribution: number = 0
): CompoundInterestResult {
  if (principal < 0 || rate < 0 || years < 0 || monthlyContribution < 0) {
    throw new Error('All values must be non-negative');
  }

  const yearlyBreakdown: YearData[] = [];
  let balance = principal;
  let totalContributions = principal;

  // Use annual compounding when no monthly contributions
  if (monthlyContribution === 0) {
    const annualRate = rate / 100;

    for (let year = 1; year <= years; year++) {
      balance = balance * (1 + annualRate);

      yearlyBreakdown.push({
        year,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        interest: Math.round(balance - totalContributions),
      });
    }
  } else {
    // Use monthly compounding when there are monthly contributions
    const monthlyRate = rate / 100 / 12;

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
        totalContributions += monthlyContribution;
      }

      yearlyBreakdown.push({
        year,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        interest: Math.round(balance - totalContributions),
      });
    }
  }

  const finalAmount = Math.round(balance);
  const totalInterest = Math.round(balance - totalContributions);

  return {
    finalAmount,
    totalContributions: Math.round(totalContributions),
    totalInterest,
    yearlyBreakdown,
  };
}

/**
 * Calculate Systematic Investment Plan (SIP) returns
 * @param monthlyInvestment - Monthly investment amount
 * @param returnRate - Expected annual return rate (as percentage)
 * @param years - Investment duration in years
 * @returns SIPResult
 */
export function calculateSIP(
  monthlyInvestment: number,
  returnRate: number,
  years: number
): SIPResult {
  if (monthlyInvestment < 0 || returnRate < 0 || years < 0) {
    throw new Error('All values must be non-negative');
  }

  const monthlyRate = returnRate / 100 / 12;
  const months = years * 12;
  const monthlyBreakdown: MonthData[] = [];

  let balance = 0;
  let totalInvested = 0;

  for (let month = 1; month <= months; month++) {
    balance = balance * (1 + monthlyRate) + monthlyInvestment;
    totalInvested += monthlyInvestment;

    if (month % 12 === 0 || month === months) {
      monthlyBreakdown.push({
        month,
        balance: Math.round(balance),
        invested: totalInvested,
        returns: Math.round(balance - totalInvested),
      });
    }
  }

  const finalAmount = Math.round(balance);
  const totalReturns = Math.round(balance - totalInvested);

  return {
    finalAmount,
    totalInvested,
    totalReturns,
    monthlyBreakdown,
  };
}

/**
 * Calculate 50/30/20 budget allocation
 * @param monthlyIncome - Monthly after-tax income
 * @returns BudgetAllocation
 */
export function calculateBudgetAllocation(
  monthlyIncome: number
): BudgetAllocation {
  if (monthlyIncome < 0) {
    throw new Error('Income must be non-negative');
  }

  return {
    needs: Math.round(monthlyIncome * 0.5),
    wants: Math.round(monthlyIncome * 0.3),
    savings: Math.round(monthlyIncome * 0.2),
  };
}

/**
 * Compare investment vs savings account
 * @param initialAmount - Initial amount to invest/save
 * @param investmentRate - Expected investment return rate (annual %)
 * @param savingsRate - Savings account interest rate (annual %)
 * @param years - Duration in years
 * @returns InvestmentComparison
 */
export function compareInvestmentVsSavings(
  initialAmount: number,
  investmentRate: number,
  savingsRate: number,
  years: number
): InvestmentComparison {
  if (initialAmount < 0 || investmentRate < 0 || savingsRate < 0 || years < 0) {
    throw new Error('All values must be non-negative');
  }

  // Investment calculation (compound annually)
  const investmentFinalAmount = Math.round(
    initialAmount * Math.pow(1 + investmentRate / 100, years)
  );
  const investmentReturns = investmentFinalAmount - initialAmount;

  // Savings calculation (compound annually)
  const savingsFinalAmount = Math.round(
    initialAmount * Math.pow(1 + savingsRate / 100, years)
  );
  const savingsInterest = savingsFinalAmount - initialAmount;

  return {
    investmentFinalAmount,
    savingsFinalAmount,
    difference: investmentFinalAmount - savingsFinalAmount,
    investmentReturns,
    savingsInterest,
  };
}

/**
 * Calculate a beginner emergency fund target and readiness stage
 * @param monthlyEssentialExpenses - Essential monthly expenses
 * @param currentSavings - Current emergency savings balance
 * @param targetMonths - Emergency fund target in months
 * @returns EmergencyFundPlan
 */
export function calculateEmergencyFundPlan(
  monthlyEssentialExpenses: number,
  currentSavings: number,
  targetMonths: number
): EmergencyFundPlan {
  if (monthlyEssentialExpenses < 0 || currentSavings < 0 || targetMonths < 0) {
    throw new Error('All values must be non-negative');
  }

  const targetAmount = Math.round(monthlyEssentialExpenses * targetMonths);
  const currentProgress = Math.min(Math.round(currentSavings), targetAmount);
  const remainingAmount = Math.max(
    targetAmount - Math.round(currentSavings),
    0
  );
  const progressPercent =
    targetAmount === 0
      ? 100
      : Math.min(
          100,
          Math.round((Math.round(currentSavings) / targetAmount) * 100)
        );

  let readinessStage: BeginnerReadinessStage = 'focus-emergency-fund';

  if (progressPercent >= 100) {
    readinessStage = 'ready-to-invest';
  } else if (progressPercent >= 50) {
    readinessStage = 'split-between-cash-and-investing';
  }

  return {
    targetAmount,
    currentProgress,
    progressPercent,
    remainingAmount,
    readinessStage,
  };
}

/**
 * Calculate the monthly contribution needed to reach a target amount
 * @param targetAmount - Target future value
 * @param annualReturnRate - Expected annual return rate (as percentage)
 * @param years - Saving or investing duration in years
 * @returns GoalBasedContributionResult
 */
export function calculateGoalBasedContribution(
  targetAmount: number,
  annualReturnRate: number,
  years: number
): GoalBasedContributionResult {
  if (targetAmount < 0 || annualReturnRate < 0) {
    throw new Error('All values must be non-negative');
  }

  if (years <= 0) {
    throw new Error('Years must be greater than zero');
  }

  if (targetAmount === 0) {
    return {
      requiredMonthlyContribution: 0,
      totalContributed: 0,
      estimatedGrowth: 0,
    };
  }

  const months = years * 12;
  const monthlyRate = annualReturnRate / 100 / 12;

  const requiredMonthlyContribution =
    monthlyRate === 0
      ? Math.round(targetAmount / months)
      : Math.round(
          (targetAmount * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
        );

  const totalContributed = requiredMonthlyContribution * months;

  return {
    requiredMonthlyContribution,
    totalContributed,
    estimatedGrowth: Math.max(targetAmount - totalContributed, 0),
  };
}

/**
 * Suggest a low-pressure beginner investment range based on monthly slack
 * @param monthlyAvailableAmount - Money available after essential expenses
 * @param emergencyFundStatus - Current emergency fund status
 * @returns StarterInvestmentRange
 */
export function calculateStarterInvestmentRange(
  monthlyAvailableAmount: number,
  emergencyFundStatus: EmergencyFundStatus
): StarterInvestmentRange {
  if (monthlyAvailableAmount < 0) {
    throw new Error('Monthly available amount must be non-negative');
  }

  if (!['none', 'building', 'ready'].includes(emergencyFundStatus)) {
    throw new Error('Emergency fund status is invalid');
  }

  if (monthlyAvailableAmount === 0) {
    return {
      suggestedMonthlyAmountMin: 0,
      suggestedMonthlyAmountMax: 0,
      readinessStage: 'focus-emergency-fund',
    };
  }

  const stageConfig = {
    none: {
      minRatio: 0,
      maxRatio: 0.15,
      readinessStage: 'focus-emergency-fund' as const,
    },
    building: {
      minRatio: 0.1,
      maxRatio: 0.3,
      readinessStage: 'split-between-cash-and-investing' as const,
    },
    ready: {
      minRatio: 0.2,
      maxRatio: 0.5,
      readinessStage: 'ready-to-invest' as const,
    },
  };

  const config = stageConfig[emergencyFundStatus];
  const suggestedMonthlyAmountMin = roundToNearestStep(
    monthlyAvailableAmount * config.minRatio
  );
  const suggestedMonthlyAmountMax = Math.min(
    roundToNearestStep(monthlyAvailableAmount * config.maxRatio),
    monthlyAvailableAmount
  );

  return {
    suggestedMonthlyAmountMin,
    suggestedMonthlyAmountMax: Math.max(
      suggestedMonthlyAmountMin,
      suggestedMonthlyAmountMax
    ),
    readinessStage: config.readinessStage,
  };
}

/**
 * Format number as Vietnamese currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num);
}
