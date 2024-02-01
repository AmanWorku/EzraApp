import {View, Text} from 'react-native';
import React from 'react';
import tw from './../../tailwind';
import {useSelector} from 'react-redux';

const SSL = () => {
  const darkMode = useSelector(state => state.ui.darkMode);
  return (
    <View
      style={[
        tw`flex-1 items-center justify-center gap-2 bg-primary-1`,
        darkMode ? tw`bg-secondary-9` : null,
      ]}>
      <Text
        style={[
          tw`font-nokia-bold text-secondary-6 text-xl`,
          darkMode ? tw`text-primary-3` : null,
        ]}>
        Sabbath School Lesson
      </Text>
      <View style={tw`h-0.2 bg-accent-6 w-60%`} />
      <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
        Page Under Construction
      </Text>
    </View>
  );
};

export default SSL;
