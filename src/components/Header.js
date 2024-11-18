import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {User} from 'phosphor-react-native';
import tw from './../../tailwind';

const Header = ({darkMode, navigation}) => (
  <View style={tw`flex flex-row justify-between my-4`}>
    <View style={tw`border-b border-accent-6`}>
      <Text
        style={[
          tw`font-nokia-bold text-xl text-secondary-6 text-center`,
          darkMode ? tw`text-primary-1` : null,
        ]}>
        Home
      </Text>
    </View>
    <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
      <User
        size={32}
        weight="bold"
        style={[tw`text-secondary-6`, darkMode ? tw`text-primary-1` : null]}
      />
    </TouchableOpacity>
  </View>
);

export default Header;
