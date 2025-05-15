import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {BookOpenText} from 'phosphor-react-native';
import tw from './../../tailwind';

const DevotionCard = ({devotion, darkMode, navigation}) => {
  const verseText = devotion.verse;

  // Extract the verse content and reference
  const lastQuoteIndex = verseText.lastIndexOf('”'); // Find the last closing quote
  let verse = '';
  let reference = '';

  if (lastQuoteIndex !== -1) {
    // Separate the verse content and reference
    verse = verseText.substring(0, lastQuoteIndex + 1).trim(); // Everything up to the last closing quote
    reference = verseText.substring(lastQuoteIndex + 1).trim(); // Everything after the last closing quote
  } else {
    // If no quotes are found, treat the entire text as the verse
    verse = verseText;
  }

  return (
    <ImageBackground
      source={{uri: devotion.image}}
      style={[
        tw`border border-accent-6 mt-3 rounded-4 shadow-md px-4 py-4`,
        darkMode ? tw`bg-secondary-8` : null,
      ]}
      imageStyle={tw`rounded-4`}>
      <View style={tw`absolute inset-0 bg-black bg-opacity-60 rounded-4`} />
      <View style={tw`flex flex-row w-[100%] justify-between items-center`}>
        <View style={tw`flex flex-row items-center gap-2`}>
          <BookOpenText size={32} weight="bold" style={tw`text-accent-6`} />
          <Text
            style={[
              tw`text-primary-2 font-nokia-bold text-lg`,
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
            navigation.navigate('Devotional', {
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
            tw`font-nokia-bold text-xl text-primary-2 mt-4 `,
            darkMode ? tw`text-primary-2` : null,
          ]}>
          {verse}
        </Text>
        {reference && (
          <View style={tw`border-t border-accent-6 mt-4 pt-2 w-[50%]`}>
            <Text
              style={[
                tw`font-nokia-bold text-accent-6 text-lg leading-tight`,
                darkMode ? tw`text-accent-6` : null,
              ]}>
              {reference}
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default DevotionCard;
