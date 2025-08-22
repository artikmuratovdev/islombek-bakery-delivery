export interface driverSavdoGetAllSavdoRequest {
  startDate: string;
  endDate: string;
}

interface breadsInfo {
  _id: string;
  title: string;
  amount: number;
  breadPrice: number;
  breadSoldPrice: number;
}

export interface driverSavdoGetAllSavdoResponse {
  _id: string;
  client: string;
  branch: string;
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
  breadsInfo: breadsInfo[];
  isClient: boolean;
  isChangePrice: boolean;
  type: string;
  fromStaff: string;
  paymentHistory: {
    _id: string;
    amount: number;
    totalAmount: number;
    fromUser: string;
    paymentDate: string;
  }[];
  createdAt: string;
  updatedAt: string;
  acceptedDriver: string;
  acceptedTimeDriver: string;
  deliveryTime: string;
}
