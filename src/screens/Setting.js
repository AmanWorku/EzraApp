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

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);
  const firstName = useSelector(state => state.auth.firstName);
  const lastName = useSelector(state => state.auth.lastName);
  const email = useSelector(state => state.auth.email);

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
        tw`flex-1 justify-center items-center px-4 bg-primary-1`,
        darkMode && tw`bg-secondary-9`,
      ]}>
      <View style={tw`w-85%`}>
        <Text
          style={[
            tw`font-nokia-bold text-secondary-6 text-xl mb-4`,
            darkMode && tw`text-primary-1`,
          ]}>
          Profile
        </Text>

        <View style={tw`h-0.2 bg-accent-6 w-full mb-4`} />

        <Text style={tw`font-nokia-bold text-accent-6 text-sm mb-2`}>
          Personal Information
        </Text>

        <TextInput
          style={tw`bg-white w-full p-2 mb-4`}
          placeholder="First Name"
          value={firstName}
          editable={false}
        />

        <TextInput
          style={tw`bg-white w-full p-2 mb-4`}
          placeholder="Last Name"
          value={lastName}
          editable={false}
        />

        <TextInput
          style={tw`bg-white w-full p-2 mb-4`}
          placeholder="Email"
          value={email}
          editable={false}
        />

        <View style={tw`flex-row w-full justify-between items-center mb-4`}>
          <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
            Dark Mode
          </Text>
          <Switch onValueChange={handleToggle} value={darkMode} />
        </View>

        <TouchableOpacity
          style={[
            tw`bg-secondary-9 rounded-lg p-3 mb-4 items-center justify-center`,
          ]}
          onPress={handleLogout}>
          <Text style={tw`font-nokia-bold text-secondary-1 text-lg`}>
            Logout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tw`bg-secondary-9 rounded-lg p-3 mb-4 items-center justify-center`,
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={tw`font-nokia-bold text-secondary-1 text-lg`}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tw`items-center mb-8`}>
        <Image
          style={tw`w-24 h-24 rounded-full`}
          source={{uri: 'https://via.placeholder.com/150'}} // Placeholder image
        />
        <Text style={tw`text-xl font-semibold mt-2`}>
          {firstName} {lastName}
        </Text>
        <Text style={tw`text-sm`}>{email}</Text>
      </View>

      <View style={tw`mb-8`}>
        <Text style={tw`font-semibold mb-2`}>Your Progress</Text>
        {/* Static placeholders for course progress can be implemented here */}
      </View>

      <View style={tw`mb-8`}>
        <Text style={tw`font-semibold mb-2`}>Course Enrollment</Text>
        {/* Static placeholders for course enrollment can be implemented here */}
      </View>

      <View style={tw`mb-8`}>
        <Text style={tw`font-semibold mb-2`}>Settings & Preferences</Text>
        {/* Components for settings and preferences */}
        <View style={tw`flex-row justify-between mb-4`}>
          <Text style={tw`text-sm`}>Notification Preferences</Text>
          {/* Place a switch or button here for notification settings */}
        </View>
        {/* Repeat the above structure for other preferences */}
      </View>

      <View style={tw`mb-8`}>
        <Text style={tw`font-semibold mb-2`}>Achievements & Badges</Text>
        {/* Static placeholders for achievements and badges */}
      </View>

      <View style={tw`mb-8`}>
        <Text style={tw`font-semibold mb-2`}>Social Sharing</Text>
        {/* Buttons or links for social sharing functionalities */}
      </View>

      <View style={tw`mb-8`}>
        <Text style={tw`font-semibold mb-2`}>Feedback & Support</Text>
        {/* Place for feedback form or support links */}
      </View>

      <View style={tw`mb-8`}>
        <Text style={tw`font-semibold mb-2`}>Course Recommendations</Text>
        {/* Static placeholders for recommended courses */}
      </View>

      <View style={tw`mb-8`}>
        <Text style={tw`font-semibold mb-2`}>Community Engagement</Text>
        {/* Features like forums or study groups */}
      </View>

      <View style={tw`mb-8`}>
        <Text style={tw`font-semibold mb-2`}>Accessibility Features</Text>
        {/* Toggle buttons for contrast mode, font size, etc. */}
      </View>

      {/* Your existing logout button and go back button can remain here as before */}
    </SafeAreaView>
  );
};

export default Setting;
