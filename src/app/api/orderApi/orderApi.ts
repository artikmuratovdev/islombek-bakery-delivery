import { baseApi } from "../base-api";
import { PATH } from "./path";
import { activeOrder } from "./types";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveOrders: build.query<{orders:activeOrder[]}, void>({
      query: () => ({
        url: PATH.ACTIVE_ORDERS,
        method: "GET",
      }),
    }),
    acceptOrder: build.mutation<{message:string}, string>({
      query: (id) => ({
        url: PATH.ACCEPT_ORDER + id,
        method: "PATCH",
      }),
    }),
    getOneOrder: build.query<activeOrder, string>({
      query: (id) => ({
        url: PATH.GET_ONE_ORDER + id,
        method: "GET",
      }),
    }),
  }),
})

export const { useGetActiveOrdersQuery , useAcceptOrderMutation, useGetOneOrderQuery} = orderApi