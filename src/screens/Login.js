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
import {Eye, Lock, UserCircle} from 'phosphor-react-native';
import tw from './../../tailwind';
import {useDispatch} from 'react-redux';
import {useLoginMutation} from '../redux/api-slices/apiSlice';
import {login as loginUser} from '../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [login, {isLoading, error}] = useLoginMutation();
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await login({email, password}).unwrap();
      console.log('Login Result:', result);
      if (result) {
        await AsyncStorage.setItem('user', JSON.stringify(result));
        dispatch(loginUser(result));
        navigation.navigate('MainTab');
      }
    } catch (err) {
      console.error('Login Error:', err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
              tw`font-nokia-bold text-3xl text-secondary-6`,
              darkMode ? tw`text-primary-3` : null,
            ]}>
            Welcome back!
          </Text>
          <Text
            style={[
              tw`font-nokia-bold text-sm text-secondary-4`,
              darkMode ? tw`text-primary-3` : null,
            ]}>
            Fill your credentials.
          </Text>
        </View>
        <View style={tw`flex flex-col gap-4`}>
          {error && (
            <Text style={tw`text-red-500 mb-2 font-Lato-Regular`}>
              Invalid email or password. Please try again.
            </Text>
          )}
          <View style={tw`mb-2`}>
            <View
              style={[
                tw`flex flex-row items-center gap-2 w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`,
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
                placeholder="Email address"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={tw`placeholder:text-secondary-5 font-nokia-bold text-sm`}
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
                  style={tw`placeholder:text-secondary-3 font-nokia-bold text-sm text-secondary-6`}
                />
              </View>
              <TouchableOpacity onPress={toggleShowPassword}>
                <Eye
                  size={20}
                  style={[
                    tw`text-secondary-4`,
                    darkMode ? tw`text-primary-3` : null,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={tw`py-2 font-Lato-Bold text-accent-6 text-right`}>
          Forgot Password?
        </Text>
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

        <View style={tw`flex-row my-4 items-center mx-8`}>
          <View style={tw`flex-1 h-0.5 bg-secondary-3 mx-2`} />
          <Text
            style={[
              tw`font-Lato-Regular text-secondary-6`,
              darkMode ? tw`text-primary-3` : null,
            ]}>
            OR continue with
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
            onPress={() => console.log('Pressed')}
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
            Don't have an account{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={tw`font-Lato-Bold text-accent-6 text-lg`}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
