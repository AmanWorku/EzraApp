import React from 'react';
import {
  View,
  Text,
  Switch,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import tw from './../../tailwind';
import {useSelector, useDispatch} from 'react-redux';
import {toggleDarkMode} from '../redux/uiSlice';
import {logoutUser} from '../redux/authSlice'; // Import the logout action

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);
  const firstName = useSelector(state => state.auth.firstName); // Corrected variables for consistency
  const lastName = useSelector(state => state.auth.lastName);

  // Since you didn't show where the email comes from, I'm leaving it as an empty string by default
  const [name, setName] = React.useState(firstName || '');
  const [surname, setSurname] = React.useState(lastName || '');
  const [email, setEmail] = React.useState('');

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleSaveInfo = () => {
    // Dispatch an updateUserInfo action or a custom action if you need to save to an API
    dispatch(updateUser({name, surname, email}));
    alert('Information updated!');
  };

  const handleLogout = () => {
    // Call the logoutUser action creator when the logout button is pressed
    dispatch(logoutUser());
    // Navigate to the login screen or root stack if desired
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView
      style={[
        tw`flex-1 justify-center items-center px-4 bg-primary-1`,
        darkMode ? tw`bg-secondary-9` : null,
      ]}>
      <View style={tw`w-85%`}>
        <Text
          style={[
            tw`font-nokia-bold text-secondary-6 text-xl mb-4`,
            darkMode ? tw`text-primary-1` : null,
          ]}>
          Settings
        </Text>

        <View style={tw`h-0.2 bg-accent-6 w-full mb-4`} />

        <Text style={tw`font-nokia-bold text-accent-6 text-sm mb-2`}>
          Account Information
        </Text>

        <TextInput
          style={tw`bg-white w-full p-2 mb-4`}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={tw`bg-white w-full p-2 mb-4`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <View style={tw`flex-row w-full justify-between items-center mb-4`}>
          <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
            Dark Mode
          </Text>
          <Switch onValueChange={handleToggle} value={darkMode} />
        </View>

        <Button title="Save Information" onPress={handleSaveInfo} />
        <Button title="Logout" color="#FF6347" onPress={handleLogout} />

        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

export default Setting;
