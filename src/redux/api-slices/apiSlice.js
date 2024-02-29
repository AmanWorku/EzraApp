import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ezra-seminary.mybese.tech',
    prepareHeaders: async headers => {
      const userString = await AsyncStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
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
    }),
    getCourses: builder.query({
      query: () => 'course/getall',
    }),
    getCourseById: builder.query({
      query: id => `course/get/${id}`,
    }),
  }),
});

// Export the generated hooks for each API endpoint
export const {
  useSignupMutation,
  useLoginMutation,
  useGetDevotionsQuery,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
} = apiSlice;
