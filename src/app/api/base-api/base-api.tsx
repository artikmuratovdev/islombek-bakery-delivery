/* eslint-disable @typescript-eslint/no-explicit-any */
import { SERVER_URL, API_TAGS } from "@/constants";
import { useStorage } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paramsSerializer = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        searchParams.append(key, v);
      });
    } else if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });

  return searchParams.toString();
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}`,
    prepareHeaders: (headers) => {
      const token = useStorage.getTokens()?.accessToken;
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
    paramsSerializer,
  }),
  tagTypes: Object.values(API_TAGS),
  endpoints: () => ({}),
});
