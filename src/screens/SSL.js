import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import tw from './../../tailwind';
import {useSelector} from 'react-redux';
import SSLHome from './SSLScreens/SSLHome';

const SSL = () => {
  const darkMode = useSelector(state => state.ui.darkMode);
  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex flex-col mx-auto w-[92%]`}>
        <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
          Explore quarterly lessons
        </Text>
        <Text
          style={[
            tw`font-nokia-bold text-secondary-6 text-xl`,
            darkMode ? tw`text-primary-1` : null,
          ]}>
          Lessons of previous quarters
        </Text>
        <SSLHome />
      </SafeAreaView>
    </View>
  );
};

export default SSL;
