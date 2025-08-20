import { baseApi } from "../base-api";
import { PATHS } from "./path";
import { LoginRequest, LoginResponse } from "./types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: PATHS.LOGIN,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
