import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
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
  Warning,
  ArrowSquareUpRight,
} from 'phosphor-react-native';
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

  const devotional = devotionals.find(item => item._id === devotionalId) || {};

  const imageURI = `https://ezra-seminary.mybese.tech/images/${devotional.image}`;
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

  if (error) {
    return (
      <SafeAreaView
        style={
          darkMode
            ? tw`bg-secondary-9 h-100% justify-center items-center`
            : tw`h-100% justify-center items-center`
        }>
        <Warning size={50} color={darkMode ? '#898989' : '#EA9215'} />
        <Text
          style={
            darkMode
              ? tw`font-nokia-bold text-lg text-primary-1 text-center mt-4`
              : tw`font-nokia-bold text-lg text-accent-6 text-center mt-4`
          }>
          There seems to be a problem with the system or your internet
          connection.
        </Text>
        <TouchableOpacity
          onPress={refetch}
          style={tw`mt-4 px-8 py-2 border border-accent-6 rounded-full`}>
          <Text
            style={
              darkMode
                ? tw`font-nokia-bold text-lg text-primary-1 text-center`
                : tw`font-nokia-bold text-lg text-accent-6 text-center`
            }>
            Reload
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
              style={[
                tw`font-nokia-bold text-secondary-6 text-lg leading-tight`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              {devotional.verse}
            </Text>
          </View>
          <View style={tw`mt-2`}>
            {devotional.body.map((paragraph, paragraphIndex) => {
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
              {devotional.prayer}
            </Text>
          </View>
          <View
            style={tw`border border-accent-6 rounded-4 mt-4 overflow-hidden`}>
            <Image
              source={{
                uri: `https://ezra-seminary.mybese.tech/images/${devotional.image}`,
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
            {devotionals.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={tw`w-[47.5%] h-35 mb-4 rounded-2 overflow-hidden`}
                onPress={() =>
                  navigation.navigate('Devotional', {
                    screen: 'SelectedDevotional',
                    params: {devotionalId: item._id},
                  })
                }>
                <ImageBackground
                  source={{
                    uri: `https://ezra-seminary.mybese.tech/images/${item.image}`,
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

export default SelectedDevotional;
