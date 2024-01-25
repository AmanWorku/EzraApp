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
import Carousel from 'react-native-reanimated-carousel';

const SlideSample2 = ({route}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const navigation = useNavigation();
  const {courseId, chapterId} = route.params;
  const {data: courseData, error, isLoading} = useGetCourseByIdQuery(courseId);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const width = Dimensions.get('window').width;

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
        <View style={tw`absolute inset-0 bg-accent-9 bg-opacity-80`} />
        <View style={tw`flex-1 justify-between pt-8 px-2`}>
          <View style={tw`flex-none`}>
            <View style={tw`flex flex-row items-center justify-between`}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <View style={tw`pr-2 border-r border-primary-1`}>
                  <Image
                    source={require('./../../assets/LogoSmall.png')}
                    style={tw`w-22 h-11`}
                    resizeMode="contain"
                  />
                </View>
                <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
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
                      } else if (element.type === 'slide') {
                        return (
                          <Text>{element.value}</Text>
                          // <Carousel
                          //   loop
                          //   width={width}
                          //   height={width / 2}
                          //   autoPlay={true}
                          //   data={element.value}
                          //   scrollAnimationDuration={1000}
                          //   onSnapToItem={index =>
                          //     console.log('current index:', index)
                          //   }
                          //   renderItem={({index}) => (
                          //     <View
                          //       style={{
                          //         flex: 1,
                          //         borderWidth: 1,
                          //         justifyContent: 'center',
                          //       }}>
                          //       <Text
                          //         style={{textAlign: 'center', fontSize: 30}}>
                          //         {index}
                          //       </Text>
                          //     </View>
                          //   )}
                          // />
                        );
                      } else if (element.type === 'img') {
                        return (
                          <Image
                            key={element._id}
                            source={{
                              uri: `https://ezra-seminary-api.onrender.com/images/${element.value}`,
                            }}
                            style={tw`w-36 h-36`}
                          />
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
