import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native';
import React from 'react';
import tw from './../../tailwind';
import {useSelector} from 'react-redux';

const Welcome = ({navigation}) => {
  const darkMode = useSelector(state => state.ui.darkMode);
  return (
    <SafeAreaView
      style={[
        tw`flex-1 justify-center items-center bg-primary-1`,
        darkMode ? tw`bg-secondary-9` : null,
      ]}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Image
          source={
            darkMode
              ? require('../assets/DarkLogo.png')
              : require('../assets/Logo.png')
          }
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        style={tw`border border-accent-6 mb-4 px-4 py-1 rounded-4`}
        onPress={() => navigation.navigate('Login')}>
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
