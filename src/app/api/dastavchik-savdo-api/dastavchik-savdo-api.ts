import { API_TAGS } from "@/constants";
import { baseApi } from "../base-api";
import { PATHS } from "./paths";
import {
  driverSavdoGetAllSavdoRequest,
  driverSavdoGetAllSavdoResponse,
} from "./types";

export const dastavchikSavdoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDriverSavdoAllSavdo: build.query<
      driverSavdoGetAllSavdoResponse[],
      driverSavdoGetAllSavdoRequest
    >({
      query: ({ startDate, endDate }) => ({
        url: PATHS.DASTAVCHIK_SAVDO_ALL_SAVDO,
        method: "GET",
        params: { startDate, endDate },
      }),
      providesTags: [API_TAGS.DASTAVCHIK_SAVDO],
    }),
    getDriverSavdo: build.query<driverSavdoGetAllSavdoResponse, { id: string }>(
      {
        query: ({ id }) => ({
          url: PATHS.DASTAVCHIK_SAVDO + `/${id}`,
          method: "GET",
        }),
        providesTags: [API_TAGS.DASTAVCHIK_SAVDO],
      }
    ),
    ubdateDriverSavdo: build.mutation<
      driverSavdoGetAllSavdoResponse,
      {
        id: string;
        body: {
          breadsInfo: {
            _id: string;
            title: string;
            breadPrice: number;
            breadSoldPrice: number;
            amount: number;
          }[];
        };
      }
    >({
      query: ({ id, body }) => ({
        url: PATHS.DASTAVCHIK_SAVDO_UPDATE + `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [API_TAGS.DASTAVCHIK_SAVDO],
    }),
    deleteDriverSavdo: build.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: PATHS.DASTAVCHIK_SAVDO_DELETE + `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.DASTAVCHIK_SAVDO],
    }),
  }),
});

export const {
  useGetDriverSavdoAllSavdoQuery,
  useLazyGetDriverSavdoAllSavdoQuery,
  useGetDriverSavdoQuery,
  useUbdateDriverSavdoMutation,
  useDeleteDriverSavdoMutation,
} = dastavchikSavdoApi;
