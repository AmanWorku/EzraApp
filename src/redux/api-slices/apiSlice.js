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
  tagTypes: ['Devotions', 'Courses', 'User'],
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
    updateUserStatus: builder.mutation({
      query: ({id, status}) => ({
        url: `/users/status/${id}`,
        method: 'PUT',
        body: {status},
      }),
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetDevotionsQuery,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetCurrentUserQuery,
  useUpdateUserStatusMutation,
} = apiSlice;
