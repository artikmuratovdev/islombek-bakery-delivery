export interface BakerRoom {
  _id: string;
  title: string;
  images: string;
  branch: string;
  status: number;
  balance: number;
  doughsCount: number;
  roundsCount: number;
  inOvenCount: number;
  breadsCount: number;
  deliveredCount: number;
  soldCount: number;
  baker: string;
  divider: string;
  createdAt: string;
  updatedAt: string;
  breadsWithType: Record<string, number>;
  breadsToday: Record<string, number>;
  breadsYesterday: Record<string, number>;
  soldBreadMoney: number;
}

export interface GetAllBakery {
  _id: string;
  title: string;
  breadsCount: number;
}

export interface GetBakeryRequest {
  id: string;
}

export interface GetBakeryResponse {
  bakerRoom: BakerRoom;
}

export interface GetBakeryDoughRequest {
  id: string;
}

export interface GetBakeryDoughResponse {
  amount: number;
  doughType: string;
  limitDoughCount: number;
  doughTitle: string;
  doughIds: string[];
}

interface Breads {
  count: number;
  date: string;
}

export interface GetBakeryDeliveryResponse {
  driverFullName: string;
  _id: string;
  breads: Breads[];
}

export type BreadActionType = "OLISH" | "BERISH";

export interface GetBakeryBreadRequest {
  id: string;
  action: BreadActionType;
}

export interface GetBakeryBreadResponse {
  doughType: string;
  breadTitle: string;
  limitBreadCount: number;
  amount: number;
}

export interface UpdateBakeryDoughRequest {
  id: string;
  doughs: GetBakeryDoughResponse[];
}

export interface UpdateBakeryDoughResponse {
  data: {
    message: string;
  };
}

export interface UpdateBakeryBreadRequest {
  id: string;
  breads: GetBakeryBreadResponse[];
  action: BreadActionType;
}

export interface UpdateBakeryBreadResponse {
  data: {
    message: string;
  };
}
