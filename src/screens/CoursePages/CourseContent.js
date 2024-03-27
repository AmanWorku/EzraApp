import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import tw from './../../../tailwind';
import {useGetCourseByIdQuery} from './../../services/api';
import {useNavigation} from '@react-navigation/native';
import {
  ArrowSquareLeft,
  CheckCircle,
  Circle,
  Warning,
} from 'phosphor-react-native';
import {useSelector} from 'react-redux';
import ErrorScreen from '../../components/ErrorScreen';

const CourseContent = ({route}) => {
  const {courseId} = route.params;
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const darkMode = useSelector(state => state.ui.darkMode);
  const {
    data: courseData,
    error,
    isLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId, {
    skip: !courseId,
  });
  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);
  const data = courseData?.chapters || [];
  const updateIndex = newIndex => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= data.length) {
      newIndex = data.length - 1;
    }
    if (newIndex > unlockedIndex) {
      setUnlockedIndex(newIndex);
    }
    setActiveIndex(newIndex);
  };
  const currentDataNumber = activeIndex + 1;
  const totalDataNumber = data.length;

  const isSlideUnlocked = index => {
    return index <= unlockedIndex;
  };
  const backButtonPress = () => {
    navigation.navigate('CourseHome');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={darkMode ? tw`bg-secondary-9 h-100%` : null}>
        <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          Loading
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return <ErrorScreen refetch={refetch} darkMode={darkMode} />;
  }

  return (
    <View style={darkMode ? tw`bg-secondary-9 h-100%` : null}>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={['#EA9215']}
              tintColor="#EA9215"
            />
          }>
          <View style={tw`flex-1 h-70`}>
            <ImageBackground
              source={{
                uri: `https://ezra-seminary.mybese.tech/images/${courseData.image}`,
              }}
              style={tw`flex-5`}>
              <TouchableOpacity onPress={backButtonPress}>
                <ArrowSquareLeft
                  size={36}
                  weight="fill"
                  color={'#EA9215'}
                  style={tw`px-8 mt-4`}
                />
              </TouchableOpacity>
            </ImageBackground>
            <View
              style={[
                tw`flex-1 bg-primary-7 flex-row gap-2 justify-center items-center`,
                darkMode ? tw`bg-secondary-8` : null,
              ]}>
              <View style={tw`p-1 bg-accent-6 rounded-1`}>
                <Text style={tw`font-nokia-bold text-primary-1`}>10%</Text>
              </View>
              <Text
                style={[
                  tw`font-nokia-bold text-secondary-6 text-sm`,
                  darkMode ? tw`text-primary-3` : null,
                ]}>
                Pass 100% of your lessons to complete this course
              </Text>
            </View>
          </View>
          <View style={tw`flex mx-auto w-[92%]`}>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-6 text-2xl mt-2`,
                darkMode ? tw`text-primary-3` : null,
              ]}>
              {courseData?.title}
            </Text>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-6 text-justify text-lg leading-tight my-3`,
                darkMode ? tw`text-primary-3` : null,
              ]}>
              {'    '}
              {courseData?.description}
            </Text>
            <View style={tw`flex flex-row items-center`}>
              <View style={tw`border-b-4 border-accent-6`}>
                <Text
                  style={[
                    tw`py-2 font-nokia-bold text-secondary-6`,
                    darkMode ? tw`text-primary-3` : null,
                  ]}>
                  ትምህርቶች {currentDataNumber}/{totalDataNumber}
                </Text>
              </View>
              <View style={tw`border-b border-accent-6 h-4 flex-grow mt-5`} />
            </View>
            {data.map((chapter, index) => {
              const unlocked = isSlideUnlocked(index);
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SlideSample1', {
                      chapterTitle: chapter.chapter,
                      courseDescription: chapter.description,
                      chapterId: chapter._id,
                      CId: courseId,
                    });
                    updateIndex(index);
                  }}
                  key={index}>
                  <View
                    style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
                    <View style={tw`flex`}>
                      <Text
                        style={[
                          tw`font-nokia-bold text-secondary-6 text-lg`,
                          darkMode ? tw`text-primary-3` : null,
                        ]}>
                        {chapter.chapter}
                        {/* <Text>ID</Text> {courseId} */}
                      </Text>
                      {/* <Text style={tw`font-nokia-bold text-accent-6 text-xs`}>
                        15/15 Slides
                      </Text> */}
                    </View>
                    {unlocked ? (
                      <CheckCircle size={20} weight="fill" color={'#EA9215'} />
                    ) : (
                      <Circle size={20} color={'#EA9215'} />
                    )}
                  </View>
                  <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CourseContent;
