import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQueryWithLanguage = async (args, api, extraOptions) => {
  const language = api.getState().language.language;
  const baseUrl = `https://sabbath-school-stage.adventech.io/api/v2/${language}`;
  const rawBaseQuery = fetchBaseQuery({baseUrl});
  console.log(
    'API Request:',
    baseUrl + (typeof args === 'string' ? args : args.url),
  );
  const result = await rawBaseQuery(args, api, extraOptions);
  console.log('API Response:', result);

  // Filter the data to exclude lessons with multiple hyphens in their id
  if (result.data && Array.isArray(result.data)) {
    result.data = result.data.filter(item => {
      const hyphenCount = (item.id.match(/-/g) || []).length;
      return hyphenCount <= 1; // Keep items with 0 or 1 hyphen
    });
  }

  return result;
};

export const InVerseapi = createApi({
  reducerPath: 'InVerseapi',
  baseQuery: baseQueryWithLanguage,
  endpoints: builder => ({
    getInVerses: builder.query({
      query: () => `quarterlies/index.json`,
      transformResponse: response => {
        // Filter the data to include only items with an id ending in '-cq'
        return response.filter(item => item.id.endsWith('-cq'));
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
