import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQueryWithLanguage = async (args, api, extraOptions) => {
  const language = api.getState().language.language;
  const baseUrl = `https://sabbath-school-stage.adventech.io/api/v2/${language}`;
  const rawBaseQuery = fetchBaseQuery({baseUrl});
  const result = await rawBaseQuery(args, api, extraOptions);

  // Filter the data to exclude lessons with multiple hyphens in their id
  if (result.data && Array.isArray(result.data)) {
    result.data = result.data.filter(item => {
      const hyphenCount = (item.id.match(/-/g) || []).length;
      return hyphenCount <= 1; // Keep items with 0 or 1 hyphen
    });
  }

  return result;
};

export const SSLapi = createApi({
  reducerPath: 'SSLapi',
  baseQuery: baseQueryWithLanguage,
  endpoints: builder => ({
    getSSLs: builder.query({
      query: () => `quarterlies/index.json`,
    }),
    getSSLOfQuarter: builder.query({
      query: quarter => {
        // Dynamically add the `-cq` suffix if not already present
        const formattedQuarter = quarter.includes('cq')
          ? quarter
          : `${quarter}-cq`;
        return `quarterlies/${formattedQuarter}/index.json`;
      },
    }),
    getSSLOfDay: builder.query({
      query: ({path, id}) => {
        const formattedPath = path.includes('cq') ? path : `${path}-cq`;
        return `quarterlies/${formattedPath}/lessons/${id}/index.json`;
      },
    }),
    getSSLOfDayLesson: builder.query({
      query: ({path, id, day}) => {
        const formattedPath = path.includes('cq') ? path : `${path}-cq`;
        return `quarterlies/${formattedPath}/lessons/${id}/days/${day}/read/index.json`;
      },
      getInVerseOfQuarter: builder.query({
        query: quarter => `quarterlies/${quarter}-cq/index.json`, // Add `-cq` suffix for InVerse
      }),
    }),
  }),
});

export const {
  useGetSSLsQuery,
  useGetSSLOfQuarterQuery,
  useGetSSLOfDayQuery,
  useGetSSLOfDayLessonQuery,
  useGetInVerseOfQuarterQuery,
} = SSLapi;
