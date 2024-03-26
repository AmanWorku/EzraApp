import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import tw from './../../../tailwind';
import {
  CaretCircleLeft,
  CaretCircleRight,
  DotsThreeOutlineVertical,
  Warning,
} from 'phosphor-react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useGetCourseByIdQuery} from './../../services/api';
import {useNavigation} from '@react-navigation/core';
import {ActivityIndicator} from 'react-native';
import FullScreenMenu from './FullScreenMenu';
import {useSelector} from 'react-redux';
import List from './Types/List';
import Slide from './Types/Slide';
import Quiz from './Types/Quiz';
import Subtitle from './Types/Subtitle';
import TextComponent from './Types/Text';
import ImageComponent from './Types/Image';
import Title from './Types/Title';

const SlideSample2 = ({route}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const navigation = useNavigation();
  const {courseId, chapterId} = route.params;
  const {
    data: courseData,
    error,
    isLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const darkMode = useSelector(state => state.ui.darkMode);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
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

  const updateIndex = newIndex => {
    setActiveIndex(
      newIndex >= data.length ? data.length - 1 : Math.max(newIndex, 0),
    );
    if (newIndex > unlockedIndex) {
      setUnlockedIndex(newIndex);
    }
  };
  const onFirstSlide = activeIndex === 0;
  const onLastSlide = activeIndex === data.length - 1;

  const handleButtonPress = () => {
    if (onLastSlide) {
      navigation.navigate('CourseContent', {courseId: courseId});
    } else {
      goToNextSlide();
    }
  };

  const goToNextSlide = () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex < data.length) {
      updateIndex(nextIndex);
    }
  };

  const goToPreviousSlide = () => {
    const previousIndex = activeIndex - 1;
    if (previousIndex >= 0) {
      updateIndex(previousIndex);
    }
  };

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
    return (
      <SafeAreaView
        style={
          darkMode
            ? tw`bg-secondary-9 h-100% justify-center items-center`
            : tw`h-100% justify-center items-center`
        }>
        <Warning size={50} color={darkMode ? '#898989' : '#EA9215'} />
        <Text
          style={
            darkMode
              ? tw`font-nokia-bold text-lg text-primary-1 text-center mt-4`
              : tw`font-nokia-bold text-lg text-accent-6 text-center mt-4`
          }>
          There seems to be a problem with the system or your internet
          connection.
        </Text>
        <TouchableOpacity
          onPress={refetch}
          style={tw`mt-4 px-8 py-2 border border-accent-6 rounded-full`}>
          <Text
            style={
              darkMode
                ? tw`font-nokia-bold text-lg text-primary-1 text-center`
                : tw`font-nokia-bold text-lg text-accent-6 text-center`
            }>
            Reload
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <FullScreenMenu
        isVisible={menuVisible}
        onClose={toggleMenu}
        chapterId={chapterId}
        courseId={courseId}
        updateIndex={updateIndex}
      />
      <ImageBackground
        source={require('./../../assets/bible6.jpeg')}
        style={tw`flex-1 p-2`}>
        <View
          style={[
            tw`absolute inset-0 bg-accent-9 bg-opacity-80`,
            darkMode ? tw`bg-secondary-9 bg-opacity-85` : null,
          ]}
        />
        <View style={tw`flex-1 justify-between pt-8 px-2`}>
          <View style={tw`flex-none`}>
            <View style={tw`flex flex-row items-center justify-between w-88%`}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <View style={tw`pr-2 border-r border-primary-1`}>
                  <Image
                    source={require('./../../assets/LogoSmall.png')}
                    style={tw`w-22 h-11`}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={tw`font-nokia-bold text-primary-1 text-sm flex-shrink`}>
                  {chapter.chapter}
                </Text>
              </View>
              <View style={tw`flex flex-row items-center gap-1`}>
                <Text style={tw`font-nokia-bold text-primary-1 text-lg`}>
                  {currentDataNumber}/{totalDataNumber}
                </Text>
                <TouchableOpacity onPress={toggleMenu}>
                  <DotsThreeOutlineVertical weight="fill" color="#EA9215" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`border-b border-accent-6 mt-2`} />
          </View>

          <ScrollView
            contentContainerStyle={tw` flex-grow justify-center pt-8 px-2`}
            showsVerticalScrollIndicator={false}>
            {data.map((slides, index) => {
              if (index === activeIndex) {
                return (
                  <>
                    <Text
                      style={tw`text-primary-1 text-3xl font-nokia-bold text-center mb-8`}>
                      {slides.slide}
                    </Text>
                    <View key={slides._id} style={tw`flex gap-4`}>
                      {slides.elements.map(element => {
                        switch (element.type) {
                          case 'title':
                            return (
                              <Title key={element._id} value={element.value} />
                            );
                          case 'sub':
                            return (
                              <Subtitle
                                key={element._id}
                                value={element.value}
                              />
                            );
                          case 'text':
                            return (
                              <TextComponent
                                key={element._id}
                                value={element.value}
                              />
                            );
                          case 'list':
                            return (
                              <List key={element._id} value={element.value} />
                            );
                          case 'slide':
                            return (
                              <Slide key={element._id} value={element.value} />
                            );
                          case 'img':
                            return (
                              <ImageComponent
                                key={element._id}
                                value={element.value}
                                toggleModal={toggleModal}
                                isModalVisible={isModalVisible}
                                isImageLoaded={isImageLoaded}
                                handleImageLoad={handleImageLoad}
                                darkMode={darkMode}
                              />
                            );
                          case 'quiz':
                            return (
                              <Quiz
                                key={element._id}
                                value={element.value}
                                selectedAnswer={selectedAnswer}
                                setSelectedAnswer={setSelectedAnswer}
                                isAnswerChecked={isAnswerChecked}
                                setIsAnswerChecked={setIsAnswerChecked}
                              />
                            );
                          case 'accordion':
                            return (
                              <Quiz
                                key={element._id}
                                value={element.value}
                                selectedAnswer={selectedAnswer}
                                setSelectedAnswer={setSelectedAnswer}
                                isAnswerChecked={isAnswerChecked}
                                setIsAnswerChecked={setIsAnswerChecked}
                              />
                            );
                          default:
                            return null;
                        }
                      })}
                    </View>
                  </>
                );
              }
            })}
          </ScrollView>
          <View style={tw`flex-none`}>
            <View style={tw`flex-row justify-between px-4 my-2`}>
              {!onFirstSlide && (
                <TouchableOpacity
                  style={tw`flex flex-row items-center bg-accent-6 px-4 rounded-full gap-2 h-10`}
                  onPress={goToPreviousSlide}>
                  <CaretCircleLeft size={18} weight="fill" color="white" />
                  <Text
                    style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                    Back
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={tw`flex flex-row items-center bg-accent-6 px-4 rounded-full gap-2 h-10 ${
                  onFirstSlide ? 'mx-auto' : ''
                }`}
                onPress={handleButtonPress}>
                <Text
                  style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                  {onLastSlide ? 'Exit Lesson' : 'ቀጥል'}
                </Text>
                <CaretCircleRight size={18} weight="fill" color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SlideSample2;
