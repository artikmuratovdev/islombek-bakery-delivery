import { baseApi } from '../base-api';
import { PATH } from './path';
import { activeOrder, AddActiveOrderReq, breadInfo, client, Location, preOrder, preOrderPostReq, setupOrderReq, submitOrderReq } from './types';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveOrders: build.query<{ orders: activeOrder[] }, void>({
      query: () => ({
        url: PATH.ACTIVE_ORDERS,
        method: 'GET',
      }),
    }),
    acceptOrder: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: PATH.ACCEPT_ORDER + id,
        method: 'PATCH',
      }),
    }),
    getOneOrder: build.query<preOrder, string>({
      query: (id) => ({
        url: PATH.GET_ONE_ORDER + id,
        method: 'GET',
      }),
    }),
    getBreadPrices: build.query<breadInfo[], void>({
      query: () => ({
        url: PATH.GET_BREAD_PRICES,
        method: 'GET',
      }),
    }),
    submitAnOrder: build.mutation<{ message: string }, submitOrderReq>({
      query: ({ id, body }) => ({
        url: PATH.SUBMIT_AN_ORDER + id,
        method: 'PATCH',
        body,
      }),
    }),
    getPreOrder: build.query<preOrder[], void>({
      query: () => ({
        url: PATH.PRE_ORDER,
        method: 'GET',
      }),
    }),
    createPreOrder: build.mutation<{ message: string }, preOrderPostReq>({
      query: (body) => ({
        url: PATH.CREATE_PRE_ORDER,
        method: 'POST',
        body,
      }),
    }),
    submitPreOrder: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: PATH.SUBMIT_PRE_ORDER + id,
        method: 'POST',
      }),
    }),
    deleteOrder: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: PATH.DELETE_ORDER + id,
        method: 'DELETE',
      }),
    }),
    setupOrder: build.mutation<{ message: string }, setupOrderReq>({
      query: ({id,body}) => ({
        url: PATH.SETUP_ORDER + id,
        method: 'PATCH',
        body
      }),
    }),
    getClients: build.query<client[], void>({
      query: () => ({
        url: PATH.GET_CLIENTS + '?roles=CLIENT',
        method: 'GET',
      }),
    }),
    createActiveOrder: build.mutation<{ message: string , order:activeOrder}, AddActiveOrderReq>({
      query: (body) => ({
        url: PATH.CREATE_ACTIVE_ORDER,
        method: 'POST',
        body,
      }),
    }),
    sendLocation : build.mutation<{ message: string }, Location>({
      query: ({id,body}) => ({
        url: PATH.SEND_LOCATION + id,
        method: 'PATCH',
        body
      }),
    })
  }),
});

export const {
  useGetActiveOrdersQuery,
  useAcceptOrderMutation,
  useGetOneOrderQuery,
  useGetBreadPricesQuery,
  useSubmitAnOrderMutation,
  useGetPreOrderQuery,
  useCreatePreOrderMutation,
  useSubmitPreOrderMutation,
  useDeleteOrderMutation,
  useSetupOrderMutation,
  useGetClientsQuery,
  useCreateActiveOrderMutation,
  useSendLocationMutation
} = orderApi;
