import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import tw from './../../tailwind';
import {useSelector} from 'react-redux';

const Welcome = ({navigation}) => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 1 second
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView
      style={[
        tw`flex-1 justify-center items-center bg-primary-1`,
        darkMode ? tw`bg-secondary-9` : null,
      ]}>
      <Animated.View
        style={{...tw`flex-1 justify-center items-center`, opacity: fadeAnim}}>
        <Image
          source={
            darkMode
              ? require('../assets/DarkLogo.png')
              : require('../assets/Logo.png')
          }
          style={styles.image}
        />
      </Animated.View>
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
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Welcome;
