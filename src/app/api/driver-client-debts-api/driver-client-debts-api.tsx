/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_TAGS } from "@/constants";
import { baseApi } from "../base-api";
import { PATHS } from "./paths";
import {
  DriverDebtClientsTodayDebtsRequest,
  DriverDebtClientsTodayDebtsResponse,
  DriverDebtClientsTotalDebtRequest,
  DriverDebtClientsTotalDebtResponse,
  DriverDebtClientsTotalDebtsRequest,
  DriverDebtClientsTotalDebtsResponse,
} from "./types";

export const driverClientDebtsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDriverDebtClientsTotalDebts: build.query<
      DriverDebtClientsTotalDebtsResponse[],
      DriverDebtClientsTotalDebtsRequest
    >({
      query: ({ search }) => ({
        url: PATHS.DRIVER_CLIENT_DEBTS_TOTAL_DEBTS,
        method: "GET",
        params: { search },
      }),
      providesTags: [API_TAGS.DEBT_CLIENTS],
    }),
    getDriverDebtClientsTotalDebt: build.query<
      DriverDebtClientsTotalDebtResponse[],
      DriverDebtClientsTotalDebtRequest
    >({
      query: ({ clientId, startDate, endDate }) => ({
        url: PATHS.DRIVER_CLIENT_DEBTS_TOTAL_DEBT + `${clientId}/debts`,
        method: "GET",
        params: { startDate, endDate },
      }),
      providesTags: [API_TAGS.DEBT_CLIENTS],
    }),
    getDriverDebtClientsTodayDebts: build.query<
      DriverDebtClientsTodayDebtsResponse[],
      DriverDebtClientsTodayDebtsRequest
    >({
      query: ({ search }) => ({
        url: PATHS.DRIVER_CLIENT_DEBTS_TODAY_DEBTS,
        method: "GET",
        params: { search },
      }),
      providesTags: [API_TAGS.DEBT_CLIENTS],
    }),
    getDriverDebtClientDebtPayments: build.query<
      {
        _id: string;
        client: string;
        debt: number;
        paidAmount: number;
        createdAt: string;
        updatedAt: string;
      }[],
      { id: string; startDate?: string; endDate?: string }
    >({
      query: ({ id, startDate, endDate }) => ({
        url: PATHS.DRIVER_CLIENT_DEBTS_TOTAL_DEBT + `${id}/debts/payments`,
        method: "GET",
        params: { startDate, endDate },
      }),
      providesTags: [API_TAGS.DEBT_CLIENTS],
    }),
    createDriverDebtClientDebtPayment: build.mutation<
      void,
      { id: string; body: { amount: number } }
    >({
      query: ({ id, body }) => ({
        url: PATHS.DRIVER_CLIENT_DEBTS_TOTAL_DEBT + `${id}/debts/pay`,
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.DEBT_CLIENTS],
    }),
  }),
});

export const {
  useGetDriverDebtClientsTotalDebtsQuery,
  useLazyGetDriverDebtClientsTotalDebtsQuery,
  useGetDriverDebtClientsTodayDebtsQuery,
  useLazyGetDriverDebtClientsTodayDebtsQuery,
  useGetDriverDebtClientsTotalDebtQuery,
  useLazyGetDriverDebtClientsTotalDebtQuery,
  useGetDriverDebtClientDebtPaymentsQuery,
  useLazyGetDriverDebtClientDebtPaymentsQuery,
  useCreateDriverDebtClientDebtPaymentMutation,
} = driverClientDebtsApi;
