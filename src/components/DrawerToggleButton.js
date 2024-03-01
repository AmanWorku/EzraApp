import React from 'react';
import {TouchableOpacity} from 'react-native';
import tw from './../../tailwind';
import {List} from 'phosphor-react-native';
import {useNavigation} from '@react-navigation/native';

const DrawerToggleButton = ({darkMode}) => {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <TouchableOpacity onPress={toggleDrawer}>
      <List
        size={32}
        weight="bold"
        style={[tw`text-secondary-6`, darkMode ? tw`text-primary-1` : null]}
      />
    </TouchableOpacity>
  );
};

export default DrawerToggleButton;
