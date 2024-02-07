import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),

    getUser: builder.query({
      query: () => ({
        url: `/users/me`,
        providesTags: ["Users"],
      }),
    }),



    registerUser: builder.mutation({
      query: (userInfo) => ({
        url: '/users/create-user',
        method: 'POST',
        body: userInfo,
      }),
    }),


  }),
});

export const { useLoginMutation, useRegisterUserMutation, useGetUserQuery } = authApi;
