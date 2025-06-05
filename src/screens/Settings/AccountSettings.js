import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import tw from './../../../tailwind';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser, deactivateAccount} from '../../redux/authSlice';
import {
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} from '../../redux/api-slices/apiSlice';
import {ArrowSquareLeft} from 'phosphor-react-native';

const AccountSettings = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const darkMode = useSelector(state => state.ui.darkMode);
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeactivate = () => {
    if (user && user.user && user.user._id) {
      Alert.alert(
        'Confirm Deactivation',
        'Are you sure you want to deactivate your account?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              try {
                await updateUserStatus({
                  id: user.user._id,
                  status: 'inactive',
                }).unwrap();
                dispatch(deactivateAccount());
                navigation.navigate('Login');
              } catch (error) {
                console.error('Error deactivating account:', error);
              }
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const handleDelete = () => {
    if (user && user.user && user.user._id) {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete your account? This action cannot be undone.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              try {
                await deleteUser(user.user._id).unwrap();
                dispatch(logoutUser());
                navigation.navigate('Login');
              } catch (error) {
                console.error('Error deleting account:', error);
              }
            },
          },
        ],
        {cancelable: false},
      );
    }
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`self-start`}>
            <ArrowSquareLeft weight="fill" color="#EA9215" size={32} />
          </TouchableOpacity>
          <Text
            style={[
              tw`font-nokia-bold text-2xl text-secondary-6 text-center mt-4`,
              darkMode ? tw`text-primary-1` : null,
            ]}>
            Account Settings
          </Text>
          <Text
            style={[
              tw`font-nokia-light text-sm text-secondary-6 text-center mt-2`,
              darkMode ? tw`text-primary-1` : null,
            ]}>
            Manage your account settings and preferences.
          </Text>
          <View style={tw`py-4 border-b border-accent-6 mt-8`}>
            <Text
              style={[
                tw`font-Lato-Bold text-lg text-secondary-6 mb-4`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              Deactivate Account
            </Text>
            <Text
              style={[
                tw`font-nokia-light text-sm text-secondary-6 mb-4`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              Deactivating your account will disable your profile and remove
              your access to the app. You can reactivate your account at any
              time by logging back in.
            </Text>
            <TouchableOpacity
              onPress={handleDeactivate}
              style={tw`w-full py-4 items-center bg-red-500 rounded-2`}>
              <Text style={tw`font-nokia-bold text-primary-1`}>
                Deactivate Account
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`py-4 border-b border-accent-6 mt-8`}>
            <Text
              style={[
                tw`font-Lato-Bold text-lg text-secondary-6 mb-4`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              Delete Account
            </Text>
            <Text
              style={[
                tw`font-nokia-light text-sm text-secondary-6 mb-4`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              Deleting your account will permanently remove your profile,
              settings, and all associated data. This action cannot be undone.
            </Text>
            <TouchableOpacity
              onPress={handleDelete}
              style={tw`w-full py-4 items-center bg-red-500 rounded-2`}>
              <Text style={tw`font-nokia-bold text-primary-1`}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountSettings;
