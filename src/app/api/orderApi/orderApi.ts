import { baseApi } from "../base-api";
import { PATH } from "./path";
import { activeOrder } from "./types";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveOrders: build.query<activeOrder[], void>({
      query: () => ({
        url: PATH.ACTIVE_ORDERS,
        method: "GET",
      }),
    })
  }),
})

export const { useGetActiveOrdersQuery } = orderApi