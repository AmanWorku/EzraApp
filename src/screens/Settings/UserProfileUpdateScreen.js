import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Switch,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../redux/authSlice';
import tw from './../../../tailwind';

const UserProfileUpdateScreen = ({navigation}) => {
  // States for user inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redux dispatch
  const dispatch = useDispatch();

  // Update user handler
  const handleUpdateUser = () => {
    const userData = {firstName, lastName, email, password};
    dispatch(updateUser(userData));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter first name"
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter last name"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
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
      <Button title="Update Profile" onPress={handleUpdateUser} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: tw`flex-1 items-center px-4M w-90% mx-auto`,
  input: tw`border w-full px-3 py-2 mb-4 rounded-lg`,
  label: tw`self-start mb-2`,
  switchContainer: tw`flex-row items-center justify-between w-full pb-4`,
});

export default UserProfileUpdateScreen;
