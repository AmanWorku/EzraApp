import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './../screens/Home';
import DisplayCourse from './../screens/CoursePages/DisplayCourse';
import CourseContent from './../screens/CoursePages/CourseContent';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyHome"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DisplayCourse"
        component={DisplayCourse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CourseContent"
        component={CourseContent}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
