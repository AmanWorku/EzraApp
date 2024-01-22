import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  StatusBar,
} from 'react-native';
import tw from './../../../tailwind';
const SlideSample1 = () => {
  StatusBar.setHidden(true);
  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        source={require('./../../assets/day4.jpeg')}
        style={tw`flex-1 p-2`}>
        <View style={tw`absolute inset-0 bg-accent-9 bg-opacity-70`} />

        <ScrollView contentContainerStyle={tw`flex-grow`}>
          <Text style={tw`font-nokia-bold mt-22 text-primary-1 text-lg`}>
            ታህሳስ 16
          </Text>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SlideSample1;
