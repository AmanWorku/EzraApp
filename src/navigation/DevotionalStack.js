import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Devotion from './../screens/Devotion';
import AllDevotionals from './../screens/DevotionScreens/AllDevotionals';
import SelectedDevotional from '../screens/DevotionScreens/SelectedDevotional';

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
      <Stack.Screen
        name="SelectedDevotional"
        component={SelectedDevotional}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default DevotionalStack;
