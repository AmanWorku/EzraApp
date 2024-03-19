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
import {ArrowSquareLeft} from 'phosphor-react-native';
import bible from '../../assets/bible.png';

const UserProfileUpdateScreen = ({navigation}) => {
  // States for user inputs
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      <View style={tw`w-92% mt-4 p-4 rounded-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowSquareLeft
            size={36}
            weight="fill"
            color={'#EA9215'}
            style={tw`my-4`}
          />
        </TouchableOpacity>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={currentUser && currentUser.user && currentUser.user.firstName}
          onChangeText={setFirstName}
          placeholder="Enter first name"
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={currentUser && currentUser.user && currentUser.user.lastName}
          onChangeText={setLastName}
          placeholder="Enter last name"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={currentUser && currentUser.user && currentUser.user.email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />
        <TouchableOpacity
          style={tw`px-4 py-2 rounded-4 bg-accent-6 self-center mt-4`}
          onPress={handleUpdateUser}>
          <Text style={tw`font-nokia-bold text-sm text-primary-1`}>
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserProfileUpdateScreen;
