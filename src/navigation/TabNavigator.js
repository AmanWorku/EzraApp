import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
// import Home from '../screens/Home';
// import Course from '../screens/Course';
// import Devotion from '../screens/Devotion';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Course" component={Course} />
      <Tab.Screen name="Devotion" component={Devotion} /> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
