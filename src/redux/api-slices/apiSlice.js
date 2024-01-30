import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ezra-seminary-api.onrender.com',
    prepareHeaders: headers => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : '';
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }),
    }),
    signup: builder.mutation({
      query: ({firstName, lastName, email, password}) => ({
        url: '/users/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName, lastName, email, password}),
      }),
    }),
    getDevotions: builder.query({
      query: () => ({
        url: '/devotion/show',
      }),
      providesTags: [{type: 'Devotions', id: 'LIST'}],
    }),
  }),
});

export const {useSignupMutation, useLoginMutation, useGetDevotionsQuery} =
  apiSlice;
