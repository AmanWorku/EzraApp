import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import tw from './../../tailwind';
import {Warning} from 'phosphor-react-native';

const ErrorScreen = ({refetch, darkMode}) => (
  <SafeAreaView
    style={
      darkMode
        ? tw`bg-secondary-9 h-100% justify-center items-center`
        : tw`h-100% justify-center items-center`
    }>
    <Warning size={50} color={darkMode ? '#898989' : '#EA9215'} />
    <Text
      style={
        darkMode
          ? tw`font-nokia-bold text-lg text-primary-1 text-center mt-4`
          : tw`font-nokia-bold text-lg text-accent-6 text-center mt-4`
      }>
      There seems to be a problem with the system or your internet connection.
    </Text>
    <TouchableOpacity
      onPress={refetch}
      style={tw`mt-4 px-8 py-2 border border-accent-6 rounded-full`}>
      <Text
        style={
          darkMode
            ? tw`font-nokia-bold text-lg text-primary-1 text-center`
            : tw`font-nokia-bold text-lg text-accent-6 text-center`
        }>
        Reload
      </Text>
    </TouchableOpacity>
  </SafeAreaView>
);

export default ErrorScreen;
