import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Devotion from './../screens/Devotion';
import AllDevotionals from './../screens/DevotionScreens/AllDevotionals';

const Stack = createNativeStackNavigator();

const DevotionalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DevotionalStack"
        component={Devotion}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllDevotionals"
        component={AllDevotionals}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default DevotionalStack;
