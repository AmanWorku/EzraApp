import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InVerseQuarter from './../screens/InVerseScreens/InVerseQuarter';
import InVerse from '../screens/InVerse';
import InVerseWeek from '../screens/InVerseScreens/InVerseWeek';

const Stack = createNativeStackNavigator();

const InVerseStack = () => {
  return (
    <Stack.Navigator initialRouteName="InVerseHome">
      <Stack.Screen
        name="InVerseHome"
        component={InVerse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InVerseQuarter"
        component={InVerseQuarter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InVerseWeek"
        component={InVerseWeek}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default InVerseStack;
