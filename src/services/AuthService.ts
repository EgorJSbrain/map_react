import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from '../axios';

type UserData = {
  password: string;
  email: string
}

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  endpoints: (build) => ({
    fetchAllUsers: build.query({
      query: () => ({
        url: '/profiles'
      })
    }),
    fetchLogIn: build.mutation<UserData, any>({
      query: (data: UserData) => ({
        url: '/profiles',
        method: 'PUT',
        body: data,
      })
    }),
    fetchLogOut: build.mutation({
      query: (data: {}) => ({
        url: '/profiles',
        method: 'PUT',
        body: data,
      })
    }),
  })
});
