/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_TAGS, SERVER_URL } from '@/constants';
import { useStorage } from '@/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

const baseQuery = fetchBaseQuery({
  baseUrl: `${SERVER_URL}`,
  prepareHeaders: (headers) => {
    const token = useStorage.getTokens()?.accessToken;
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    return headers;
  },
  paramsSerializer,
});

// Base query with response interceptor for unauthorized responses
const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  // Check if response is 401 Unauthorized
  if (result.error && result.error.status === 401) {
    console.warn('Unauthorized access detected, clearing credentials');
    useStorage.removeCredentials();

    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: Object.values(API_TAGS),
  endpoints: () => ({}),
});
