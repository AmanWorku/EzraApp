import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainTabNavigator from './MainTabNavigator';
import {Login, Signup, Welcome} from '../screens';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const isAuthReady = useSelector(state => state.auth.isAuthReady);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // Token found, navigate to MainTabNavigator
          navigation.navigate('Home'); // Navigate to a screen within the stack navigator
        } else {
          // No token found, navigate to Login screen
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Stack.Navigator>
      {isAuthReady ? (
        <Stack.Screen
          name="MainTab"
          component={MainTabNavigator} // Render the MainTabNavigator component
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
