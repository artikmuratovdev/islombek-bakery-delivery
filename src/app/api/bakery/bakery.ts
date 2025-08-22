import { API_TAGS } from "@/constants/api-tags";
import { baseApi } from "../base-api";
import { PATHS } from "./path";
import {
  GetAllBakery,
  GetBakeryDeliveryResponse,
  GetBakeryDoughRequest,
  GetBakeryDoughResponse,
  GetBakeryRequest,
  GetBakeryResponse,
  UpdateBakeryDoughRequest,
  UpdateBakeryDoughResponse,
} from "./type";

export const bakeryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBakery: build.query<GetAllBakery[], unknown>({
      query: () => ({
        url: PATHS.ALL_BAKERY,
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    getBakery: build.query<GetBakeryResponse, GetBakeryRequest>({
      query: ({ id }) => ({
        url: PATHS.BAKERY + id,
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    getBakeryDoughInfo: build.query<
      GetBakeryDoughResponse[],
      GetBakeryDoughRequest
    >({
      query: ({ id }) => ({
        url: PATHS.BAKERY_DOUGH_START + id + PATHS.BAKERY_DOUGH_INFO_END,
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    getBakeryDelivery: build.query<
      GetBakeryDeliveryResponse[],
      GetBakeryDoughRequest
    >({
      query: ({ id }) => ({
        url: PATHS.BAKERY_DOUGH_START + id + PATHS.BAKERY_DELIVERY_END,
        method: "GET",
      }),
      providesTags: [API_TAGS.BAKERY],
    }),
    updateBakeryDough: build.mutation<
      UpdateBakeryDoughResponse,
      UpdateBakeryDoughRequest
    >({
      query: ({ id, doughs }) => ({
        url: PATHS.BAKERY_DOUGH_START + id + PATHS.BAKERY_DOUGH_END,
        method: "PATCH",
        body: { doughs },
      }),
      invalidatesTags: [API_TAGS.BAKERY],
    }),
  }),
});

export const {
  useGetAllBakeryQuery,
  useGetBakeryQuery,
  useGetBakeryDoughInfoQuery,
  useGetBakeryDeliveryQuery,
  useUpdateBakeryDoughMutation,
} = bakeryApi;
