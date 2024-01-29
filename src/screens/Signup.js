import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Eye, Lock, UserCircle} from 'phosphor-react-native';
import tw from './../../tailwind';

const icon = <FontAwesome6 name={'comments'} />;

const Signup = ({navigation}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  return (
    <SafeAreaView style={tw`flex-1 bg-primary-1`}>
      <ScrollView
        style={tw`flex mx-auto w-[92%]`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`my-8`}>
          <Text style={tw`font-nokia-bold text-6xl text-secondary-6 w-80%`}>
            Create an account
          </Text>
        </View>
        <View style={tw`flex flex-col gap-4`}>
          <View style={tw`mb-2`}>
            <View
              style={tw`flex flex-row items-center gap-2 w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`}>
              <UserCircle size={20} style={tw`text-secondary-5`} />
              <TextInput
                placeholder="Email address"
                keyboardType="email-address"
                style={tw`placeholder:text-secondary-5 font-nokia-bold text-sm`}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <View
              style={tw`flex flex-row items-center gap-2 w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`}>
              <Lock size={20} style={tw`text-secondary-5`} />
              <TextInput
                placeholder="Password"
                keyboardType="email-address"
                style={tw`placeholder:text-secondary-5 font-nokia-bold text-sm`}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <View
              style={tw`flex flex-row items-center gap-2 w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`}>
              <Lock size={20} style={tw`text-secondary-5`} />
              <TextInput
                placeholder="Confirm Password"
                keyboardType="email-address"
                style={tw`placeholder:text-secondary-3 font-nokia-bold text-sm`}
              />
            </View>
          </View>
        </View>
        <Text style={tw`py-2 font-Lato-Bold text-secondary-6`}>
          By clicking the Sign Up button, you agree to the public offer.
        </Text>
        <TouchableOpacity
          style={tw`w-100% py-4 items-center bg-accent-6 rounded-2 my-2`}
          onPress={() => navigation.navigate('MainTab')}>
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}>
            <Image
              source={require('../assets/facebook.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log('Pressed')}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}>
            <Image
              source={require('../assets/google.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22,
          }}>
          <Text style={{fontSize: 16, color: COLORS.black}}>
            Already have an account
          </Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
              }}>
              Login
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
