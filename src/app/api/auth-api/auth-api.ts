import { API_TAGS } from "@/constants";
import { baseApi } from "../base-api";
import { PATHS } from "./path";
import {
  LoginRequest,
  LoginResponse,
  MeResponse,
  ProfileResponse,
  Reason,
  UpdateAvatarRequest,
  UpdateAvatarResponse,
} from "./types";

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
    ubdateAvatar: build.mutation<UpdateAvatarResponse, UpdateAvatarRequest>({
      query: (body) => ({
        url: PATHS.UPDATE_AVATAR,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    upload: build.mutation<UpdateAvatarResponse, UpdateAvatarRequest>({
      query: (body) => ({
        url: PATHS.UPLOAD,
        method: "POST",
        body,
      }),
    }),
    getAllUsers: build.query<MeResponse[], { roles: string[] }>({
      query: (params) => ({
        url: "/auth/get-all-users",
        params,
        method: "GET",
      }),
      providesTags: [API_TAGS.USER],
    }),
    getAllReasons: build.query<Reason[], void>({
      query: () => ({
        url: "/reason/all-reason",
        method: "GET",
      }),
      providesTags: [API_TAGS.USER]
    })
  })
});

export const {
  useLoginMutation,
  useMeQuery,
  useLazyMeQuery,
  useUbdateAvatarMutation,
  useGetAllUsersQuery,
  useGetAllReasonsQuery
} = authApi;
