import {View, Text, ScrollView, SafeAreaView, TextInput} from 'react-native';
import React from 'react';
import {
  List,
  User,
  BookOpenText,
  ArrowSquareUpRight,
} from 'phosphor-react-native';
import tw from './../../tailwind';

const Devotion = () => {
  return (
    <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex flex-row justify-between my-4 text-secondary-6`}>
          <List size={32} weight="bold" style={tw`text-secondary-6`} />
          <Text style={tw`font-nokia-bold text-xl text-secondary-6`}>
            Devotional
          </Text>
          <User size={32} weight="bold" style={tw`text-secondary-6`} />
        </View>
        <View>
          <TextInput
            placeholder="Search devotionals..."
            style={tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold`}
          />
        </View>
        <View style={tw`flex flex-row`}>
          <View>
            <Text>ያከብረኛል</Text>
            <Text>የዕለቱ የመጽሐፍ ቅዱስ ንባብ ክፍል - </Text>
            <Text>መዝ 51:16-23</Text>
          </View>
          <View>
            <Text>ታህሳስ</Text>
            <Text>18</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Devotion;
