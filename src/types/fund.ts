export interface FundData {
  id: number;
  code: string;
  name: string;
  shortName: string;
  nav: number;
  lastYearNav?: number;
  owner?: {
    id: number;
    name: string;
    shortName: string;
  };
  fundType?: {
    id: number;
    name: string;
  };
  dataFundAssetType?: {
    id: number;
    name: string;
    code: 'BOND' | 'STOCK' | 'BALANCED' | 'OTHER';
  };
  productNavChange?: {
    navToPrevious?: number;
    navToLastYear?: number;
    navTo1Months?: number;
    navTo3Months?: number;
    navTo6Months?: number;
    navTo12Months?: number;
    navTo24Months?: number;
    navTo36Months?: number;
    navTo60Months?: number;
    annualizedReturn36Months?: number;
    updateAt?: number;
  };
}

export interface FundFilterParams {
  types?: ('NEW_FUND' | 'TRADING_FUND')[];
  sortOrder?: 'ASC' | 'DESC';
  sortField?: string;
  fundAssetTypes?: ('BOND' | 'STOCK' | 'BALANCED')[];
  page?: number;
  pageSize?: number;
}

export interface FundApiResponse {
  status: number;
  code: number;
  message: string;
  data: {
    page: number;
    pageSize: number;
    total: number;
    rows: FundData[];
  };
}

export type FundAssetFilter = 'ALL' | 'STOCK' | 'BOND';
