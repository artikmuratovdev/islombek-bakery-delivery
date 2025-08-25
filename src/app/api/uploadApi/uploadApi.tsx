import { API_TAGS } from "@/constants";
import { baseApi } from "../base-api";
import { PATHS } from "./paths";
import { UploadResponse } from "./types";

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    upload: build.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: PATHS.UPLOAD,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [API_TAGS.Upload],
    }),
  }),
});

export const { useUploadMutation } = uploadApi;
