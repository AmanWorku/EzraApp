import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Share,
  Linking,
  ScrollView,
  Alert,
  Modal,
  Button,
} from 'react-native';
import tw from './../../tailwind';
import {useSelector, useDispatch} from 'react-redux';
import {toggleDarkMode} from '../redux/uiSlice';
import {logoutUser} from '../redux/authSlice';
import {setLanguage} from '../redux/languageSlice';
import {
  ArrowCircleRight,
  Envelope,
  DeviceMobile,
  Moon,
  Pencil,
  ShareNetwork,
  UserCircle,
  Info,
  Globe,
} from 'phosphor-react-native';
import {useGetSSLsQuery} from '../services/SabbathSchoolApi';
import NotificationSettings from '../screens/Settings/NotificationSettings';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);
  const user = useSelector(state => state.auth);
  const language = useSelector(state => state.language.language);
  const [modalVisible, setModalVisible] = useState(false);
  const {refetch} = useGetSSLsQuery();

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate('Login');
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Check out this amazing app on the Google Play Store: https://play.google.com/store/apps/details?id=com.ezraapp&pcampaignid=web_share',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      console.error('Error sharing the app link:', error);
    }
  };

  const handleLinkPress = url => {
    Linking.openURL(url).catch(err =>
      console.error('Error opening link:', err),
    );
  };

  const handleLanguageChange = async value => {
    dispatch(setLanguage(value));
    setModalVisible(false);
    await refetch(); // Refetch data after changing the language
  };

  return (
    <SafeAreaView
      style={[
        tw`flex-1 items-center px-4 bg-primary-1 justify-between`,
        darkMode && tw`bg-secondary-9`,
      ]}>
      <ScrollView
        contentContainerStyle={tw`items-center`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`w-92%`}>
          <Text
            style={[
              tw`font-nokia-bold text-xl text-secondary-6 text-center mt-4`,
              darkMode ? tw`text-primary-1` : null,
            ]}>
            {' '}
            My Profile{' '}
          </Text>
          {user && (
            <View style={tw`flex-col w-full justify-center items-center my-4`}>
              <Image
                style={tw`w-24 h-24 rounded-full border border-accent-6 my-2`}
                source={
                  user && user.user && user.user.avatar
                    ? {
                        uri: `${user.user.avatar}`,
                      }
                    : require('./../assets/default-avatar.png') // replace with the actual path to your default avatar
                }
              />
              <Text
                style={[
                  tw`font-nokia-bold text-lg text-secondary-6`,
                  darkMode ? tw`text-primary-1` : null,
                ]}>
                {user && user.user && user.user.firstName}
              </Text>
              <Text
                style={[
                  tw`font-nokia-light text-sm text-secondary-6`,
                  darkMode ? tw`text-primary-1` : null,
                ]}>
                {user && user.user && user.user.email}
              </Text>
            </View>
          )}

          {user.user && (
            <View style={tw` py-4 border-b border-accent-6`}>
              <TouchableOpacity
                style={tw`flex-row w-full justify-between items-center`}
                onPress={() => navigation.navigate('EditProfile')}>
                <View style={tw`flex-row items-center`}>
                  <Pencil
                    size={20}
                    weight="fill"
                    color={'#EA9215'}
                    style={tw`mr-2`}
                  />
                  <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                    Edit Profile
                  </Text>
                </View>
                <ArrowCircleRight
                  size={24}
                  weight="fill"
                  color={'#EA9215'}
                  style={tw`mr-2`}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={tw`py-4 border-b border-accent-6`}>
            <TouchableOpacity
              style={tw`flex-row w-full justify-between items-center`}
              onPress={() => navigation.navigate('AppInfo')}>
              <View style={tw`flex-row items-center`}>
                <DeviceMobile
                  size={20}
                  weight="fill"
                  color={'#EA9215'}
                  style={tw`mr-2`}
                />
                <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                  App Information
                </Text>
              </View>
              <ArrowCircleRight
                size={24}
                weight="fill"
                color={'#EA9215'}
                style={tw`mr-2`}
              />
            </TouchableOpacity>
          </View>
          <View style={tw`py-4 border-b border-accent-6`}>
            <TouchableOpacity
              style={tw`flex-row w-full justify-between items-center`}
              onPress={handleShare}>
              <View style={tw`flex-row items-center`}>
                <ShareNetwork
                  size={20}
                  weight="fill"
                  color={'#EA9215'}
                  style={tw`mr-2`}
                />
                <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                  Share Application
                </Text>
              </View>
              <ArrowCircleRight
                size={24}
                weight="fill"
                color={'#EA9215'}
                style={tw`mr-2`}
              />
            </TouchableOpacity>
          </View>
          <View
            style={tw`flex-row w-full justify-between items-center py-4 border-b border-accent-6`}>
            <View style={tw`flex-row items-center`}>
              <Moon
                size={20}
                weight="fill"
                color={'#EA9215'}
                style={tw`mr-2`}
              />
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                Dark Mode
              </Text>
            </View>
            <Switch onValueChange={handleToggle} value={darkMode} />
          </View>
          <View style={tw`py-4 border-b border-accent-6`}>
            <TouchableOpacity
              style={tw`flex-row w-full justify-between items-center`}
              onPress={() => setModalVisible(true)}>
              <View style={tw`flex-row items-center`}>
                <Globe
                  size={20}
                  weight="fill"
                  color={'#EA9215'}
                  style={tw`mr-2`}
                />
                <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                  Language
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                  {' '}
                  {language === 'am' ? 'Amharic' : 'English'}{' '}
                </Text>
                <ArrowCircleRight
                  size={24}
                  weight="fill"
                  color={'#EA9215'}
                  style={tw`mr-2`}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={tw`py-4 border-b border-accent-6`}>
            <TouchableOpacity
              style={tw`flex-row w-full justify-between items-center`}
              onPress={() =>
                handleLinkPress('https://ezraseminary.org/contactUs')
              }>
              <View style={tw`flex-row items-center`}>
                <Envelope
                  size={20}
                  weight="fill"
                  color={'#EA9215'}
                  style={tw`mr-2`}
                />
                <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                  Contact Us
                </Text>
              </View>
              <ArrowCircleRight
                size={24}
                weight="fill"
                color={'#EA9215'}
                style={tw`mr-2`}
              />
            </TouchableOpacity>
          </View>
          <View style={tw`py-4 border-b border-accent-6`}>
            <TouchableOpacity
              style={tw`flex-row w-full justify-between items-center`}
              onPress={() =>
                handleLinkPress('https://ezraseminary.org/aboutUs')
              }>
              <View style={tw`flex-row items-center`}>
                <Info
                  size={20}
                  weight="fill"
                  color={'#EA9215'}
                  style={tw`mr-2`}
                />
                <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                  About Us
                </Text>
              </View>
              <ArrowCircleRight
                size={24}
                weight="fill"
                color={'#EA9215'}
                style={tw`mr-2`}
              />
            </TouchableOpacity>
          </View>
          {user.user && (
            <View style={tw` py-4 border-b border-accent-6`}>
              <TouchableOpacity
                style={tw`flex-row w-full justify-between items-center`}
                onPress={() => navigation.navigate('AccountSettings')}>
                <View style={tw`flex-row items-center`}>
                  <UserCircle
                    size={20}
                    weight="fill"
                    color={'#EA9215'}
                    style={tw`mr-2`}
                  />
                  <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                    Account Settings
                  </Text>
                </View>
                <ArrowCircleRight
                  size={24}
                  weight="fill"
                  color={'#EA9215'}
                  style={tw`mr-2`}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={tw`py-4 border-b border-accent-6`}>
            <NotificationSettings />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleLogout}
          style={[
            tw`w-36 flex justify-center self-center border border-red-500 rounded-full my-8`,
            user.user ? null : tw`border-accent-6 bg-accent-6`,
          ]}>
          <Text
            style={[
              tw`text-center font-nokia-bold text-lg text-red-500 px-8 py-2 `,
              user.user ? null : tw`text-primary-1`,
            ]}>
            {user.user ? 'Logout' : 'Login'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-primary-1 w-80 p-4 rounded-lg`}>
            <Text style={tw`font-nokia-bold text-lg text-center mb-4`}>
              Select Language
            </Text>
            <TouchableOpacity
              style={tw`py-2`}
              onPress={() => handleLanguageChange('am')}>
              <Text style={tw`font-nokia-bold text-accent-6 text-center`}>
                Amharic
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`py-2`}
              onPress={() => handleLanguageChange('en')}>
              <Text style={tw`font-nokia-bold text-accent-6 text-center`}>
                English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`py-2`}
              onPress={() => setModalVisible(false)}>
              <Text style={tw`font-nokia-bold text-red-500 text-center`}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Setting;
