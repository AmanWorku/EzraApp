import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import tw from './../../../tailwind';
import {useNavigation} from '@react-navigation/native';

const CourseContent = () => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`h-48`}>
          <ImageBackground
            source={require('./../../assets/bible2.jpeg')}
            style={tw`h-48 w-100%`}>
            <Text>Check</Text>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseContent;
