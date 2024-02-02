import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Eye, Lock, UserCircle, EnvelopeSimple} from 'phosphor-react-native';
import tw from './../../tailwind';
import {useDispatch} from 'react-redux';
import {useSignupMutation} from '../redux/api-slices/apiSlice';
import {signup as signupUser} from '../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

const Signup = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [signupMutation, {isLoading, error}] = useSignupMutation();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage('');

    // Validate the input before sending the request
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage('Please fill in your first and last names.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const result = await signupMutation({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      AsyncStorage.setItem('user', JSON.stringify(result));

      dispatch(signupUser(result));
      console.log(result);
      navigation.navigate('Home');
    } catch (err) {
      if (err.status === 422) {
        setErrorMessage('This email is already taken.');
      } else {
        setErrorMessage('An error occurred during sign up. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <SafeAreaView
      style={[tw`flex-1 bg-primary-1`, darkMode ? tw`bg-secondary-9` : null]}>
      <ScrollView
        style={tw`flex mx-auto w-[92%]`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`my-8`}>
          <Text
            style={[
              tw`font-Lato-Black text-4xl text-secondary-6 w-80%`,
              darkMode ? tw`text-primary-3` : null,
            ]}>
            Create an account
          </Text>
          <Text
            style={[
              tw`font-Lato-Regular text-sm text-secondary-6`,
              darkMode ? tw`text-primary-3` : null,
            ]}>
            You will get to have your own profile and be able to track your
            progress with the courses you take.
          </Text>
        </View>
        {errorMessage.length > 0 && (
          <View style={tw`mb-4`}>
            <Text style={tw`text-red-500 font-Lato-Regular`}>
              {errorMessage}
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
          </View>
        </View>
        <Text
          style={[
            tw`py-2 font-Lato-Bold text-secondary-6`,
            darkMode ? tw`text-primary-3` : null,
          ]}>
          By clicking the Sign Up button, you agree to the public offer.
        </Text>
        <TouchableOpacity
          style={tw`w-100% py-4 items-center bg-accent-6 rounded-2 my-2`}
          onPress={handleSubmit}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={tw`font-Lato-Black text-primary-1`}>
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        <View style={tw`flex-row my-4 items-center mx-8`}>
          <View style={tw`flex-1 h-0.5 bg-secondary-3 mx-2`} />
          <Text
            style={[
              tw`font-Lato-Regular text-secondary-6`,
              darkMode ? tw`text-primary-3` : null,
            ]}>
            OR Sign up with
          </Text>
          <View style={tw`flex-1 h-0.5 bg-secondary-3 mx-2`} />
        </View>

        <View style={tw`flex flex-row justify-center items-center gap-2`}>
          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            style={tw`p-3 bg-accent-2 rounded-full border border-accent-6`}>
            <Image
              source={require('../assets/facebook.png')}
              style={tw`h-6 w-6`}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            style={tw`p-3 bg-accent-2 rounded-full border border-accent-6`}>
            <Image
              source={require('../assets/google.png')}
              style={tw`h-6 w-6`}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={tw`flex-row justify-center my-4`}>
          <Text
            style={[
              tw`font-Lato-Bold text-secondary-6 text-lg`,
              darkMode ? tw`text-primary-3` : null,
            ]}>
            Already have an account{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tw`font-Lato-Bold text-accent-6 text-lg`}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
