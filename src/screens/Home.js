import {View, Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native';
import React from 'react';
import Button from '../components/Button';
// import tw from 'nativewind';

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-1">
        <Text className="text-2xl text-accent-8">Home</Text>
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
});

export default Home;
