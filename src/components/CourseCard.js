import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from './../../tailwind';

const CourseCard = ({course, darkMode, handleButtonPress}) => (
  <View style={tw`border border-accent-6 mt-4 rounded-4 p-2`}>
    <View style={tw`h-48`}>
      <Image
        source={{
          uri: `${course.image}`,
        }}
        style={tw`w-full h-full rounded-3`}
      />
    </View>
    <Text style={tw`font-nokia-bold text-accent-6 text-sm mt-2`}>
      {course.category}
    </Text>
    <Text
      style={[
        tw`font-nokia-bold text-secondary-6 text-2xl`,
        darkMode ? tw`text-primary-3` : null,
      ]}>
      {course.title}
    </Text>
    <TouchableOpacity
      style={tw`bg-accent-6 px-4 py-2 rounded-full w-36 mt-2`}
      onPress={() => {
        console.log('Navigating to CourseContent');
        handleButtonPress(course._id);
      }}>
      <Text style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
        ኮርሱን ክፈት
      </Text>
    </TouchableOpacity>
  </View>
);

export default CourseCard;
