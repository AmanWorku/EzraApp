import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {updateUser} from '../../redux/authSlice';
import tw from './../../../tailwind';

const UserProfileUpdateScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdateProfile = () => {
    updateUser({email, firstName, lastName, password});
    navigation.goBack();
  };

  return (
    <View style={tw`container mx-auto p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Update Profile</Text>
      <TextInput
        style={tw`input border rounded py-2 px-3 mb-2`}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style="input border rounded py-2 px-3 mb-2"
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style="input border rounded py-2 px-3 mb-2"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style="input border rounded py-2 px-3 mb-2"
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Update Profile"
        onPress={handleUpdateProfile}
        style="btn bg-blue-500 text-white py-2 px-4 rounded"
      />
    </View>
  );
};

export default UserProfileUpdateScreen;
