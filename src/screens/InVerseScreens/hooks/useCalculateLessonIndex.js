// hooks/useCalculateLessonIndex.js

import {useGetInVerseOfQuarterQuery} from '../../../services/InVerseapi';

function useCalculateLessonIndex(currentDate) {
  const currentDateObj = new Date(currentDate);
  const month = currentDateObj.getMonth() + 1;
  const year = currentDateObj.getFullYear();

  // Determine the quarter of the year
  let quarter;
  if (month >= 1 && month <= 3) {
    quarter = `${year}-01-cq`;
  } else if (month >= 4 && month <= 6) {
    quarter = `${year}-02-cq`;
  } else if (month >= 7 && month <= 9) {
    quarter = `${year}-03-cq`;
  } else {
    quarter = `${year}-04-cq`;
  }

  // Fetch the quarter details
  const {
    data: quarterDetails,
    error,
    isLoading,
  } = useGetInVerseOfQuarterQuery(quarter);

  if (isLoading || error || !quarterDetails) {
    return [null, null, year]; // Return nulls if data is not ready
  }

  // Parse the start_date in DD/MM/YYYY format
  const parseDate = dateString => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Calculate the week based on the start_date of the quarter
  const startQuarterDate = parseDate(quarterDetails.quarterly.start_date);
  const diffDays = Math.floor(
    (currentDateObj - startQuarterDate) / (1000 * 60 * 60 * 24),
  );
  const week = Math.floor(diffDays / 7) + 1;

  return [quarter, week.toString().padStart(2, '0'), year];
}

export default useCalculateLessonIndex;
