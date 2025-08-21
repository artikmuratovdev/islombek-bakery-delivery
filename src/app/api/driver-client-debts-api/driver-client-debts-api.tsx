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
      DriverDebtClientsTotalDebtResponse,
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
  }),
});

export const {
  useGetDriverDebtClientsTotalDebtsQuery,
  useLazyGetDriverDebtClientsTotalDebtsQuery,
  useGetDriverDebtClientsTodayDebtsQuery,
  useLazyGetDriverDebtClientsTodayDebtsQuery,
  useGetDriverDebtClientsTotalDebtQuery,
  useLazyGetDriverDebtClientsTotalDebtQuery,
} = driverClientDebtsApi;
