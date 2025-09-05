import { API_TAGS } from '@/constants';
import { baseApi } from '../base-api';
import { PATH } from './path';
import {
  activeOrder,
  AddActiveOrderReq,
  breadInfo,
  client,
  ClientQuery,
  Clients,
  Location,
  preOrder,
  preOrderPostReq,
  setupOrderReq,
  submitOrderReq,
} from './types';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveOrders: build.query<{ orders: activeOrder[] }, void>({
      query: () => ({
        url: PATH.ACTIVE_ORDERS,
        method: 'GET',
      }),
      providesTags: [API_TAGS.ORDER],
    }),
    acceptOrder: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: PATH.ACCEPT_ORDER + id,
        method: 'PATCH',
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
    getOneOrder: build.query<preOrder, string>({
      query: (id) => ({
        url: PATH.GET_ONE_ORDER + id,
        method: 'GET',
      }),
      providesTags: [API_TAGS.ORDER],
    }),
    getBreadPrices: build.query<breadInfo[], void>({
      query: () => ({
        url: PATH.GET_BREAD_PRICES,
        method: 'GET',
      }),
      providesTags: [API_TAGS.ORDER],
    }),
    submitAnOrder: build.mutation<{ message: string }, submitOrderReq>({
      query: ({ id, body }) => ({
        url: PATH.SUBMIT_AN_ORDER + id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
    getPreOrder: build.query<preOrder[], void>({
      query: () => ({
        url: PATH.PRE_ORDER,
        method: 'GET',
      }),
      providesTags: [API_TAGS.ORDER],
    }),
    createPreOrder: build.mutation<{ message: string }, preOrderPostReq>({
      query: (body) => ({
        url: PATH.CREATE_PRE_ORDER,
        method: 'POST',
        body,
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
    submitPreOrder: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: PATH.SUBMIT_PRE_ORDER + id,
        method: 'POST',
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
    deleteOrder: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: PATH.DELETE_ORDER + id,
        method: 'DELETE',
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
    setupOrder: build.mutation<{ message: string }, setupOrderReq>({
      query: ({ id, body }) => ({
        url: PATH.SETUP_ORDER + id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
    getClients: build.query<client[], void>({
      query: () => ({
        url: PATH.GET_CLIENTS + '?roles=CLIENT',
        method: 'GET',
      }),
      providesTags: [API_TAGS.CLIENTS],
    }),
    getClientById: build.query<
      {
        orders: activeOrder[];
      },
      { id?: string }
    >({
      query: ({ id }) => PATH.CUSTOMER_QUERY + '/' + id + '/orders',
      providesTags: [API_TAGS.ORDER],
    }),
    getCustomers: build.query<Clients, ClientQuery>({
      query: ({ client }) => ({
        url: PATH.CUSTOMER_QUERY + (client ? `?search=${client}` : ''),
        method: 'GET',
      }),
      providesTags: [API_TAGS.CLIENTS],
    }),
    createActiveOrder: build.mutation<
      { message: string; order: activeOrder },
      AddActiveOrderReq
    >({
      query: (body) => ({
        url: PATH.CREATE_ACTIVE_ORDER,
        method: 'POST',
        body,
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
    sendLocation: build.mutation<{ message: string }, Location>({
      query: ({ id, body }) => ({
        url: PATH.SEND_LOCATION + id,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [API_TAGS.ORDER],
    }),
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
  useSendLocationMutation,
  useGetCustomersQuery,
  useGetClientByIdQuery,
} = orderApi;
