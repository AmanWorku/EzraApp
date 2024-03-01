import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CourseStack from './CourseStack';
import HomeStack from './HomeStack';
import DevotionalStack from './DevotionalStack';
import SSLStack from './SSLStack';
import Setting from '../screens/Setting';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Course" component={CourseStack} />
      <Drawer.Screen name="Devotional" component={DevotionalStack} />
      <Drawer.Screen name="SSL" component={SSLStack} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
