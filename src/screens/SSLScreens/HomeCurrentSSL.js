import React, {useState, useEffect} from 'react';
import useCalculateLessonIndex from './hooks/useCalculateLessonIndex';
import {useSelector} from 'react-redux';
import {
  useGetSSLOfDayQuery,
  useGetSSLOfQuarterQuery,
} from '../../services/SabbathSchoolApi';
import {useNavigation} from '@react-navigation/native';
import DateConverter from './DateConverter';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import tw from './../../../tailwind';
import {format} from 'date-fns';

const HomeCurrentSSL = () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [quarter, week] = useCalculateLessonIndex(currentDate);
  const [backgroundImage, setBackgroundImage] = useState('');
  const navigation = useNavigation();
  const {
    data: lessonDetails,
    error: lessonError,
    isLoading: lessonIsLoading,
    refetch: refetchLesson,
  } = useGetSSLOfDayQuery({path: quarter, id: week});
  const {
    data: quarterDetails,
    error: quarterError,
    isLoading: quarterIsLoading,
    refetch: refetchQuarter,
  } = useGetSSLOfQuarterQuery(quarter);

  useEffect(() => {
    if (quarterDetails) {
      setBackgroundImage(quarterDetails.quarterly.splash);
    }
  }, [quarterDetails]);

  const darkMode = useSelector(state => state.ui.darkMode);
  const language = useSelector(state => state.language.language);

  const handleOpenButtonPress = () => {
    navigation.navigate('SSL', {
      screen: 'SSLWeek',
      params: {
        ssl: quarter,
        weekId: week,
      },
    });
  };

  const handleRefetch = () => {
    refetchLesson();
    refetchQuarter();
  };

  const parseCustomDate = dateString => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const formatDateRange = (startDate, endDate) => {
    try {
      const start = format(parseCustomDate(startDate), 'MMM dd');
      const end = format(parseCustomDate(endDate), 'MMM dd');
      return `${start} - ${end}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  if (lessonIsLoading || quarterIsLoading) {
    return <Text>Loading...</Text>;
  }

  if (lessonError) {
    console.error('Lesson Error:', lessonError); // Log the entire error object
    return (
      <View style={tw`border border-accent-6 rounded my-2`}>
        <Text style={tw`font-nokia-bold text-accent-6 text-center py-4`}>
          Wait for quarterly update!
        </Text>
        <TouchableOpacity
          style={tw`bg-accent-6 px-4 py-1 rounded-full w-36 mt-2 mx-auto`}
          onPress={handleRefetch}>
          <Text style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
            Reload
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (quarterError) {
    console.error('Quarter Error:', quarterError); // Log the entire error object
    return (
      <View style={tw`border border-accent-6 rounded my-2`}>
        <Text style={tw`font-nokia-bold text-accent-6 text-center py-4`}>
          Error: {quarterError.error || 'An error occurred'}
        </Text>
        <TouchableOpacity
          style={tw`bg-accent-6 px-4 py-1 rounded-full w-36 mt-2 mx-auto`}
          onPress={handleRefetch}>
          <Text style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
            Reload
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!quarterDetails || !lessonDetails) {
    return <Text>Missing data...</Text>;
  }

  return (
    <View style={tw`rounded-2 overflow-hidden`}>
      <View
        style={tw`flex flex-row border border-accent-6 mt-4 rounded-4 p-2 gap-2`}>
        <View style={tw`h-32 w-32`}>
          <Image
            source={{
              uri: backgroundImage,
            }}
            style={tw`w-full h-full rounded-3`}
          />
        </View>
        <View style={tw`w-65%`}>
          <Text style={tw`font-nokia-bold text-accent-6 text-sm leading-tight`}>
            {quarterDetails.quarterly.title}
          </Text>
          <Text
            style={[
              tw`font-nokia-bold text-secondary-6 text-lg leading-tight`,
              darkMode ? tw`text-primary-3` : null,
            ]}>
            {lessonDetails.lesson.title}
          </Text>
          <View style={tw`border-b border-accent-6 mt-1 w-[63%]`} />
          <Text
            style={[
              tw`font-nokia-bold text-secondary-5 text-xs mt-2`,
              darkMode ? tw`text-primary-3` : null,
            ]}>
            <View style={tw`flex flex-row items-center`}>
              {language === 'en' ? (
                <Text style={tw`font-nokia-bold text-accent-6`}>
                  {formatDateRange(
                    lessonDetails.lesson.start_date,
                    lessonDetails.lesson.end_date,
                  )}
                </Text>
              ) : (
                <View style={tw`flex flex-row items-center`}>
                  <DateConverter
                    gregorianDate={lessonDetails.lesson.start_date}
                    textStyle={tw`font-nokia-bold text-accent-6`}
                  />
                  <Text
                    style={[
                      tw`font-nokia-bold text-secondary-5`,
                      darkMode ? 'text-primary-1' : null,
                    ]}>
                    {' '}
                    -{' '}
                  </Text>
                  <DateConverter
                    gregorianDate={lessonDetails.lesson.end_date}
                    textStyle={tw`font-nokia-bold text-accent-6`}
                  />
                </View>
              )}
            </View>
          </Text>
          <TouchableOpacity
            style={tw`bg-accent-6 px-4 py-1 rounded-full w-36 mt-1`}
            onPress={handleOpenButtonPress}>
            <Text
              style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
              {language === 'en' ? 'Open Lesson' : 'ትምህርቱን ክፈት'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeCurrentSSL;
