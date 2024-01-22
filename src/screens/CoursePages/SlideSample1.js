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
import {DotsThreeVertical} from 'phosphor-react-native';
const SlideSample1 = () => {
  StatusBar.setHidden(true);
  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        source={require('./../../assets/day4.jpeg')}
        style={tw`flex-1 p-2`}>
        <View style={tw`absolute inset-0 bg-accent-9 bg-opacity-70`} />
        <ScrollView contentContainerStyle={tw`flex-grow pt-8 px-2`}>
          <View style={tw`flex flex-row items-center justify-between`}>
            <View style={tw`flex flex-row items-center gap-3`}>
              <Image
                source={require('./../../assets/LogoSmall.png')}
                style={tw`w-22 h-11 border-r border-primary-1`}
                resizeMode="contain"
              />
              <View style={tw`border-r border-primary-1 h-[90%]`} />
              <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
                ክፍል ሦስት - የጥሞና ጥናት
              </Text>
            </View>
            <View style={tw`flex flex-row items-center gap-1`}>
              <Text style={tw`font-nokia-bold text-primary-1 text-lg`}>
                1/15
              </Text>
              <DotsThreeVertical weight="bold" style={tw`text-accent-6`} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SlideSample1;
