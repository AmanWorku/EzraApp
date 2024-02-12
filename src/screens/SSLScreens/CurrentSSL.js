import React, {useState, useEffect} from 'react';
import useCalculateLessonIndex from './hooks/useCalculateLessonIndex';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  useGetSSLOfDayQuery,
  useGetSSLOfQuarterQuery,
} from './../../services/SabbathSchoolApi';
import DateConverter from './DateConverter';
import {View, Text, ImageBackground, ScrollView} from 'react-native';
import tw from './../../../tailwind';
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
  const darkMode = useSelector(state => state.ui.darkMode);

  const textStyle = 'font-nokia-bold text-primary-3';

  if (lessonIsLoading || quarterIsLoading) {
    return <Text>Loading...</Text>;
  }
  if (lessonError) {
    return <Text>Error: {lessonError.message}</Text>;
  }
  if (quarterError) {
    return <Text>Error: {quarterError.message}</Text>;
  }
  if (!quarterDetails || !lessonDetails) {
    return <Text>Missing data...</Text>;
  }
  return (
    <View style={tw`mb-3`}>
      <ImageBackground
        source={{
          uri: backgroundImage,
        }}
        style={tw`w-full h-44 justify-end`}
        imageStyle={tw`rounded-4`}>
        <View
          style={[
            tw`absolute inset-0 bg-accent-10 bg-opacity-60 rounded-lg`,
            darkMode ? tw`bg-accent-11 bg-opacity-70` : null,
          ]}>
          <View style={tw`flex absolute bottom-0 left-0 p-4`}>
            <View>
              <Text style={tw`font-nokia-bold text-primary-1 text-2xl`}>
                {quarterDetails.quarterly.title}
              </Text>
            </View>
            <View style={tw`flex flex-row`}>
              <DateConverter
                gregorianDate={quarterDetails.quarterly.start_date}
                textStyle={textStyle}
              />
              <Text style={tw`font-nokia-bold text-primary-3`}> - </Text>
              <DateConverter
                gregorianDate={quarterDetails.quarterly.end_date}
                textStyle={textStyle}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default CurrentSSL;
