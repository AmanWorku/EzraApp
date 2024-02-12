import React, {useState, useEffect} from 'react';
import useCalculateLessonIndex from './hooks/useCalculateLessonIndex';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  useGetSSLOfDayQuery,
  useGetSSLOfQuarterQuery,
} from './../../services/SabbathSchoolApi';
import DateConverter from './DateConverter';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import tw from './../../../tailwind';
import LinearGradient from 'react-native-linear-gradient';
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

  const textStyle = 'font-nokia-bold text-primary-3 text-2xl';
  const gradientColor = '#222222';

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
    <View style={tw`mb-3 rounded-2 overflow-hidden`}>
      <ImageBackground
        source={{
          uri: backgroundImage,
        }}
        style={tw`w-full h-44 justify-end`}>
        <LinearGradient
          colors={[gradientColor, `${gradientColor}20`]}
          style={tw`absolute inset-0`}
          start={{x: 0.5, y: 1}}
          end={{x: 0.5, y: 0.2}}
        />
        <View style={[tw`absolute inset-0 rounded-lg`]}>
          <View style={tw`flex absolute bottom-0 left-0 p-4`}>
            <Text style={tw`font-nokia-bold text-primary-6`}>
              የዚህ ሳምንት ትምህርት
            </Text>
            <View style={tw`flex flex-row items-center`}>
              <DateConverter
                gregorianDate={lessonDetails.lesson.start_date}
                textStyle={textStyle}
              />
              <Text style={tw`font-nokia-bold text-primary-3`}> - </Text>
              <DateConverter
                gregorianDate={lessonDetails.lesson.end_date}
                textStyle={textStyle}
              />
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={tw`my-2`}>
        <Text style={tw`font-nokia-bold text-accent-6`}>
          {quarterDetails.quarterly.title}
        </Text>
        <Text style={tw`font-nokia-bold text-secondary-6 text-2xl`}>
          {lessonDetails.lesson.title}
        </Text>
        <Text style={tw`font-nokia-bold text-accent-6`}>
          {quarterDetails.quarterly.human_date}
        </Text>
      </View>
      <View style={tw`border-b border-accent-6 mb-1`} />
      <Text style={tw`font-nokia-bold text-secondary-6 text-justify `}>
        {'   '}
        {quarterDetails.quarterly.description}
      </Text>
      <View style={tw`flex flex-row mx-auto gap-2`}>
        <TouchableOpacity style={tw``}>
          <Text>ትምህርቱን ክፈት</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Watch on YouTube</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CurrentSSL;
