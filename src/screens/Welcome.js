import {View, Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import React from 'react';
import Button from '../components/Button';

const Welcome = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.image} />
      </View>
      <View style={styles.flexContainer}>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Signup')}
          className="w-20"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    aspectRatio: 1,
    width: '25%',
    height: '25%',
  },
});

export default Welcome;
