import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import handleDownload from '../../components/handleDownload';
import {handleShare} from '../../components/handleShare';
import {
  User,
  DownloadSimple,
  ShareNetwork,
  ArrowSquareLeft,
  ArrowSquareUpRight,
} from 'phosphor-react-native';
import ErrorScreen from '../../components/ErrorScreen';
import PreviousDevotions from './PreviousDevotions';
import HTMLView from 'react-native-htmlview';
import tw from './../../../tailwind';
import {useGetDevotionsQuery} from '../../redux/api-slices/apiSlice';

const SelectedDevotional = ({route}) => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const navigation = useNavigation();
  const {devotionalId} = route.params;
  const {
    data: devotionals = [],
    isFetching,
    error,
    refetch,
  } = useGetDevotionsQuery();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const scrollViewRef = useRef();
  const devotional = devotionals.find(item => item._id === devotionalId) || {};

  const tailwindStyles = StyleSheet.create({
    p: {
      ...(darkMode
        ? tw`text-primary-1 font-nokia-bold text-justify text-sm leading-snug`
        : tw`text-secondary-6 font-nokia-bold text-justify leading-snug`),
      marginVertical: -15,
    },
    a: {
      ...tw`text-accent-6 font-nokia-bold text-sm underline`,
    },
    h1: darkMode
      ? tw`text-primary-1 font-nokia-bold text-justify text-2xl leading-snug`
      : tw`text-secondary-6 font-nokia-bold text-justify text-2xl leading-snug`,
    h2: darkMode
      ? tw`text-primary-1 font-nokia-bold text-justify text-xl leading-snug`
      : tw`text-secondary-6 font-nokia-bold text-justify text-xl leading-snug`,
    h3: darkMode
      ? tw`text-primary-1 font-nokia-bold text-justify text-lg leading-snug`
      : tw`text-secondary-6 font-nokia-bold text-justify text-lg leading-snug`,
  });

  useEffect(() => {
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: false});
  }, [devotionalId]);

  const imageURI = `${devotional.image}`;
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

  if (error) {
    return <ErrorScreen refetch={refetch} darkMode={darkMode} />;
  }

  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <View style={tw`flex flex-row justify-between mt-4 mb-4`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowSquareLeft size={36} weight="fill" color={'#EA9215'} />
            </TouchableOpacity>
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
          <View style={tw`flex flex-row mt-6 justify-between`}>
            <View style={tw`w-70%`}>
              <Text
                style={[
                  tw`font-nokia-bold text-secondary-6 text-4xl leading-tight`,
                  darkMode ? tw`text-primary-1` : null,
                ]}>
                {devotional.title}
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
                {devotional.chapter}
              </Text>
            </View>
            <View
              style={tw`flex items-center justify-center border border-accent-6 p-2 rounded-4 w-20 h-20`}>
              <View
                style={tw`flex justify-center gap-[-1] bg-secondary-6 rounded-2 w-16 h-16`}>
                <Text style={tw`font-nokia-bold text-primary-1 text-center`}>
                  {devotional.month}
                </Text>
                <Text
                  style={tw`font-nokia-bold text-primary-1 text-4xl leading-tight text-center`}>
                  {devotional.day}
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
              selectable
              style={[
                tw`font-nokia-bold text-secondary-6 text-lg leading-tight`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              {devotional.verse}
            </Text>
          </View>
          <View style={tw`mt-6`}>
            <HTMLView value={devotional.body[0]} stylesheet={tailwindStyles} />
          </View>
          <View
            style={[
              tw`border border-accent-6 p-4 rounded-4 mt-4 bg-primary-4 shadow-sm mb-2`,
              darkMode ? tw`bg-secondary-8` : null,
            ]}>
            <Text
              style={tw`font-nokia-bold text-accent-6 text-sm leading-tight text-center`}>
              {devotional.prayer}
            </Text>
          </View>
          <View
            style={tw`border border-accent-6 rounded-4 mt-4 overflow-hidden`}>
            <Image
              source={{
                uri: `${devotional.image}`,
              }}
              style={tw`w-full h-96`}
              resizeMode="cover"
            />
            <View style={tw`flex flex-row gap-2 justify-center my-4`}>
              {/* Change TouchableOpacity to a View with conditional rendering */}

              <>
                <TouchableOpacity
                  style={tw`flex flex-row items-center gap-2 px-2 py-1 bg-accent-6 rounded-4`}
                  onPress={() => handleDownload(setIsDownloading, imageURI)}>
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
                  onPress={() => handleShare(setIsSharing, imageURI)}>
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
              </>
            </View>
          </View>
          <View style={tw`flex flex-row justify-between items-center mt-4`}>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-4 text-lg`,
                darkMode ? tw`text-primary-3` : null,
              ]}>
              Discover More
            </Text>
            <TouchableOpacity
              style={tw`border border-accent-6 px-4 py-1 rounded-4`}
              onPress={() =>
                navigation.navigate('Devotional', {
                  screen: 'AllDevotionals',
                })
              }>
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                All Devotionals
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row flex-wrap justify-between mt-4`}>
            <PreviousDevotions
              devotions={devotionals}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SelectedDevotional;
