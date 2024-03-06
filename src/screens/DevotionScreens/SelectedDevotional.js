import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import {
  User,
  DownloadSimple,
  ShareNetwork,
  ArrowSquareLeft,
} from 'phosphor-react-native';
import tw from './../../../tailwind';
import {useGetDevotionsQuery} from '../../redux/api-slices/apiSlice';
import CameraRoll from '@react-native-community/cameraroll';
import Toast from 'react-native-toast-message';

const SelectedDevotional = ({route}) => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const navigation = useNavigation();
  const {devotionalId} = route.params;
  const {data: devotionals = [], isFetching} = useGetDevotionsQuery();
  const [isDownloading, setIsDownloading] = useState(false);

  const devotional = devotionals.find(item => item._id === devotionalId) || {};

  const handleDownload = async () => {
    try {
      setIsDownloading(true); // Set downloading state to true when download starts
      const url = `https://ezra-seminary.mybese.tech/images/${devotional.image}`;
      const result = await CameraRoll.save(url, {type: 'photo'});
      if (result) {
        console.log('File saved to:', result);
        Toast.show({
          type: 'success',
          text1: 'Image downloaded successfully!',
        });
      } else {
        console.log('Download failed.');
        Toast.show({
          type: 'error',
          text1: 'Unable to download image. Try again later.',
        });
      }
    } catch (error) {
      console.error('Error during save to camera roll:', error);
    } finally {
      setIsDownloading(false); // Set downloading state back to false when download finishes
    }
  };

  const handleShare = async () => {
    try {
      const imageURI = `https://ezra-seminary.mybese.tech/images/${devotional.image}`;
      const shareOptions = {
        title: 'Share Devotional',
        url: imageURI,
        type: 'image/png',
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error during sharing:', error);
    }
  };

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
                  onPress={handleDownload}>
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
                  onPress={handleShare}>
                  <Text style={tw`font-nokia-bold text-primary-1`}>
                    {' '}
                    ምስሉን አጋራ
                  </Text>
                  <ShareNetwork
                    size={28}
                    weight="bold"
                    style={tw`text-primary-1`}
                  />
                </TouchableOpacity>
              </>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SelectedDevotional;
