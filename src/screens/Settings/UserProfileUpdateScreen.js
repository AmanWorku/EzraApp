import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useUpdateUserMutation} from '../../redux/api-slices/apiSlice';
import {updateUser} from '../../redux/authSlice';
import tw from './../../../tailwind';
import {
  ArrowSquareLeft,
  UserCircle,
  EnvelopeSimple,
  Lock,
  Eye,
} from 'phosphor-react-native';
import bible from '../../assets/bible.png';
import localStorage from 'redux-persist/es/storage';
import Toast from 'react-native-toast-message';

const UserProfileUpdateScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const darkMode = useSelector(state => state.ui.darkMode);
  const currentUser = useSelector(state => state.auth);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [updateUserMutation] = useUpdateUserMutation();

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName || '');
      setLastName(currentUser.lastName || '');
      setEmail(currentUser.email || '');
      setPassword(currentUser.password || '');
      setAvatarPreview(
        currentUser.avatar
          ? `https://ezra-seminary.mybese.tech/images/${currentUser.avatar}`
          : bible,
      );
    }
  }, [currentUser]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUpdateUser = async e => {
    e.preventDefault();

    if (currentUser) {
      if (
        firstName !== currentUser.firstName ||
        lastName !== currentUser.lastName ||
        email !== currentUser.email ||
        password
      ) {
        try {
          const formData = new FormData();
          formData.append('firstName', firstName);
          formData.append('lastName', lastName);
          formData.append('email', email);
          if (password) {
            formData.append('password', password);
          }

          const updatedUser = await updateUserMutation(formData).unwrap();
          Toast.success('Profile updated successfully!');
          // console.log("Mutation successful, updatedUser:", updatedUser);
          dispatch(updateUser(updatedUser));
          setFirstName(updatedUser.firstName);
          setLastName(updatedUser.lastName);
          setEmail(updatedUser.email);
          setPassword(updatedUser.password);
          setAvatarPreview(
            updatedUser.avatar
              ? `https://ezra-seminary.mybese.tech/images/${updatedUser.avatar}`
              : null,
          );

          // Save the updated user information to local storage
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
          if (
            typeof error === 'object' &&
            error !== null &&
            'status' in error &&
            'data' in error
          ) {
            const apiError = error;
            if (
              apiError.status === 400 &&
              apiError.data.message === 'Error uploading avatar'
            ) {
              console.error('Mutation failed:', error);
              Toast.error('Failed to upload avatar. Please try again.');
            } else {
              console.error('Mutation failed:', error);
              Toast.error('Failed to update profile. Please try again.');
            }
          } else {
            console.error('Mutation failed:', error);
            Toast.error('An unknown error occurred. Please try again.');
          }
        }
      }
    }
  };

  return (
    <SafeAreaView
      style={[
        tw`flex-1 items-center px-4 bg-primary-1`,
        darkMode && tw`bg-secondary-9`,
      ]}>
      <ScrollView
        style={tw`flex mx-auto w-[92%]`}
        showsVerticalScrollIndicator={false}>
        {currentUser && (
          <View style={tw`flex-col w-full justify-center items-center my-4`}>
            <Image
              style={tw`w-24 h-24 rounded-full border border-accent-6 my-2`}
              source={require('./../../assets/day1.jpeg')}
            />
            <Text
              style={[
                tw`font-nokia-bold text-lg text-secondary-6`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              {currentUser && currentUser.user && currentUser.user.firstName}
            </Text>
            <Text
              style={[
                tw`font-nokia-light text-sm text-secondary-6`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              {currentUser && currentUser.user && currentUser.user.email}
            </Text>
          </View>
        )}
        <View style={tw`flex flex-col gap-4`}>
          <View style={tw`flex flex-row mb-2 justify-between`}>
            <View
              style={[
                tw`flex flex-row items-center gap-2 w-48% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`,
                darkMode ? tw`bg-secondary-6` : null,
              ]}>
              <UserCircle
                size={20}
                style={[
                  tw`text-secondary-5`,
                  darkMode ? tw`text-primary-3` : null,
                ]}
              />
              <TextInput
                placeholder="First Name"
                keyboardType="default"
                value={firstName}
                onChangeText={setFirstName}
                style={[
                  tw`font-nokia-bold text-sm text-secondary-6 w-100%`,
                  darkMode ? tw`text-primary-3` : null,
                ]}
                placeholderTextColor={darkMode ? '#AAAAAA' : '#AAB0B4'}
              />
            </View>
            <View
              style={[
                tw`flex flex-row items-center gap-2 w-48% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`,
                darkMode ? tw`bg-secondary-6` : null,
              ]}>
              <UserCircle
                size={20}
                style={[
                  tw`text-secondary-5`,
                  darkMode ? tw`text-primary-3` : null,
                ]}
              />
              <TextInput
                placeholder="Last Name"
                keyboardType="default"
                value={lastName}
                onChangeText={setLastName}
                style={[
                  tw`font-nokia-bold text-sm text-secondary-6 w-100%`,
                  darkMode ? tw`text-primary-3` : null,
                ]}
                placeholderTextColor={darkMode ? '#AAAAAA' : '#AAB0B4'}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <View
              style={[
                tw`flex flex-row items-center gap-2 w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`,
                darkMode ? tw`bg-secondary-6` : null,
              ]}>
              <EnvelopeSimple
                size={20}
                style={[
                  tw`text-secondary-5`,
                  darkMode ? tw`text-primary-3` : null,
                ]}
              />
              <TextInput
                placeholder="Email address"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={[
                  tw`font-nokia-bold text-sm text-secondary-6 w-80%`,
                  darkMode ? tw`text-primary-3` : null,
                ]}
                placeholderTextColor={darkMode ? '#AAAAAA' : '#AAB0B4'}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <View
              style={[
                tw`flex flex-row items-center justify-between gap-2 w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`,
                darkMode ? tw`bg-secondary-6` : null,
              ]}>
              <View style={tw`flex flex-row items-center gap-2`}>
                <Lock
                  size={20}
                  style={[
                    tw`text-secondary-5`,
                    darkMode ? tw`text-primary-3` : null,
                  ]}
                />
                <TextInput
                  placeholder="Password"
                  secureTextEntry={showPassword}
                  keyboardType="default"
                  value={password}
                  onChangeText={setPassword}
                  style={[
                    tw`font-nokia-bold text-sm text-secondary-6 w-80%`,
                    darkMode ? tw`text-primary-3` : null,
                  ]}
                  placeholderTextColor={darkMode ? '#AAAAAA' : '#AAB0B4'}
                />
              </View>
              <TouchableOpacity onPress={toggleShowPassword}>
                <Eye
                  size={20}
                  style={[
                    tw`text-secondary-5`,
                    darkMode ? tw`text-primary-3` : null,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`mb-2`}>
            <View
              style={[
                tw`flex flex-row items-center justify-between gap-2 w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`,
                darkMode ? tw`bg-secondary-6` : null,
              ]}>
              <View style={tw`flex flex-row items-center gap-2`}>
                <Lock
                  size={20}
                  style={[
                    tw`text-secondary-5`,
                    darkMode ? tw`text-primary-3` : null,
                  ]}
                />
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={showConfirmPassword}
                  keyboardType="default"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={[
                    tw`font-nokia-bold text-sm text-secondary-6 w-80%`,
                    darkMode ? tw`text-primary-3` : null,
                  ]}
                  placeholderTextColor={darkMode ? '#AAAAAA' : '#AAB0B4'}
                />
              </View>
              <TouchableOpacity onPress={toggleShowConfirmPassword}>
                <Eye
                  size={20}
                  style={[
                    tw`text-secondary-5`,
                    darkMode ? tw`text-primary-3` : null,
                  ]}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={tw`w-100% py-4 items-center bg-accent-6 rounded-2 my-2`}
              onPress={handleSubmit}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={tw`font-Lato-Black text-primary-1`}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileUpdateScreen;
