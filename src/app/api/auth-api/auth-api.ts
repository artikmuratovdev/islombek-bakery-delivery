import { baseApi } from "../base-api";
import { PATHS } from "./path";
import { LoginRequest, LoginResponse, ProfileResponse } from "./types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: PATHS.LOGIN,
        method: "POST",
        body,
      }),
    }),
    me: build.query<ProfileResponse, void>({
      query: () => ({
        url: PATHS.ME,
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useLazyMeQuery } = authApi;
