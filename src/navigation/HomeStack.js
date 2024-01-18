import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Home from './Home';
import AnotherPage from './AnotherPage';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnotherPage"
        component={AnotherPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
