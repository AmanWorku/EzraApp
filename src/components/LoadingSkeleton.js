import React from 'react';
import {View, StyleSheet} from 'react-native';
import tw from './../../tailwind';

const LoadingSkeleton = () => {
  return (
    <View
      style={[
        styles.container,
        tw`py-4 rounded shadow-md w-60 sm:w-80 animate-pulse dark:bg-gray-900`,
      ]}>
      <View style={[tw`flex p-4 space-x-4 sm:px-8`]}>
        <View
          style={[tw`flex-shrink-0 w-16 h-16 rounded-full dark:bg-gray-700`]}
        />
        <View style={[tw`flex-1 py-2 space-y-4`]}>
          <View style={[tw`w-full h-3 rounded dark:bg-gray-700`]} />
          <View style={[tw`w-5/6 h-3 rounded dark:bg-gray-700`]} />
        </View>
      </View>
      <View style={[tw`p-4 space-y-4 sm:px-8`]}>
        <View style={[tw`w-full h-4 rounded dark:bg-gray-700`]} />
        <View style={[tw`w-full h-4 rounded dark:bg-gray-700`]} />
        <View style={[tw`w-3/4 h-4 rounded dark:bg-gray-700`]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
  },
});

export default LoadingSkeleton;
