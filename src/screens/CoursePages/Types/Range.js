import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import tw from '../../../../tailwind';

const Range = () => {
  const [value, setValue] = useState(value ?? 0);
  return (
    <View style={tw`flex-1 justify-center items-center w-100%`}>
      <View style={tw`bg-primary-1 rounded`}>
        <Text style={tw` font-nokia-bold text-accent-6  px-2 text-3xl`}>
          {value}
        </Text>
      </View>
      <Slider
        style={tw`w-90%`}
        step={1}
        minimumValue={0}
        maximumValue={5}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#EA9215"
        tapToSeek={true}
        value={value}
        onValueChange={setValue}
      />
      <View style={tw`flex flex-row justify-between w-100%`}>
        <Text style={tw`font-nokia-bold text-primary-1`}>ምንም አልተማርኩም</Text>
        <Text style={tw`font-nokia-bold text-primary-1`}>በጣም ተምሪያለሁ</Text>
      </View>
    </View>
  );
};

export default Range;
