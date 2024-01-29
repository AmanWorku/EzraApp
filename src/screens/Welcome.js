import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native';
import React from 'react';
import tw from './../../tailwind';

const Welcome = ({navigation}) => {
  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center bg-primary-1`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Image source={require('../assets/Logo.png')} style={styles.image} />
      </View>
      <TouchableOpacity
        style={tw`border border-accent-6 mb-4 px-4 py-1 rounded-4`}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={tw`font-nokia-bold text-lg text-accent-6`}>
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    aspectRatio: 1,
    width: '30%',
    height: '30%',
  },
});

export default Welcome;
