// apiSlice.js
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ezrabackend.online/', // Replace with your actual base URL
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
  tagTypes: ['Devotions', 'Courses'],
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: ({firstName, lastName, email, password}) => ({
        url: '/users/signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {firstName, lastName, email, password},
      }),
    }),
    updateUser: builder.mutation({
      query: formData => ({
        url: '/users/profile',
        method: 'PUT',
        body: formData,
      }),
    }),
    getDevotions: builder.query({
      /**
       * Fetch devotions with optional parameters.
       * @param {Object} params - Query parameters.
       * @param {number} params.limit - Number of devotions to fetch.
       * @param {string} params.sort - Sorting order ('asc' or 'desc').
       */
      query: ({limit, sort} = {}) => {
        const queryParams = new URLSearchParams();
        if (limit) queryParams.append('limit', limit);
        if (sort) queryParams.append('sort', sort);
        return {
          url: '/devotion/show',
          params: queryParams.toString(),
        };
      },
      providesTags: ['Devotions'],
    }),
    getCurrentUser: builder.query({
      query: () => '/users/current',
    }),
    getCourses: builder.query({
      query: () => 'course/getall',
      providesTags: ['Courses'],
    }),
    getCourseById: builder.query({
      query: id => `course/get/${id}`,
      providesTags: (result, error, id) => [{type: 'Courses', id}],
    }),
  }),
});

// Export the generated hooks for each endpoint
export const {
  useSignupMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useGetDevotionsQuery,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetCurrentUserQuery,
} = apiSlice;
