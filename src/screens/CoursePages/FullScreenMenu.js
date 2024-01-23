import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import tw from './../../../tailwind';

// Screen dimensions to cover the full screen
const {width, height} = Dimensions.get('window');

const FullScreenMenu = ({isVisible, onClose}) => {
  if (!isVisible) return null;

  return (
    <View style={[styles.menuContainer, tw`bg-opacity-80 bg-black`]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={tw`text-white text-xl`}>X</Text>
      </TouchableOpacity>
      {/* Add your menu items here */}
      <View style={tw`mt-20 p-4`}>
        <Text style={tw`text-white text-lg mb-4`}>Menu Item 1</Text>
        <Text style={tw`text-white text-lg mb-4`}>Menu Item 2</Text>
        <Text style={tw`text-white text-lg`}>Menu Item 3</Text>
        {/* You can add more menu items here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 2, // Ensure the menu covers everything
  },
  closeButton: {
    marginTop: StatusBar.currentHeight || 40,
    marginRight: 20,
  },
  // ... other styles
});

export default FullScreenMenu;
