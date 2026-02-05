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
  realDebtAmount: number;
  createdAt: strin;
  updatedAt: strin;
}

export interface DriverDebtClientsTotalDebtResponse {
  _id: strin;
  date: string;
  driver: strin;
  client: string;
  orders: [
    {
      _id: string;
      client: string;
      branch: strin;
      status: number;
      commit: string;
      address: string;
      paidAmount: number;
      totalAmount: number;
      debtAmount: number;
      phone: string;
      breadCount: number;
      approval: string;
      deliveryStatus: string;
      breadsInfo: [
        {
          _id: string;
          title: string;
          amount: number;
          breadPrice: number;
          breadSoldPrice: number;
        },
      ];
      isClient: boolean;
      isChangePrice: boolean;
      type: string;
      fromStaff: string;
      paymentHistory: [];
      createdAt: string;
      updatedAt: string;
      acceptedDriver: {
        _id: string;
        fullName: string;
      };
      acceptedTimeDriver: string;
      deliveryTime: string;
    },
  ];
  branch: string;
  status: number;
  paidAmount: number;
  totalAmount: number;
  debtAmount: number;
  realDebtAmount: number;
  createdAt: string;
  updatedAt: string;
}
