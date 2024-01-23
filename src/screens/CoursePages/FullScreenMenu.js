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
    <View style={[styles.menuContainer, tw`bg-opacity-90 bg-accent-11 p-4`]}>
      <View
        style={[
          styles.closeButton,
          tw` flex flex-row justify-between items-center`,
        ]}>
        <Text style={tw`font-nokia-bold text-primary-1 text-xl`}>
          ክፍል ሦስት - የጥሞና ጥናት
        </Text>
        <TouchableOpacity onPress={onClose} style={tw``}>
          <XCircle
            style={tw`flex self-end`}
            size={32}
            weight="fill"
            color="#EA9215"
          />
        </TouchableOpacity>
      </View>
      <Text style={tw`font-nokia-light text-primary-1 text-sm mt-4`}>
        ይህ የፍሬያማ የመጽሐፍ ቅዱስ አጠናን ዘዴ ኮርስ ሦስተኛ ክፍል ሲሆን ከሰባቱ የመጽሐፍ ቅዱስ አጠናን ዘዴዎች አንዱ
        የሆነውን የጥሞናን ጥናት በዝርዝር ለማየት እንሞክራለን።
      </Text>
      <View style={tw`border-b border-primary-1 my-4`} />
      <View style={tw``}>
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
  },
});

export default FullScreenMenu;
