import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {
  House,
  Student,
  Cross,
  CalendarCheck,
  GearSix,
} from 'phosphor-react-native';
import CourseStack from './CourseStack';
import HomeStack from './HomeStack';
import DevotionalStack from './DevotionalStack';
import SSLStack from './SSLStack';
import Setting from '../screens/Setting'; // Import the Setting component

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
      <Tab.Screen name="SSL" component={SSLStack} />
      <Tab.Screen name="Devotional" component={DevotionalStack} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
