import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Login, Signup, Welcome, Setting, SSL} from './src/screens';
import {
  House,
  Student,
  Cross,
  CalendarCheck,
  GearSix,
} from 'phosphor-react-native';
import CourseStack from './src/navigation/CourseStack';
import HomeStack from './src/navigation/HomeStack';
import DevotionalStack from './src/navigation/DevotionalStack';
import SSLStack from './src/navigation/SSLStack';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useSelector} from 'react-redux';
import {store, persistor} from './src/redux/store';
import React, {useEffect, useState} from 'react';
import {StatusBar, ActivityIndicator, Platform} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Toast from 'react-native-toast-message';
import ToastComponent from './src/components/ToastComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const darkMode = useSelector(state => state.ui.darkMode);

  const tabBarStyle = {
    backgroundColor: darkMode ? '#293239' : '#F3F3F3',
  };

  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(darkMode ? '#293239' : '#F1F1F1', true);
  }
  StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content', true);
  changeNavigationBarColor(darkMode ? '#293239' : '#F1F1F1', !darkMode, true);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconComponent;
          if (route.name === 'Home') {
            iconComponent = <House size={size} color={color} weight="fill" />;
          } else if (route.name === 'Course') {
            iconComponent = <Student size={size} color={color} weight="fill" />;
          } else if (route.name === 'SSL') {
            iconComponent = <Cross size={size} color={color} weight="fill" />;
          } else if (route.name === 'Devotional') {
            iconComponent = (
              <CalendarCheck size={size} color={color} weight="fill" />
            );
          } else if (route.name === 'Setting') {
            iconComponent = <GearSix size={size} color={color} weight="fill" />;
          }
          return iconComponent;
        },
        headerShown: false,
        tabBarActiveTintColor: '#EA9215',
        tabBarInactiveTintColor: darkMode ? '#D3D3D3' : '#3A4750',
        tabBarStyle: tabBarStyle,
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Course" component={CourseStack} />
      <Tab.Screen name="SSL" component={SSLStack} />
      <Tab.Screen name="Devotional" component={DevotionalStack} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isCheckingLoginStatus, setIsCheckingLoginStatus] = useState(true); // New State
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New State

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setIsAuthenticated(true); // If user details exist, consider them logged in
        }
      } catch (error) {
        console.error('Failed to get user details', error);
      }
      setIsCheckingLoginStatus(false); // Finished checking
    };

    checkLoginStatus();
  }, []);

  if (isCheckingLoginStatus) {
    return <ActivityIndicator />; // Render a loading indicator while checking
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isAuthenticated ? 'MainTab' : 'Login'}>
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
      </PersistGate>
      <ToastComponent ref={ref => Toast.setRef(ref)} />
    </Provider>
  );
}
