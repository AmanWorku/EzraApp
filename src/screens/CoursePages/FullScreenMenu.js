import React, {useState} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/core';
import {ActivityIndicator} from 'react-native';
// Screen dimensions to cover the full screen
const {width, height} = Dimensions.get('window');

const FullScreenMenu = ({isVisible, onClose}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const {courseId, chapterId} = route.params;
  const {data: courseData, error, isLoading} = useGetCourseByIdQuery(courseId);
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);
      return () => StatusBar.setHidden(false);
    }, []),
  );

  let chapter = courseData
    ? courseData.chapters.find(chap => chap._id === chapterId)
    : null;
  console.log(chapter);
  // If the chapter is not found, handle accordingly
  if (!chapter) {
    chapter = {slides: []}; // Fallback for chapter if not found
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

  const isSlideUnlocked = index => {
    return index <= unlockedIndex;
  };
  if (!isVisible) {
    return null;
  }

  // if (isLoading) {
  //   return (
  //     <SafeAreaView>
  //       <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
  //       <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
  //         Loading
  //       </Text>
  //     </SafeAreaView>
  //   );
  // }

  // if (error) {
  //   return (
  //     <SafeAreaView>
  //       <Text>Error: {error.message}</Text>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <View
      style={[styles.menuContainer, tw`flex-1 bg-opacity-95 bg-accent-11 p-4`]}>
      <View
        style={[
          styles.closeButton,
          tw` flex flex-row justify-between items-center`,
        ]}>
        <Text style={tw`font-nokia-bold text-primary-1 text-xl`}>
          {chapter.title}
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
        ይህ የፍሬያማ የመጽሐፍ ቅዱስ አጠናን ዘዴ ኮርስ ሦስተኛ ክፍል ሲሆን ከሰባቱ የመጽሐፍ ቅዱስ አጠናን ዘዴዎች አንዱ
        የሆነውን የጥሞናን ጥናት በዝርዝር ለማየት እንሞክራለን።
      </Text>
      <View style={tw`border-b border-primary-1 my-4`} />
      <View style={tw`flex flex-row gap-2 mb-2`}>
        <ListBullets size={24} weight="fill" color="#EA9215" />
        <Text style={tw`font-nokia-bold text-primary-1 text-sm `}>
          Slide 3/15
        </Text>
      </View>
      <ScrollView contentContainerStyle={tw`flex-grow justify-center`}>
        <TouchableOpacity>
          <View
            style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
            <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>መግቢያ</Text>
            <CheckCircle size={20} weight="fill" color={'#EA9215'} />
          </View>
          <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
            <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
              ዕዝራ የእግዚአብሔርን ሕግ በማጥናትና...
            </Text>
            <CheckCircle size={20} weight="fill" color={'#EA9215'} />
          </View>
          <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
            <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
              Quiz - Choose
            </Text>
            <CheckCircle size={20} weight="fill" color={'#EA9215'} />
          </View>
          <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
            <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
              ክፍል ሦስት- የጥሞና ጥናት
            </Text>
            <Circle size={20} color={'#EA9215'} />
          </View>
          <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
            <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
              ቃሉን በሕይወታችን የመለማመድ...
            </Text>
            <Circle size={20} color={'#EA9215'} />
          </View>
          <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
            <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
              ቃሉን በሕይወታችን አለመለማመድ
            </Text>
            <Circle size={20} color={'#EA9215'} />
          </View>
          <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
            <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
              Quiz - Choose
            </Text>
            <Circle size={20} color={'#EA9215'} />
          </View>
          <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
            <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
              ቃሉ የሚናገረውን አድርጉ እንጂ ሰሚዎች
            </Text>
            <Circle size={20} color={'#EA9215'} />
          </View>
          <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
            <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
              ቃሉን በሕይወታችን እንዳንለማመድ
            </Text>
            <Circle size={20} color={'#EA9215'} />
          </View>
          <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
            <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>መጸለይ</Text>
            <Circle size={20} color={'#EA9215'} />
          </View>
          <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
            <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
              ማሰላሰል
            </Text>
            <Circle size={20} color={'#EA9215'} />
          </View>
          <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
        </TouchableOpacity>
      </ScrollView>
      <View style={tw`flex-none`}>
        <TouchableOpacity
          style={tw`bg-accent-6 px-4 py-2 rounded-full w-36 my-2 mx-auto`}>
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
    // alignItems: 'flex-end',
    zIndex: 2,
  },
  closeButton: {
    marginTop: StatusBar.currentHeight || 40,
  },
});

export default FullScreenMenu;
