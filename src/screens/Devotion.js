import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import handleDownload from '../components/handleDownload';
import {handleShare} from '../components/handleShare';
import {
  List,
  User,
  ArrowSquareUpRight,
  DownloadSimple,
  ShareNetwork,
} from 'phosphor-react-native';
import tw from './../../tailwind';
import {useGetDevotionsQuery} from '../redux/api-slices/apiSlice';
import {toEthiopian} from 'ethiopian-date';
import ErrorScreen from '../components/ErrorScreen';

const Devotion = () => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const navigation = useNavigation();
  const {data: devotions = [], isFetching, refetch} = useGetDevotionsQuery();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDevotion, setSelectedDevotion] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  const ethiopianMonths = [
    '', // There is no month 0
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
    'ጳጉሜ', // 13th month
  ];

  useEffect(() => {
    if (devotions && devotions.length > 0) {
      const today = new Date();
      const ethiopianDate = toEthiopian(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
      );
      const [year, month, day] = ethiopianDate;
      const ethiopianMonth = ethiopianMonths[month];
      const todaysDevotion = devotions.find(
        devotion =>
          devotion.month === ethiopianMonth && Number(devotion.day) === day,
      );
      setSelectedDevotion(todaysDevotion || devotions[0]);
    }
  }, [devotions]);

  useEffect(() => {
    refetch();
  }, [devotions, refetch]);

  if (!devotions || devotions.length === 0) {
    return <ErrorScreen />;
  }

  const devotionToDisplay = selectedDevotion || devotions[0];

  console.log(devotionToDisplay);

  const url = `${devotionToDisplay.image}`;

  if (isFetching) {
    return (
      <SafeAreaView style={darkMode ? tw`bg-secondary-9 h-100%` : null}>
        <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          Loading
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={['#EA9215']}
              tintColor="#EA9215"
            />
          }>
          <View style={tw`flex flex-row justify-between my-4`}>
            <View style={tw`border-b border-accent-6`}>
              <Text
                style={[
                  tw`font-nokia-bold text-xl text-secondary-6 text-center`,
                  darkMode ? tw`text-primary-1` : null,
                ]}>
                Devotional
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
          <View style={tw`flex flex-row mt-6 justify-between`}>
            <View style={tw`w-70%`}>
              <Text
                style={[
                  tw`font-nokia-bold text-secondary-6 text-4xl leading-tight`,
                  darkMode ? tw`text-primary-1` : null,
                ]}>
                {devotionToDisplay.title}
              </Text>
              <View style={tw`border-b border-accent-6 mb-1`} />
              <Text
                style={[
                  tw`font-nokia-bold text-secondary-6 text-sm`,
                  darkMode ? tw`text-primary-1` : null,
                ]}>
                የዕለቱ የመጽሐፍ ቅዱስ ንባብ ክፍል -
              </Text>
              <Text
                style={tw`font-nokia-bold text-accent-6 text-xl leading-tight`}>
                {devotionToDisplay.chapter}
              </Text>
            </View>
            <View
              style={tw`flex items-center justify-center border border-accent-6 p-2 rounded-4 w-20 h-20`}>
              <View
                style={tw`flex justify-center gap-[-1] bg-secondary-6 rounded-2 w-16 h-16`}>
                <Text style={tw`font-nokia-bold text-primary-1 text-center`}>
                  {devotionToDisplay.month}
                </Text>
                <Text
                  style={tw`font-nokia-bold text-primary-1 text-4xl leading-tight text-center`}>
                  {devotionToDisplay.day}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              tw`border border-accent-6 p-4 rounded-4 mt-4 bg-primary-5 shadow-lg`,
              darkMode ? tw`bg-secondary-8` : null,
            ]}>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-6 text-lg leading-tight`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              {devotionToDisplay.verse}
            </Text>
          </View>
          <View style={tw`mt-2`}>
            {devotionToDisplay.body.map((paragraph, paragraphIndex) => {
              return (
                <Text
                  style={[
                    tw`font-nokia-bold text-secondary-6 text-sm leading-snug text-justify my-2`,
                    darkMode ? tw`text-primary-1` : null,
                  ]}
                  key={paragraphIndex}>
                  {'  '}
                  {paragraph}
                </Text>
              );
            })}
          </View>
          <View
            style={[
              tw`border border-accent-6 p-4 rounded-4 mt-4 bg-primary-4 shadow-sm mb-2`,
              darkMode ? tw`bg-secondary-8` : null,
            ]}>
            <Text
              style={tw`font-nokia-bold text-accent-6 text-sm leading-tight text-center`}>
              {devotionToDisplay.prayer}
            </Text>
          </View>
          <View
            style={tw`border border-accent-6 rounded-4 mt-4 overflow-hidden`}>
            <Image
              source={{
                uri: `${devotionToDisplay.image}`,
              }}
              style={tw`w-full h-96`}
              resizeMode="cover"
            />
            <View style={tw`flex flex-row gap-2 justify-center my-4`}>
              <TouchableOpacity
                style={tw`flex flex-row items-center gap-2 px-2 py-1 bg-accent-6 rounded-4`}
                onPress={() => handleDownload(setIsDownloading, url)}>
                {isDownloading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Text style={tw`font-nokia-bold text-primary-1`}>
                      {' '}
                      ምስሉን አውርድ
                    </Text>
                    <DownloadSimple
                      size={28}
                      weight="bold"
                      style={tw`text-primary-1`}
                    />
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex flex-row items-center gap-2 px-2 py-1 bg-accent-6 rounded-4`}
                onPress={() => handleShare(setIsSharing, url)}>
                {isSharing ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Text style={tw`font-nokia-bold text-primary-1`}>
                      {' '}
                      ምስሉን አጋራ
                    </Text>
                    <ShareNetwork
                      size={28}
                      weight="bold"
                      style={tw`text-primary-1`}
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`border-b border-primary-7 mt-4 mb-4`} />
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-4 text-lg`,
                darkMode ? tw`text-primary-3` : null,
              ]}>
              Discover Devotionals
            </Text>
            <TouchableOpacity
              style={tw`border border-accent-6 px-4 py-1 rounded-4`}
              onPress={() => navigation.navigate('AllDevotionals')}>
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                All Devotionals
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row flex-wrap justify-between mt-4`}>
            {[...devotions].slice(0, 4).map((item, index) => (
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
                    uri: `${item.image}`,
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

export default Devotion;
