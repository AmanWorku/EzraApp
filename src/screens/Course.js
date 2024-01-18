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
  Star,
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
        <View style={tw`border border-accent-6 mt-4 rounded-4 p-2`}>
          <View style={tw`h-48`}>
            <Image
              source={require('./../assets/bible.png')}
              style={tw`w-full h-full rounded-3`}
            />
          </View>
          <Text style={tw`font-nokia-bold text-accent-6 text-xl mt-2`}>
            የአጠናን ዘዴዎች
          </Text>
          <Text style={tw`font-nokia-bold text-secondary-6 text-2xl`}>
            ፍሬያማ የመጽሃፍ ቅዱስ አጠናን ዘዴዎች
          </Text>
          <View style={tw`flex flex-row items-center justify-between`}>
            <TouchableOpacity
              style={tw`bg-accent-6 px-4 py-2 rounded-full w-36 mt-2`}>
              <Text
                style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                ኮርሱን ክፈት
              </Text>
            </TouchableOpacity>
            <View style={tw`flex flex-row items-center gap-1`}>
              <Text style={tw`font-nokia-bold text-accent-6 text-2xl `}>
                5.0
              </Text>
              <Star size={22} weight="fill" color={'#EA9215'} />
            </View>
          </View>
        </View>
        <View style={tw`border border-accent-6 mt-4 rounded-4 p-2`}>
          <View style={tw`h-48`}>
            <Image
              source={require('./../assets/bible.png')}
              style={tw`w-full h-full rounded-3`}
            />
          </View>
          <Text style={tw`font-nokia-bold text-accent-6 text-xl mt-2`}>
            የአጠናን ዘዴዎች
          </Text>
          <Text style={tw`font-nokia-bold text-secondary-6 text-2xl`}>
            ክርስቶስ እና ቤተክርስቲያን በአዲስ ኪዳን
          </Text>
          <View style={tw`flex flex-row items-center justify-between`}>
            <TouchableOpacity
              style={tw`bg-accent-6 px-4 py-2 rounded-full w-36 mt-2`}>
              <Text
                style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                ኮርሱን ክፈት
              </Text>
            </TouchableOpacity>
            <View style={tw`flex flex-row items-center gap-1`}>
              <Text style={tw`font-nokia-bold text-accent-6 text-2xl `}>
                5.0
              </Text>
              <Star size={22} weight="fill" color={'#EA9215'} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Course;
