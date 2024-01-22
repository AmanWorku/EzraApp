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
import {DotsThreeOutlineVertical} from 'phosphor-react-native';
import {useFocusEffect} from '@react-navigation/native';

const SlideSample1 = () => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);
      return () => StatusBar.setHidden(false);
    }, []),
  );
  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        source={require('./../../assets/bible6.jpeg')}
        style={tw`flex-1 p-2`}>
        <View style={tw`absolute inset-0 bg-accent-9 bg-opacity-80`} />
        <ScrollView contentContainerStyle={tw`flex-grow pt-8 px-2`}>
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
                ክፍል ሦስት - የጥሞና ጥናት
              </Text>
            </View>
            <View style={tw`flex flex-row items-center gap-1`}>
              <Text style={tw`font-nokia-bold text-primary-1 text-lg`}>
                1/15
              </Text>
              <DotsThreeOutlineVertical weight="fill" color="#EA9215" />
            </View>
          </View>
          <View style={tw`border-b border-accent-6 mt-2`} />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SlideSample1;
