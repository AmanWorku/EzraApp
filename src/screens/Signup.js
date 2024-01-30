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

const Signup = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [signupMutation, {isLoading, error}] = useSignupMutation();
  const dispatch = useDispatch();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async e => {
    e.preventDefault();

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
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-primary-1`}>
      <ScrollView
        style={tw`flex mx-auto w-[92%]`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`my-8`}>
          <Text style={tw`font-Lato-Black text-4xl text-secondary-6 w-80%`}>
            Create an account
          </Text>
          <Text style={tw`font-Lato-Regular text-sm text-secondary-6`}>
            You will get to have your own profile and be able to track your
            progress with the courses you take.
          </Text>
        </View>
        <View style={tw`flex flex-col gap-4`}>
          <View style={tw`flex flex-row mb-2 justify-between`}>
            <View
              style={tw`flex flex-row items-center gap-2 w-48% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`}>
              <UserCircle size={20} style={tw`text-secondary-5`} />
              <TextInput
                placeholder="First Name"
                keyboardType="default"
                value={firstName}
                onChangeText={setFirstName}
                style={tw`placeholder:text-secondary-3 font-nokia-bold text-sm text-secondary-6`}
              />
            </View>
            <View
              style={tw`flex flex-row items-center gap-2 w-48% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`}>
              <UserCircle size={20} style={tw`text-secondary-5`} />
              <TextInput
                placeholder="Last Name"
                keyboardType="default"
                value={lastName}
                onChangeText={setLastName}
                style={tw`placeholder:text-secondary-3 font-nokia-bold text-sm text-secondary-6`}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <View
              style={tw`flex flex-row items-center gap-2 w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`}>
              <EnvelopeSimple size={20} style={tw`text-secondary-5`} />
              <TextInput
                placeholder="Email address"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={tw`placeholder:text-secondary-3 font-nokia-bold text-sm text-secondary-6`}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <View
              style={tw`flex flex-row items-center justify-between gap-2 w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`}>
              <View style={tw`flex flex-row items-center gap-2`}>
                <Lock size={20} style={tw`text-secondary-5`} />
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
                <Eye size={20} style={tw`text-secondary-4`} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`mb-2`}>
            <View
              style={tw`flex flex-row items-center justify-between gap-2 w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`}>
              <View style={tw`flex flex-row items-center gap-2`}>
                <Lock size={20} style={tw`text-secondary-5`} />
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={showConfirmPassword}
                  keyboardType="default"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={tw`placeholder:text-secondary-3 font-nokia-bold text-sm text-secondary-6`}
                />
              </View>
              <TouchableOpacity onPress={toggleShowConfirmPassword}>
                <Eye size={20} style={tw`text-secondary-4`} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={tw`py-2 font-Lato-Bold text-secondary-6`}>
          By clicking the Sign Up button, you agree to the public offer.
        </Text>
        <TouchableOpacity
          style={tw`w-100% py-4 items-center bg-accent-6 rounded-2 my-2`}
          onPress={handleSubmit}>
          <Text style={tw`font-Lato-Black text-primary-1 `}>
            Create Account
          </Text>
        </TouchableOpacity>

        <View style={tw`flex-row my-4 items-center mx-8`}>
          <View style={tw`flex-1 h-0.5 bg-secondary-3 mx-2`} />
          <Text style={tw`font-Lato-Regular text-secondary-6`}>
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
          <Text style={tw`font-Lato-Bold text-secondary-6 text-lg`}>
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
