import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
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
} from 'phosphor-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setProgress} from '../../redux/authSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useGetCourseByIdQuery} from './../../services/api';
import {useNavigation} from '@react-navigation/core';
import {ActivityIndicator} from 'react-native';
import FullScreenMenu from './FullScreenMenu';
import {selectCurrentUser} from '../../redux/authSlice';
import List from './Types/List';
import Slide from './Types/Slide';
import Quiz from './Types/Quiz';
import Subtitle from './Types/Subtitle';
import TextComponent from './Types/Text';
import ImageComponent from './Types/Image';
import Title from './Types/Title';
import Sequence from './Types/Sequence';
import AccordionComponent from './Types/AccordionComponent';
import ErrorScreen from '../../components/ErrorScreen';
import Reveal from './Types/Reveal';
import Range from './Types/Range';
import DND from './Types/DND';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import VideoPlayer from './Types/Video';
import AudioPlayer from './Types/Audio';
import Toast from 'react-native-toast-message';
import ScrollMix from './Types/ScrollMix';

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
  const [progressLoading, setProgressLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [isSlideComplete, setIsSlideComplete] = useState(false);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const [isVideoPlayed, setIsVideoPlayed] = useState(false);
  const [isAudioPlayed, setIsAudioPlayed] = useState(false);
  const [isRevealComplete, setIsRevealComplete] = useState(false);
  const [isRangeComplete, setIsRangeComplete] = useState(false);
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser !== null) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Error retrieving user from AsyncStorage:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    setIsNextButtonVisible(false);
    // Reset all interaction states for the new slide
    setIsSlideComplete(false);
    setIsSequenceComplete(false);
    setIsAccordionExpanded(false);
    setIsVideoPlayed(false);
    setIsAudioPlayed(false);
    setIsRevealComplete(false);
    setIsRangeComplete(false);
    setIsAnswerChecked(false);

    // Additional logic to check if the slide is non-interactive
    const nonInteractiveTypes = ['title', 'sub', 'text', 'img', 'mix', 'list'];
    const allNonInteractive = data[activeIndex]?.elements.every(element =>
      nonInteractiveTypes.includes(element.type),
    );

    if (allNonInteractive) {
      setIsSlideComplete(true);
      setIsNextButtonVisible(true); // Automatically show the "Next" button if all elements are non-interactive
    }
  }, [activeIndex]);

  useEffect(() => {
    const shouldShowButton =
      (!onLastSlide && isSlideComplete) ||
      isSequenceComplete ||
      isAccordionExpanded ||
      isVideoPlayed ||
      isAudioPlayed ||
      isRevealComplete ||
      isRangeComplete ||
      isAnswerChecked;

    if (onLastSlide) {
      setIsNextButtonVisible(true);
    } else if (shouldShowButton !== isNextButtonVisible) {
      setIsNextButtonVisible(shouldShowButton);
    }
  }, [
    isSlideComplete,
    isSequenceComplete,
    isAccordionExpanded,
    isVideoPlayed,
    isAudioPlayed,
    isRevealComplete,
    isRangeComplete,
    isAnswerChecked,
    onLastSlide,
    isNextButtonVisible,
  ]);

  const chapter = courseData?.chapters.find(chap => chap._id === chapterId);
  const chapterIndex = courseData?.chapters.findIndex(
    chap => chap._id === chapterId,
  );
  // If the chapter is not found, handle accordingly
  if (!chapter) {
    return <p>Chapter not found</p>;
  }

  // Setting the data to slides if the chapter is found
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
    updateProgress();
  };
  const onFirstSlide = activeIndex === 0;
  const onLastSlide = activeIndex === data.length - 1;

  const handleButtonPress = () => {
    if (onLastSlide) {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          if (currentUser) {
            submitProgress();
          } else {
            Toast.show({
              type: 'info',
              text1: 'Login Required',
              text2: 'Login or create an account to save your progress.',
            });
            navigation.navigate('CourseContent', {courseId: courseId});
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'No Internet Connection',
            text2:
              'Progress is not saved because there is no internet connection.',
          });
          navigation.navigate('CourseContent', {courseId: courseId});
        }
      });
    } else {
      setIsNextButtonVisible(false);
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

  const courseID = courseData && courseData._id ? courseData._id : '';

  const updateProgress = () => {
    if (chapterIndex !== undefined && chapterIndex !== -1) {
      dispatch(
        setProgress({
          courseId: courseID,
          currentChapter: chapterIndex,
          currentSlide: activeIndex,
        }),
      );
    }
  };

  const submitProgress = async () => {
    try {
      setProgressLoading(true);
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      // Update the progress in the Redux store
      dispatch(
        setProgress({
          courseId,
          currentChapter: chapterIndex,
          currentSlide: activeIndex,
        }),
      );
      // Send the updated progress to the server
      const response = await axios.put(
        `https://ezrabackend.online/users/profile/${currentUser._id}`,
        {
          userId: currentUser._id,
          progress: currentUser.progress,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Progress updated successfully:', response.data);
      setProgressLoading(false);

      navigation.navigate('Course', {
        screen: 'CourseContent',
        params: {courseId: courseId},
      });
    } catch (err) {
      console.error('Error updating progress:', err.message);
      setProgressLoading(false);
    }
  };
  if (progressLoading) {
    return (
      <View
        style={[
          tw`flex-1 items-center justify-center bg-primary-1`,
          darkMode ? tw`bg-secondary-9` : null,
        ]}>
        <ActivityIndicator size="large" color="#EA9215" />
        <Text style={tw`font-nokia-bold text-accent-6 text-xl`}>Saving</Text>
      </View>
    );
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
    <View style={tw`flex-1`}>
      <FullScreenMenu
        isVisible={menuVisible}
        onClose={toggleMenu}
        chapterId={chapterId}
        courseId={courseId}
        updateIndex={updateIndex}
        unlockedIndex={unlockedIndex}
        activeIndex={activeIndex}
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
        <View style={tw`h-100% justify-between pt-8 px-2`}>
          <View style={tw`flex-none`}>
            <View style={tw`flex flex-row items-center justify-between w-auto`}>
              <View style={tw`flex flex-row items-center gap-2`}>
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
                  style={tw`font-nokia-bold text-primary-1 text-sm flex-shrink w-[57%]`}>
                  {chapter.chapter}
                </Text>
              </View>
              <View style={tw`flex flex-row items-center gap-1 mr-2`}>
                <Text style={tw`font-nokia-bold text-primary-1 text-lg`}>
                  {currentDataNumber}/{totalDataNumber}
                </Text>
                <TouchableOpacity onPress={toggleMenu} style={tw`self-end`}>
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
                        // console.log(element);
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
                          case 'mix':
                            return (
                              <ScrollMix
                                key={element._id}
                                value={element.value}
                                toggleModal={toggleModal}
                                isModalVisible={isModalVisible}
                                isImageLoaded={isImageLoaded}
                                handleImageLoad={handleImageLoad}
                                darkMode={darkMode}
                              />
                            );
                          case 'list':
                            return (
                              <List key={element._id} value={element.value} />
                            );
                          case 'slide':
                            return (
                              <Slide
                                key={element._id}
                                value={element.value}
                                setIsSlideComplete={setIsSlideComplete}
                              />
                            );
                          case 'sequence':
                            return (
                              <Sequence
                                key={element._id}
                                value={element.value}
                                setIsSequenceComplete={setIsSequenceComplete}
                              />
                            );
                          case 'reveal':
                            return (
                              <Reveal
                                key={element._id}
                                value={element.value}
                                setIsRevealComplete={setIsRevealComplete}
                              />
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
                                setIsAnswerChecked={setIsAnswerChecked}
                              />
                            );
                          case 'accordion':
                            return (
                              <AccordionComponent
                                key={element._id}
                                value={element.value}
                                setIsAccordionExpanded={setIsAccordionExpanded}
                              />
                            );
                          case 'range':
                            return (
                              <Range
                                key={element._id}
                                setIsRangeComplete={setIsRangeComplete}
                              />
                            );
                          case 'video':
                            return (
                              <VideoPlayer
                                key={element._id}
                                value={element.value}
                                setIsVideoPlayed={setIsVideoPlayed}
                              />
                            );
                          case 'audio':
                            return (
                              <AudioPlayer
                                key={element._id}
                                value={`${element.value}`}
                                setIsAudioPlayed={setIsAudioPlayed}
                              />
                            );
                          case 'dnd':
                            return (
                              <GestureHandlerRootView style={{flex: 1}}>
                                <DND
                                  key={element._id}
                                  value={element.value}
                                  selectedAnswer={selectedAnswer}
                                  setSelectedAnswer={setSelectedAnswer}
                                  isAnswerChecked={isAnswerChecked}
                                  setIsAnswerChecked={setIsAnswerChecked}
                                />
                              </GestureHandlerRootView>
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
          <View style={tw`border-b border-accent-6 mt-2`} />
          <View style={tw`flex-none`}>
            <View style={tw`flex-row justify-between px-4 my-2`}>
              {!onFirstSlide && (
                <TouchableOpacity
                  style={tw`flex flex-row items-center bg-accent-6 px-4 rounded-full gap-2 h-10`}
                  onPress={goToPreviousSlide}>
                  <CaretCircleLeft size={18} weight="fill" color="white" />
                  <Text
                    style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                    ተመለስ
                  </Text>
                </TouchableOpacity>
              )}

              {isNextButtonVisible && (
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
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SlideSample2;
