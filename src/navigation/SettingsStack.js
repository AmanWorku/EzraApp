import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Setting} from '../screens';

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsStack"
        component={Setting}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
