import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import tw from './../../../tailwind';
import {DotsThreeOutlineVertical} from 'phosphor-react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import FullScreenMenu from './FullScreenMenu';

const SlideSample1 = () => {
  const navigate = useNavigation();
  const [menuVisible, setMenuVisible] = React.useState(false); // State to control menu visibility

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle the state to show/hide the menu
  };
  const handleOpenCourse = () => {
    navigate.navigate('SlideSample2');
  };
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);
      return () => StatusBar.setHidden(false);
    }, []),
  );
  return (
    <View style={tw`flex-1`}>
      <FullScreenMenu isVisible={menuVisible} onClose={toggleMenu} />
      <ImageBackground
        source={require('./../../assets/bible6.jpeg')}
        style={tw`flex-1 p-2`}>
        <View style={tw`absolute inset-0 bg-accent-9 bg-opacity-80`} />
        <View style={tw`flex-grow justify-between pt-8 px-2`}>
          <View>
            <View style={tw`flex flex-row items-center justify-between`}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <View style={tw`pr-2 border-r border-primary-1`}>
                  <Image
                    source={require('./../../assets/LogoSmall.png')}
                    style={tw`w-22 h-11`}
                    resizeMode="contain"
                  />
                </View>
                <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
                  ክፍል ሦስት - የጥሞና ጥናት
                </Text>
              </View>
              <View style={tw`flex flex-row items-center gap-1`}>
                <Text style={tw`font-nokia-bold text-primary-1 text-lg`}>
                  1/15
                </Text>
                <TouchableOpacity onPress={toggleMenu}>
                  <DotsThreeOutlineVertical weight="fill" color="#EA9215" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`border-b border-accent-6 mt-2`} />
          </View>
          <ScrollView
            contentContainerStyle={tw`flex-grow justify-center pt-8 px-2`}
            showsVerticalScrollIndicator={false}>
            <View style={tw`flex gap-4`}>
              <Text
                style={tw`font-nokia-bold text-2xl text-primary-1 text-center`}>
                ክፍል ሦስት - የጥሞና ጥናት
              </Text>
              <Text
                style={tw`font-nokia-bold text-lg text-primary-1 text-center`}>
                ይህ የፍሬያማ የመጽሐፍ ቅዱስ አጠናን ዘዴ ኮርስ ሦስተኛ ክፍል ሲሆን ከሰባቱ የመጽሐፍ ቅዱስ አጠናን
                ዘዴዎች አንዱ የሆነውን የጥሞናን ጥናት በዝርዝር ለማየት እንሞክራለን።
              </Text>
            </View>
          </ScrollView>
          <View>
            <View style={tw`border-b border-accent-6 my-2`} />
            <TouchableOpacity
              style={tw`bg-accent-6 px-4 py-2 rounded-full w-36 my-2 mx-auto`}
              onPress={handleOpenCourse}>
              <Text
                style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                ትምህርቱን ጀምር
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SlideSample1;
