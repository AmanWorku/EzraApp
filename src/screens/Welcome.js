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
      <View style={{marginBottom: 10}}>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Signup')}
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
    width: '30%',
    height: '30%',
  },
});

export default Welcome;
