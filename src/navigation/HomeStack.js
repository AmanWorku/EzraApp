import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './../screens/Home';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
