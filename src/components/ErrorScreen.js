import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import tw from './../../tailwind';
import {Warning} from 'phosphor-react-native';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

const ErrorScreen = ({refetch, darkMode}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReload = async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      Toast.show({
        type: 'info',
        text1: 'Internet Connection Required',
        text2: 'Please connect to the internet to reload data.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await refetch();
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={
          darkMode
            ? tw`bg-secondary-9 h-100% justify-center items-center`
            : tw`h-100% justify-center items-center`
        }>
        <ActivityIndicator
          size="large"
          color={darkMode ? '#898989' : '#EA9215'}
        />
        <Text
          style={
            darkMode
              ? tw`font-nokia-bold text-lg text-primary-1 text-center mt-4`
              : tw`font-nokia-bold text-lg text-accent-6 text-center mt-4`
          }>
          Reloading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
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
        onPress={handleReload}
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
};

export default ErrorScreen;
