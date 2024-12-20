import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BookOpenText} from 'phosphor-react-native';
import tw from './../../tailwind';

const DevotionCard = ({devotion, darkMode, navigation}) => (
  <View
    style={[
      tw`border-2 border-accent-6 mt-6 rounded-4 bg-primary-6 shadow-lg px-4 py-4`,
      darkMode ? tw`bg-secondary-8` : null,
    ]}>
    <View style={tw`flex flex-row w-[100%] justify-between items-center`}>
      <View style={tw`flex flex-row items-center gap-2`}>
        <BookOpenText size={32} weight="bold" style={tw`text-accent-6`} />
        <Text
          style={[
            tw`text-secondary-6 font-nokia-bold text-lg`,
            darkMode ? tw`text-primary-2` : null,
          ]}>
          የዕለቱ ጥቅስ -
        </Text>
        <Text style={tw`text-accent-6 font-nokia-bold text-lg`}>
          {devotion.month} {devotion.day}
        </Text>
      </View>
      <TouchableOpacity
        style={tw`bg-accent-6 px-4 py-1 rounded-full`}
        onPress={() => {
          console.log('Navigating to SelectedDevotional');
          navigation.navigate('DevotionalHome', {
            screen: 'SelectedDevotional',
            params: {devotionalId: devotion._id},
          });
        }}>
        <Text style={tw`text-primary-1 font-nokia-bold text-sm`}>ክፈት</Text>
      </TouchableOpacity>
    </View>
    <View style={tw`border-b border-accent-6 mt-2 mb-1`} />
    <View>
      <Text
        style={[
          tw`font-nokia-bold text-lg text-secondary-6`,
          darkMode ? tw`text-primary-2` : null,
        ]}>
        {devotion.verse}
      </Text>
    </View>
  </View>
);

export default DevotionCard;
