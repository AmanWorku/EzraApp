import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  List,
  User,
  BookOpenText,
  ArrowSquareUpRight,
  DownloadSimple,
  ShareNetwork,
  CaretCircleDown,
} from 'phosphor-react-native';
import tw from './../../tailwind';
const Course = () => {
  return (
    <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex flex-row justify-between my-4 text-secondary-6`}>
          <List size={32} weight="bold" style={tw`text-secondary-6`} />
          <Text style={tw`font-nokia-bold text-xl text-secondary-6`}>
            Course
          </Text>
          <User size={32} weight="bold" style={tw`text-secondary-6`} />
        </View>
        <View>
          <TextInput
            placeholder="Search courses..."
            style={tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold`}
          />
        </View>
        <View style={tw`flex flex-row justify-between mt-3 items-center`}>
          <Text style={tw`font-nokia-bold text-accent-6 text-lg`}>
            Popular Courses
          </Text>
          <View style={tw`flex flex-row justify-between items-center gap-2`}>
            <Text style={tw`font-nokia-bold text-accent-6 text-lg`}>
              Latest
            </Text>
            <CaretCircleDown size={24} weight="fill" color={'#EA9215'} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Course;
