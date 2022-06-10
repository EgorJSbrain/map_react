import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from '../axios';

type UserData = {
  password: string;
  email: string
}

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchLogIn: build.mutation<UserData, any>({
      query: (data: UserData) => ({
        url: "/profile",
        method: "POST",
        body: data,
      }),
    }),
    fetchLogOut: build.mutation({
      query: (data: {}) => ({
        url: "/profile",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
