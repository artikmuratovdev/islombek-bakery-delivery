import { API_TAGS } from "@/constants/api-tags";
import { baseApi } from "../base-api";
import { PATHS } from "./paths";
import { GetClientsMapResponse } from "./type";

export const clientsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClientsMap: build.query<GetClientsMapResponse[], unknown>({
      query: () => ({
        url: PATHS.CLIENTS_MAP,
        method: "GET",
      }),
      providesTags: [API_TAGS.CLIENTS],
    }),
  }),
});

export const { useGetClientsMapQuery } = clientsApi;
