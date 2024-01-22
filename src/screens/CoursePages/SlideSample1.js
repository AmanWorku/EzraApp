import React from 'react';
import {
  Text,
  View,
  Image,
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
        <ScrollView contentContainerStyle={tw`flex-grow pt-3 px-2`}>
          <View style={tw`flex flex-row`}>
            <Image
              source={require('./../../assets/LogoSmall.png')}
              style={tw`w-24`}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SlideSample1;
