import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getErrorsHistory: builder.query({
      query: (searchTerm) =>
        searchTerm ? `/history?query=${searchTerm}` : "/history",
    }),
    ErrorRecord: builder.mutation({
      query: (body) => ({
        url: "/errors",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetErrorsHistoryQuery, useErrorRecordMutation } = api;
