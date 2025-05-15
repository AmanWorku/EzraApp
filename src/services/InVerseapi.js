import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQueryWithLanguage = async (args, api, extraOptions) => {
  const language = api.getState().language.language;
  const baseUrl = `https://sabbath-school-stage.adventech.io/api/v2/${language}`;
  const rawBaseQuery = fetchBaseQuery({baseUrl});
  const result = await rawBaseQuery(args, api, extraOptions);

  return result; // No filtering applied here
};

export const InVerseapi = createApi({
  reducerPath: 'InVerseapi',
  baseQuery: baseQueryWithLanguage,
  endpoints: builder => ({
    getInVerses: builder.query({
      query: () => `quarterlies/index.json`,
      transformResponse: response => {
        // Ensure the response is an array or extract the array from the response
        const data = Array.isArray(response) ? response : response.data;

        if (!Array.isArray(data)) {
          console.error('API response is not an array:', data);
          return [];
        }

        return data; // Return the unfiltered data
      },
    }),
    getInVerseOfQuarter: builder.query({
      query: quarter => `quarterlies/${quarter}/index.json`,
    }),
    getInVerseOfDay: builder.query({
      query: ({path, id}) => `quarterlies/${path}/lessons/${id}/index.json`,
    }),
    getInVerseOfDayLesson: builder.query({
      query: ({path, id, day}) => {
        return `quarterlies/${path}/lessons/${id}/days/${day}/read/index.json`;
      },
    }),
  }),
});

export const {
  useGetInVersesQuery,
  useGetInVerseOfQuarterQuery,
  useGetInVerseOfDayQuery,
  useGetInVerseOfDayLessonQuery,
} = InVerseapi;
