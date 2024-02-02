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
import {Provider, useSelector} from 'react-redux';
import store from './src/redux/store';
import React from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const darkMode = useSelector(state => state.ui.darkMode);

  const tabBarStyle = {
    backgroundColor: darkMode ? '#293239' : '#F3F3F3',
  };

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
      <Tab.Screen name="SSL" component={SSL} />
      <Tab.Screen name="Devotional" component={DevotionalStack} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default function App() {
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
    </Provider>
  );
}
