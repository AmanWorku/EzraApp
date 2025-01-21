import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Setting} from '../screens';
import UserProfileUpdateScreen from '../screens/Settings/UserProfileUpdateScreen';
import AppInfo from '../screens/Settings/AppInfo';
import AccountSettings from '../screens/Settings/AccountSettings';

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsStack"
        component={Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={UserProfileUpdateScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppInfo"
        component={AppInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
