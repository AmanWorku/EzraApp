import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SSLQuarter from './../screens/SSLScreens/SSLQuarter';
import SSL from '../screens/SSL';
import SSLWeek from '../screens/SSLScreens/SSLWeek';

const Stack = createNativeStackNavigator();

const SSLStack = () => {
  return (
    <Stack.Navigator initialRouteName="SSLHome">
      <Stack.Screen
        name="SSLHome"
        component={SSL}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SSLQuarter"
        component={SSLQuarter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SSLWeek"
        component={SSLWeek}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SSLStack;
