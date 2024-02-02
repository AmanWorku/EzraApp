import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Devotion from './../screens/Devotion';

const Stack = createNativeStackNavigator();

const DevotionalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DevotionalStack"
        component={Devotion}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default DevotionalStack;
