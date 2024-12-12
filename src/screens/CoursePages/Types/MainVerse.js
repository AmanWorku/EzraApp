import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '../../../../tailwind';

const MainVerseSection = ({value}) => {
  return (
    <View style={tw`w-full flex flex-col items-center mt-4`}>
      <View
        style={tw`w-[100%] max-w-lg bg-secondary-6 bg-opacity-85 shadow-2xl px-4 py-6 rounded-lg my-2 border border-accent-6 relative`}>
        <Text
          style={tw`absolute top-[-1rem] self-center transform -translate-x-1/2 text-lg text-primary-2 bg-accent-8 px-4 py-1 rounded-md shadow-md font-nokia-bold`}>
          {value[0]}
        </Text>
        <Text
          style={tw`text-primary-2 text-lg leading-relaxed py-1 font-nokia-bold text-center`}>
          "{value[1]}"
        </Text>
      </View>
    </View>
  );
};

export default MainVerseSection;
