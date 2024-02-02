import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {List, User, ArrowSquareUpRight} from 'phosphor-react-native';
import tw from './../../../tailwind';
import {useGetDevotionsQuery} from './../../redux/api-slices/apiSlice';

const AllDevotionals = ({navigation}) => {
  const darkMode = useSelector(state => state.ui.darkMode);

  const {data: originalDevotionals = [], isFetching} = useGetDevotionsQuery();
  const [devotionals, setDevotionals] = useState(originalDevotionals);
  const [searchTerm, setSearchTerm] = useState('');

  if (isFetching) {
    return (
      <SafeAreaView style={darkMode ? tw`bg-secondary-9` : null}>
        <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          Loading
        </Text>
      </SafeAreaView>
    );
  }

  const handleSearch = term => {
    setSearchTerm(term);
    const filteredDevotionals = originalDevotionals.filter(devotion =>
      `${devotion.title} ${devotion.month} ${devotion.day}`
        .toLowerCase()
        .includes(term.toLowerCase()),
    );
    setDevotionals(filteredDevotionals);
  };

  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
              All Devotionals
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
              value={searchTerm}
              onChangeText={handleSearch}
            />
          </View>
          <View style={tw`flex flex-row flex-wrap justify-between mt-4`}>
            {devotionals.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={tw`w-[47.5%] h-35 mb-4 rounded-2 overflow-hidden`}
                onPress={() =>
                  navigation.navigate('SelectedDevotional', {
                    devotionalId: item._id,
                  })
                }>
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
                    <View style={tw`flex absolute bottom-0 left-0 my-2`}>
                      <Text style={tw`font-nokia-bold text-white text-lg mx-2`}>
                        {item.title}
                      </Text>
                      <Text
                        style={tw`font-nokia-bold text-white text-sm mx-2 text-accent-2`}>
                        {item.month} {item.day}
                      </Text>
                    </View>
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
