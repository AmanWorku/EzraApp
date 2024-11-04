import React, {useMemo} from 'react';
import {View, TouchableOpacity, ImageBackground, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowSquareUpRight} from 'phosphor-react-native';
import tw from './../../../tailwind';
import {toEthiopian} from 'ethiopian-date';

const PreviousDevotions = ({devotions, darkMode}) => {
  const navigation = useNavigation();

  const ethiopianMonths = [
    '',
    'መስከረም',
    'ጥቅምት',
    'ህዳር',
    'ታህሳስ',
    'ጥር',
    'የካቲት',
    'መጋቢት',
    'ሚያዝያ',
    'ግንቦት',
    'ሰኔ',
    'ሐምሌ',
    'ነሐሴ',
    'ጳጉሜ',
  ];

  const previousDevotions = useMemo(() => {
    const today = new Date();
    const [year, month, day] = toEthiopian(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    );
    const ethiopianMonth = ethiopianMonths[month];
    return devotions
      .filter(
        devotion =>
          devotion.month === ethiopianMonth && Number(devotion.day) < day,
      )
      .sort((a, b) => Number(b.day) - Number(a.day))
      .slice(0, 4);
  }, [devotions]);

  return (
    <View style={tw`flex flex-row flex-wrap justify-between mt-4`}>
      {previousDevotions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={tw`w-[47.5%] h-35 mb-4 rounded-2 overflow-hidden`}
          onPress={() =>
            navigation.navigate('SelectedDevotional', {
              devotionalId: item._id,
            })
          }>
          <ImageBackground
            source={{uri: `${item.image}`}}
            style={tw`w-full h-full justify-end`}
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
  );
};

export default PreviousDevotions;
