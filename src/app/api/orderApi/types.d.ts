export interface activeOrder {
  _id: string;
  client:
    | {
        _id: string;
        branch: string;
        phone: string;
        address: {
          lat: number;
          lng: number;
        };
        fullName: string;
      }
    | string;
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
  breadsInfo: {
    _id: string;
    title: string;
    amount: number;
    breadPrice: number;
    breadSoldPrice: number;
  }[];
  isClient: boolean;
  isChangePrice: boolean;
  type: string;
  fromStaff: string;
  paymentHistory: Payment[];
  createdAt: Date | string;
  updatedAt: Date | string;
  acceptedDriver?: {
    _id: string;
    fullName: string;
  };
  acceptedTimeDriver?: Date | string;
}

type Payment = {
  _id: string;
  amount: number;
  fromUser: FromUser | null;
  paymentDate: Date | string;
};

type FromUser = {
  _id: string;
  role: string;
  fullName: string;
};
