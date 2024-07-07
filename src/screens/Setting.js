import React from 'react';
import {
  View,
  Text,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import tw from './../../tailwind';
import {useSelector, useDispatch} from 'react-redux';
import {toggleDarkMode} from '../redux/uiSlice';
import {logoutUser} from '../redux/authSlice';
import {
  ArrowCircleRight,
  Bell,
  DeviceMobile,
  Moon,
  Pencil,
  ShareNetwork,
} from 'phosphor-react-native';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);
  const user = useSelector(state => state.auth);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView
      style={[
        tw`flex-1 items-center px-4 bg-primary-1 justify-between`,
        darkMode && tw`bg-secondary-9`,
      ]}>
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
                      uri: `https://ezrabackend.online/images/${user.user.avatar}`,
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
            style={tw`flex-row w-full justify-between items-center`}>
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
            <Bell size={20} weight="fill" color={'#EA9215'} style={tw`mr-2`} />
            <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
              Enable Notifications
            </Text>
          </View>
          <Switch />
        </View>
        <View
          style={tw`flex-row w-full justify-between items-center py-4 border-b border-accent-6`}>
          <View style={tw`flex-row items-center`}>
            <Moon size={20} weight="fill" color={'#EA9215'} style={tw`mr-2`} />
            <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
              Dark Mode
            </Text>
          </View>
          <Switch onValueChange={handleToggle} value={darkMode} />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        style={[
          tw`w-36 flex justify-center self-center border border-red-500 rounded-full mb-8`,
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
    </SafeAreaView>
  );
};

export default Setting;
