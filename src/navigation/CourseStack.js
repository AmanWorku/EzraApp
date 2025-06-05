import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Course from './../screens/Course';
import DisplayCourse from './../screens/CoursePages/DisplayCourse';
import CourseContent from './../screens/CoursePages/CourseContent';
import SlideSample1 from './../screens/CoursePages/SlideSample1';
import SlideSample2 from './../screens/CoursePages/SlideSample2';

const Stack = createNativeStackNavigator();


const CourseStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        lazy: true,
      }}>
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
      <Stack.Screen
        name="SlideSample1"
        component={SlideSample1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SlideSample2"
        component={SlideSample2}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default CourseStack;
