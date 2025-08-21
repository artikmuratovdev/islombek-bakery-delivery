export interface DriverDebtClientsTotalDebtsRequest {
  search?: string;
}

export interface DriverDebtClientsTotalDebtsResponse {
  _id: string;
  balance: number;
  fullName: string;
}

export interface DriverDebtClientsTotalDebtRequest {
  clientId: string;
  startDate?: string;
  endDate?: string;
}

export interface DriverDebtClientsTodayDebtsRequest {
  search?: string;
}

export interface DriverDebtClientsTodayDebtsResponse {
  _id: string;
  date: string;
  driver: string;
  client: {
    _id: string;
    balance: number;
    fullName: string;
  };
  orders: string[];
  branch: string;
  status: number;
  paidAmount: number;
  totalAmount: number;
  debtAmount: number;
  createdAt: strin;
  updatedAt: strin;
}

export interface DriverDebtClientsTotalDebtResponse {
  _id: string;
  client: string;
  driver: string;
  date: string;
  branch: string;
  paidAmount: number;
  totalAmount: number;
  debtAmount: number;
  orders: string[];
  status: 1 | 0;
  createdAt?: string;
  updatedAt?: string;
}
