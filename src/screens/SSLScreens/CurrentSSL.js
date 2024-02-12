import {useState, useEffect} from 'react';
import useCalculateLessonIndex from './hooks/useCalculateLessonIndex';
import {Link} from 'react-router-dom';
import {
  useGetSSLOfDayQuery,
  useGetSSLOfQuarterQuery,
} from './../../services/SabbathSchoolApi';
import DateConverter from './DateConverter';
import {View, Text} from 'react-native';
function CurrentSSL() {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [quarter, week] = useCalculateLessonIndex(currentDate);
  const [backgroundImage, setBackgroundImage] = useState('');

  const {
    data: lessonDetails,
    error: lessonError,
    isLoading: lessonIsLoading,
  } = useGetSSLOfDayQuery({path: quarter, id: week});
  const {
    data: quarterDetails,
    error: quarterError,
    isLoading: quarterIsLoading,
  } = useGetSSLOfQuarterQuery(quarter);

  useEffect(() => {
    if (lessonDetails) {
      setBackgroundImage(lessonDetails.lesson.cover);
    }
  }, [lessonDetails]);

  if (lessonIsLoading || quarterIsLoading) return <div>Loading...</div>;
  if (lessonError) return <div>Error: {lessonError.message}</div>;
  if (quarterError) return <div>Error: {quarterError.message}</div>;
  if (!quarterDetails || !lessonDetails) return <div>Missing data...</div>;
  return (
    <View>
      <Text></Text>
    </View>
  );
}

export default CurrentSSL;
