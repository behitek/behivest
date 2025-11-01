import type { FundFilterParams, FundApiResponse } from '../types/fund';

const API_BASE_URL = 'https://api.fmarket.vn/res/products/filter';

export async function fetchFunds(
  params: FundFilterParams = {}
): Promise<FundApiResponse> {
  const defaultParams: FundFilterParams = {
    types: ['NEW_FUND', 'TRADING_FUND'],
    sortOrder: 'DESC',
    sortField: 'navTo12Months',
    page: 1,
    pageSize: 20,
    ...params,
  };

  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'vi',
      'content-type': 'application/json',
      'f-language': 'vi',
    },
    body: JSON.stringify(defaultParams),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch funds: ${response.statusText}`);
  }

  return response.json();
}

export function formatPercentage(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return 'N/A';
  }
  const formatted = value.toFixed(2);
  return value > 0 ? `+${formatted}%` : `${formatted}%`;
}

export function formatCurrencyVND(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return 'N/A';
  }
  return new Intl.NumberFormat('vi-VN').format(value);
}

export function formatDate(dateValue: string | number | undefined): string {
  if (!dateValue) return 'N/A';
  try {
    const date =
      typeof dateValue === 'number' ? new Date(dateValue) : new Date(dateValue);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  } catch {
    return 'N/A';
  }
}
