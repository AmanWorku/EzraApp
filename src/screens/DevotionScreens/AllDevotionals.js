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
import {useSelector} from 'react-redux';
import {List, User, ArrowSquareUpRight} from 'phosphor-react-native';
import tw from './../../../tailwind';
import {useGetDevotionsQuery} from './../../redux/api-slices/apiSlice';

const AllDevotionals = () => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const {data: devotionals = [], isFetching} = useGetDevotionsQuery();
  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`flex flex-row flex-wrap justify-between mt-4`}>
            <View style={tw`flex flex-row justify-between my-4`}>
              <List
                size={32}
                weight="bold"
                style={[
                  tw`text-secondary-6`,
                  darkMode ? tw`text-primary-1` : null,
                ]}
              />
              <Text
                style={[
                  tw`font-nokia-bold text-xl text-secondary-6`,
                  darkMode ? tw`text-primary-1` : null,
                ]}>
                Devotional
              </Text>
              <User
                size={32}
                weight="bold"
                style={[
                  tw`text-secondary-6`,
                  darkMode ? tw`text-primary-1` : null,
                ]}
              />
            </View>
            <View>
              <TextInput
                placeholder="Search devotionals..."
                style={[
                  tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold`,
                  darkMode ? tw`text-primary-1` : null,
                ]}
                placeholderTextColor={darkMode ? '#898989' : '#AAB0B4'}
              />
            </View>
            {devotionals.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={tw`w-[47.5%] h-35 mb-4 rounded-2 overflow-hidden`}>
                <ImageBackground
                  source={{
                    uri: `https://ezra-seminary-api.onrender.com/images/${item.image}`,
                  }}
                  style={tw`w-full h-full justify-end `}
                  imageStyle={tw`rounded-lg`}>
                  <View
                    style={[
                      tw`absolute inset-0 bg-accent-10 bg-opacity-60 rounded-lg`,
                      darkMode ? tw`bg-accent-11 bg-opacity-70` : null,
                    ]}>
                    <ArrowSquareUpRight
                      size={32}
                      weight="fill"
                      style={tw`text-white self-end m-2`}
                      color="#F8F8F8"
                    />
                    <Text
                      style={tw`font-nokia-bold text-white text-lg m-2 absolute bottom-0 left-0`}>
                      {item.month} {item.day}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AllDevotionals;
