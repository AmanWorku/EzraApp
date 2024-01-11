/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {User} from 'phosphor-react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary-1">
      <StatusBar className="bg-accent-6" />
      <View>
        <User className="self-center" weight="fill" color="#EA9215" />
        <Text className="text-2xl text-accent-6 font-nokia-light">
          እዝራ ሴሚናሪ
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
