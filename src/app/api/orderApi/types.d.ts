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
  location?: {
        lat: number,
        lng: number,
        _id: string
    }
}

export interface preOrder extends activeOrder {
  deliveryTime: Date;
}

export interface preOrderPostReq {
  client:string;
  paidAmount:number;
  breadsInfo: breadInfo[];
  commit:string;
  deliveryTime: string;
  address:string;
  phone:string;
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

export interface breadInfo {
  _id: string;
  title: string;
  amount: number;
  breadPrice: number;
  breadSoldPrice: number;
}

type submitOrder = {
  paidAmount: number;
  breadsInfo: breadInfo[];
};

export interface submitOrderReq {
  id: string;
  body: submitOrder;
}

export interface setupOrderReq {
  id: string;
  body: {
    paidAmount:number;
    breadsInfo: breadInfo[];
  };
}

export interface client {
  _id: string;
  fullName: string;
  hasOrder: boolean;
  phone?: string;
  address: string;
}
export interface AddActiveOrderReq {
  client: string;
  breadsInfo: breadInfo[];
  address: string;
  phone: string;
  commit?: string;
  paidAmount: number;
}

export interface Location {
  id:string;
  body : {
    location: {
    lat: number,
    lng: number
  }
  }
}