import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from './../../tailwind';
import {useSelector} from 'react-redux';
import SSLHome from './SSLScreens/SSLHome';
import {List, User} from 'phosphor-react-native';

const SSL = ({navigation}) => {
  const darkMode = useSelector(state => state.ui.darkMode);
  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex flex-col mx-auto w-[92%]`}>
        <View style={tw`flex flex-row justify-between my-4`}>
          <View style={tw`border-b border-accent-6`}>
            <Text
              style={[
                tw`font-nokia-bold text-xl text-secondary-6 text-center`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              Sabbath School
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <User
              size={32}
              weight="bold"
              style={[
                tw`text-secondary-6`,
                darkMode ? tw`text-primary-1` : null,
              ]}
            />
          </TouchableOpacity>
        </View>
        <SSLHome />
      </SafeAreaView>
    </View>
  );
};

export default SSL;
