import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Course from './../screens/Course';
import DisplayCourse from './../screens/CoursePages/DisplayCourse';
import CourseContent from './../screens/CoursePages/CourseContent';

const Stack = createNativeStackNavigator();

const CourseStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CourseHome"
        component={Course}
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

export default CourseStack;
