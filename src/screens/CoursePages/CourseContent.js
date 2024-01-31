import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import tw from './../../../tailwind';
import {useGetCourseByIdQuery} from './../../services/api';
import {useNavigation} from '@react-navigation/native';
import {ArrowSquareLeft, CheckCircle, Circle} from 'phosphor-react-native';

const CourseContent = ({route}) => {
  const {courseId} = route.params;
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const {
    data: courseData,
    error,
    isLoading,
  } = useGetCourseByIdQuery(courseId, {
    skip: !courseId,
  });
  const data = courseData?.chapters || [];
  const updateIndex = newIndex => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= data.length) {
      newIndex = data.length - 1;
    }

    if (newIndex > unlockedIndex) {
      setUnlockedIndex(newIndex); // Update the unlocked index
    }

    setActiveIndex(newIndex);
  };

  // slide number
  const currentDataNumber = activeIndex + 1;
  const totalDataNumber = data.length;

  const isSlideUnlocked = index => {
    return index <= unlockedIndex; // Check if the slide is unlocked based on the unlocked index
  };
  const backButtonPress = () => {
    navigation.navigate('CourseHome');
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 h-70`}>
          <ImageBackground
            source={require('./../../assets/bible2.jpeg')}
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
            style={tw`flex-1 bg-primary-7 flex-row gap-2 justify-center items-center`}>
            <View style={tw`p-1 bg-accent-6 rounded-1`}>
              <Text style={tw`font-nokia-bold text-primary-1`}>10%</Text>
            </View>
            <Text style={tw`font-nokia-bold text-secondary-6 text-sm`}>
              Pass 100% of your lessons to complete this course
            </Text>
          </View>
        </View>
        <View style={tw`flex mx-auto w-[92%]`}>
          <Text style={tw`font-nokia-bold text-secondary-6 text-2xl mt-2`}>
            {courseData?.title}
          </Text>
          <Text
            style={tw`font-nokia-bold text-secondary-6 text-justify text-lg leading-tight my-3`}>
            {'    '}
            {courseData?.description}
          </Text>
          <View style={tw`flex flex-row items-center`}>
            <View style={tw`border-b-4 border-accent-6`}>
              <Text style={tw`py-2 font-nokia-bold text-secondary-6`}>
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
                    courseDescription: 'Short description of the course...',
                    chapterId: chapter._id,
                    CId: courseId,
                  });
                  updateIndex(index);
                }}
                key={index}>
                <View
                  style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
                  <View style={tw`flex`}>
                    <Text style={tw`font-nokia-bold text-secondary-6 text-lg`}>
                      {chapter.chapter}
                      {/* <Text>ID</Text> {courseId} */}
                    </Text>
                    <Text style={tw`font-nokia-bold text-accent-6 text-xs`}>
                      15/15 Slides
                    </Text>
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
  );
};

export default CourseContent;
