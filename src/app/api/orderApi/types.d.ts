export interface activeOrder {
  _id: string;
  client:
    | {
        _id: string;
        fullName: string;
        branch:string;
        phone:string;
        address: string | {lat:number,lng:number};
        fullName: string;
      }
    | string;
  branch: string;
  status: number;
  address: string | {lat:number,lng:number};
  paidAmount: number;
  totalAmount: number;
  debtAmount: number;
  deliveryTime?: string;
  acceptedDriver: {
    _id: string;
    fullName: string;
  } | string;
  acceptedTimeDriver?: string;
  commit: string;
  phone: string;
  approval: string;
  deliveryStatus: string;
  breadsInfo: breadInfo[];
  isClient: boolean;
  isChangePrice: boolean;
  type: string;
  fromStaff: string;
  paymentHistory: Payment[] | [];
  createdAt: Date | string;
  updatedAt: Date | string;
}