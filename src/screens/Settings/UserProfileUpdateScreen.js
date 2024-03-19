import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Switch,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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

  const handleUpdateUser = () => {
    const userData = {firstName, lastName, email, password};
    dispatch(updateUser(userData));
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: tw`flex-1 items-center px-4M w-90% mx-auto`,
    input: tw`border w-full px-3 py-2 mb-4 rounded-2 border-accent-6`,
    label: [
      tw`font-nokia-bold text-xl text-secondary-6 my-2`,
      darkMode ? tw`text-primary-1` : null,
    ],
  });

  return (
    <SafeAreaView
      style={[
        tw`flex-1 items-center px-4 bg-primary-1`,
        darkMode && tw`bg-secondary-9`,
      ]}>
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
    </SafeAreaView>
  );
};

export default UserProfileUpdateScreen;
