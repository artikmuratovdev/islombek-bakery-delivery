import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "@/constants";
import { useStorage } from "@/utils";
import { API_TAGS } from "@/constants/api-tags";

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
  }),
  tagTypes: Object.values(API_TAGS),
  endpoints: () => ({}),
});
