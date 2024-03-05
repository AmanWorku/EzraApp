import React from 'react';
import {
  View,
  Text,
  Switch,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import tw from './../../tailwind';
import {useSelector, useDispatch} from 'react-redux';
import {toggleDarkMode} from '../redux/uiSlice';
import {logoutUser} from '../redux/authSlice'; // Import the logout action
import {
  ArrowCircleRight,
  Bell,
  DeviceMobile,
  Lock,
  Moon,
  Pencil,
  ShareNetwork,
} from 'phosphor-react-native';

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);
  const firstName = useSelector(state => state.auth.firstName);
  const lastName = useSelector(state => state.auth.lastName);
  const email = useSelector(state => state.auth.email);

  console.log(firstName + ' ' + lastName);

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
        tw`flex-1 items-center px-4 bg-primary-1`,
        darkMode && tw`bg-secondary-9`,
      ]}>
      <View style={tw`w-85%`}>
        <Text
          style={[
            tw`font-nokia-bold text-xl text-secondary-6 text-center mt-4`,
            darkMode ? tw`text-primary-1` : null,
          ]}>
          {' '}
          My Profile{' '}
        </Text>
        <View style={tw`flex-col w-full justify-center items-center my-4`}>
          <Image
            style={tw`w-24 h-24 rounded-full border border-accent-6 my-2`}
            source={require('./../assets/day1.jpeg')}
          />
          <Text
            style={[
              tw`font-nokia-bold text-lg text-secondary-6`,
              darkMode ? tw`text-primary-1` : null,
            ]}>
            {firstName}
          </Text>
        </View>

        <View style={tw` py-4 border-b border-accent-6`}>
          <TouchableOpacity
            style={tw`flex-row w-full justify-between items-center`}>
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
        <View style={tw` py-4 border-b border-accent-6`}>
          <TouchableOpacity
            style={tw`flex-row w-full justify-between items-center`}>
            <View style={tw`flex-row items-center`}>
              <Lock
                size={20}
                weight="fill"
                color={'#EA9215'}
                style={tw`mr-2`}
              />
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                Change Password
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
        <TouchableOpacity
          onPress={handleLogout}
          style={tw`w-36 flex justify-center self-center border border-red-500 rounded-full mt-8`}>
          <Text
            style={tw`text-center font-nokia-bold text-lg text-red-500 px-8 py-2 `}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
