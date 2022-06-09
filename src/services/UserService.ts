import { baseUrl } from "../axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../types";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchSignUp: build.mutation<UserType, any>({
      query: (data: UserType) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    fetchLogOut: build.mutation({
      query: () => ({
        url: "/profile",
        method: "POST",
        body: {},
      }),
    }),
  }),
});