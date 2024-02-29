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
  Dimensions,
  FlatList,
} from 'react-native';
import tw from './../../../tailwind';
import {
  CaretCircleLeft,
  CaretCircleRight,
  DotsThreeOutlineVertical,
} from 'phosphor-react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useGetCourseByIdQuery} from './../../services/api';
import {useNavigation, useRoute} from '@react-navigation/core';
import {ActivityIndicator} from 'react-native';
import FullScreenMenu from './FullScreenMenu';
import {useSelector} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Toast from 'react-native-toast-message';

const SlideSample2 = ({route}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndexCarousel, setActiveIndexCarousel] = useState(0);
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const navigation = useNavigation();
  const {courseId, chapterId} = route.params;
  const {data: courseData, error, isLoading} = useGetCourseByIdQuery(courseId);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const darkMode = useSelector(state => state.ui.darkMode);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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
      <SafeAreaView>
        <Text>Error: {error.message}</Text>
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
                  <View key={slides._id} style={tw`flex gap-4`}>
                    {slides.elements.map(element => {
                      if (element.type === 'title') {
                        return (
                          <Text
                            key={element._id}
                            style={tw`text-primary-1 text-3xl font-nokia-bold text-center`}>
                            {element.value}
                          </Text>
                        );
                      } else if (element.type === 'sub') {
                        return (
                          <Text
                            key={element._id}
                            style={tw`font-nokia-bold text-primary-1 text-lg text-center `}>
                            {element.value}
                          </Text>
                        );
                      } else if (element.type === 'text') {
                        return (
                          <Text
                            key={element._id}
                            style={tw`font-nokia-bold text-sm text-primary-1 text-justify leading-tight`}>
                            {'  '}
                            {element.value}
                          </Text>
                        );
                      } else if (element.type === 'list') {
                        return (
                          <ScrollView nestedScrollEnabled>
                            <FlatList
                              key={element._id}
                              data={element.value}
                              renderItem={({item}) => (
                                <Text
                                  style={tw`font-nokia-bold text-sm text-primary-1`}>
                                  {'\u2022 '}
                                  {item}
                                </Text>
                              )}
                            />
                          </ScrollView>
                        );
                      } else if (element.type === 'slide') {
                        return (
                          <View style={tw`items-center justify-center`}>
                            <Carousel
                              layout={'default'}
                              key={element._id}
                              data={element.value}
                              renderItem={({item}) => (
                                <View style={tw`items-center justify-center`}>
                                  <Text
                                    style={tw`font-nokia-bold text-sm text-primary-1 text-justify`}>
                                    {item}
                                  </Text>
                                </View>
                              )}
                              sliderWidth={Dimensions.get('window').width}
                              itemWidth={Dimensions.get('window').width - 100}
                              windowSize={1}
                              onSnapToItem={index =>
                                setActiveIndexCarousel(index)
                              }
                            />
                            <Pagination
                              dotsLength={element.value.length}
                              activeDotIndex={activeIndexCarousel}
                              containerStyle={tw`mt-2`}
                              dotStyle={tw`w-1.5 h-1.5 bg-primary-1`}
                              inactiveDotStyle={tw`bg-primary-1`}
                              inactiveDotOpacity={0.4}
                              inactiveDotScale={0.6}
                            />
                          </View>
                        );
                      } else if (element.type === 'img') {
                        return (
                          <Image
                            key={element._id}
                            source={{
                              uri: `https://ezra-seminary.mybese.tech/images/${element.value}`,
                            }}
                            style={tw`w-36 h-36`}
                          />
                        );
                      } else if (element.type === 'quiz') {
                        // Define functions outside of the conditional block
                        const handleAnswerSelection = answer => {
                          setSelectedAnswer(answer);
                        };

                        const checkAnswer = () => {
                          if (selectedAnswer === element.value.correctAnswer) {
                            return (
                              <Text style={tw`text-green-500`}>Correct!</Text>
                            );
                          } else {
                            return (
                              <Text style={tw`text-red-500`}>Incorrect!</Text>
                            );
                          }
                        };

                        return (
                          <View style={tw`items-center justify-center`}>
                            <Text
                              style={tw`font-nokia-bold text-lg text-primary-1 mb-4`}>
                              {element.value.question}
                            </Text>
                            <View
                              style={tw`flex flex-row justify-center flex-wrap gap-4`}>
                              {element.value.choices.map((choice, index) => (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => handleAnswerSelection(choice)}
                                  style={[
                                    tw`border border-primary-1 rounded-lg p-2 mb-2`,
                                    selectedAnswer === choice
                                      ? tw`bg-primary-2`
                                      : null,
                                  ]}
                                  disabled={selectedAnswer !== null}>
                                  <Text
                                    style={tw`font-nokia-bold text-sm text-primary-1`}>
                                    {choice.text}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                            <TouchableOpacity
                              onPress={checkAnswer}
                              style={[
                                tw`bg-primary-2 py-2 px-4 mt-4 rounded-lg`,
                                selectedAnswer === null
                                  ? tw`bg-gray-300`
                                  : null,
                              ]}
                              disabled={selectedAnswer === null}>
                              <Text
                                style={tw`font-nokia-bold text-sm text-white`}>
                                Check Answer
                              </Text>
                            </TouchableOpacity>
                            {selectedAnswer !== null && checkAnswer()}
                          </View>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </View>
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
