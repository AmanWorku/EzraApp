import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Signup, Welcome} from './src/screens';
import {Provider, useSelector} from 'react-redux';
import store from './src/redux/store';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import ToastComponent from './src/components/ToastComponent';

const Stack = createNativeStackNavigator();

export default function App() {
  // const [isAuthLoading, setIsAuthLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const storedToken = await AsyncStorage.getItem('token');
  //       setIsAuthenticated(!!storedToken);
  //     } catch (e) {
  //       console.error('Failed to fetch the token from storage', e);
  //     } finally {
  //       setIsAuthLoading(false);
  //     }
  //   };

  //   checkToken();
  // }, []);

  // if (isAuthLoading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
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
          <Stack.Screen
            name="MainTab"
            component={MainTabNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <ToastComponent ref={ref => Toast.setRef(ref)} />
    </Provider>
  );
}
