import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import tw from './../../../tailwind';
import {ListBullets, CheckCircle, Circle, XCircle} from 'phosphor-react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useGetCourseByIdQuery} from './../../services/api';
import {useNavigation} from '@react-navigation/core';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import ErrorScreen from '../../components/ErrorScreen';
const {width, height} = Dimensions.get('window');

const FullScreenMenu = ({
  isVisible,
  onClose,
  courseId,
  chapterId,
  updateIndex,
  unlockedIndex,
  activeIndex,
}) => {
  const navigation = useNavigation();
  const {
    data: courseData,
    error,
    isLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);
  const darkMode = useSelector(state => state.ui.darkMode);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);
      return () => StatusBar.setHidden(false);
    }, []),
  );

  let chapter = courseData
    ? courseData.chapters.find(chap => chap._id === chapterId)
    : null;
  if (!chapter) {
    chapter = {slides: []};
  }

  const data = chapter.slides;
  const currentDataNumber = activeIndex + 1;
  const totalDataNumber = data.length;

  const handleSlideChange = newIndex => {
    if (isSlideUnlocked(newIndex)) {
      updateIndex(newIndex);
      onClose();
    }
  };

  const isSlideUnlocked = index => {
    return index <= unlockedIndex;
  };
  if (!isVisible) {
    return null;
  }

  if (isLoading) {
    return (
      <SafeAreaView>
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
    <View
      style={[
        styles.menuContainer,
        tw`flex-1 bg-opacity-95 bg-accent-11 p-4`,
        darkMode ? tw`bg-secondary-10 bg-opacity-97` : null,
      ]}>
      <View
        style={[
          styles.closeButton,
          tw` flex flex-row justify-between items-center`,
        ]}>
        <Text style={tw`font-nokia-bold text-primary-1 text-xl w-[90%]`}>
          {chapter.chapter}
        </Text>
        <TouchableOpacity onPress={onClose} style={tw``}>
          <XCircle
            style={tw`flex self-end`}
            size={32}
            weight="fill"
            color="#EA9215"
          />
        </TouchableOpacity>
      </View>
      <Text style={tw`font-nokia-light text-primary-1 text-sm mt-4`}>
        {courseData.description}
      </Text>
      <View style={tw`border-b border-primary-1 my-4`} />
      <View style={tw`flex flex-row gap-2 mb-2`}>
        <ListBullets size={24} weight="fill" color="#EA9215" />
        <Text style={tw`font-nokia-bold text-primary-1 text-sm `}>
          Slide {currentDataNumber}/{totalDataNumber}
        </Text>
      </View>
      <ScrollView
        style={tw`h-64`}
        contentContainerStyle={tw`pb-4`}
        showsVerticalScrollIndicator={false}>
        {chapter.slides.map((slide, index) => {
          const unlocked = isSlideUnlocked(index);
          return (
            <TouchableOpacity
              key={slide._id}
              onPress={() => isSlideUnlocked(index) && handleSlideChange(index)}
              disabled={!isSlideUnlocked(index)}>
              <View
                style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
                <Text style={tw`font-nokia-bold text-primary-1 text-s w-[90%]`}>
                  {slide.slide}
                </Text>
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
      </ScrollView>
      <View style={tw`flex-0.5`}>
        <TouchableOpacity
          style={tw`bg-accent-6 px-4 py-2 rounded-full w-36 my-2 mx-auto`}
          onPress={() => {
            navigation.navigate('CourseHome');
          }}>
          <Text style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
            Exit Lesson
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    justifyContent: 'flex-start',
    zIndex: 2,
  },
  closeButton: {
    marginTop: StatusBar.currentHeight || 40,
  },
});

export default FullScreenMenu;
