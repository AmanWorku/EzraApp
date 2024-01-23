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
import {X, XCircle} from 'phosphor-react-native';

// Screen dimensions to cover the full screen
const {width, height} = Dimensions.get('window');

const FullScreenMenu = ({isVisible, onClose}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={[styles.menuContainer, tw`bg-opacity-90 bg-accent-11`]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <XCircle
          style={tw`flex self-end`}
          size={32}
          weight="fill"
          color="#EA9215"
        />
      </TouchableOpacity>
      <View style={tw`mt-20 p-4`}>
        <Text style={tw`text-white text-lg mb-4`}>Menu Item 1</Text>
        <Text style={tw`text-white text-lg mb-4`}>Menu Item 2</Text>
        <Text style={tw`text-white text-lg`}>Menu Item 3</Text>
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
    // alignItems: 'flex-end',
    zIndex: 2,
  },
  closeButton: {
    marginTop: StatusBar.currentHeight || 40,
    marginRight: 20,
  },
});

export default FullScreenMenu;
