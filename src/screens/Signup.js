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
import {Eye} from 'phosphor-react-native';
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
              style={tw`w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`}>
              <TextInput
                placeholder="Email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={tw`placeholder:text-secondary-3 font-nokia-bold text-sm`}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <View
              style={tw`w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`}>
              <TextInput
                placeholder="Email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={tw`placeholder:text-secondary-3 font-nokia-bold text-sm`}
              />
            </View>
          </View>
          <View style={tw`mb-2`}>
            <View
              style={tw`w-100% h-12 bg-primary-4 border border-secondary-3 rounded-2 px-4`}>
              <TextInput
                placeholder="Email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={tw`placeholder:text-secondary-3 font-nokia-bold text-sm`}
              />
            </View>
          </View>
        </View>

        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}>
            Password
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: '100%',
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}>
              <Eye size={20} weight="fill" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginBottom: 12}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}>
            Confirm Password
          </Text>

          <View
            style={{
              width: '100%',
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 22,
            }}>
            <TextInput
              placeholder="Confirm your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: '100%',
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}>
              <Eye size={20} weight="fill" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
          }}>
          <Text>I agree to the terms and conditions</Text>
        </View>

        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('MainTab')}
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
          <Text style={{fontSize: 14}}>Or Sign up with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
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
