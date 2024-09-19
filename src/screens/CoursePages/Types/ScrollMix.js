import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import tw from '../../../../tailwind'; // Import your tailwind styles
import {ArrowsOut} from 'phosphor-react-native';

function ScrollMix({
  value,
  toggleModal,
  isModalVisible,
  isImageLoaded,
  handleImageLoad,
  darkMode,
}) {
  return (
    <View style={tw`flex`}>
      {/* Display text1 */}
      <Text
        style={tw`text-primary-5 font-nokia-bold w-[80%] mx-auto self-center text-justify text-xs lg:text-lg xl:text-xl lg:pt-2`}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {value.text1}
      </Text>

      {/* Display Image with Fullscreen Option */}
      <View style={tw`w-42 h-42 self-center relative`}>
        {!isImageLoaded && (
          <ActivityIndicator
            size="large"
            color="#EA9215"
            style={tw`absolute inset-0`}
          />
        )}
        <TouchableOpacity onPress={toggleModal}>
          <Image
            source={{uri: `${value.file}`}}
            style={[
              tw`w-full h-full items-center`,
              isImageLoaded ? tw`opacity-100` : tw`opacity-0`,
            ]}
            onLoad={handleImageLoad}
          />
          {isImageLoaded && (
            <View style={tw`absolute bottom-2 right-2 bg-accent-8 rounded-1`}>
              <ArrowsOut size={24} color="white" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View
          style={tw`flex-1 justify-center items-center bg-accent-11 bg-opacity-80`}>
          <View
            style={[
              tw`bg-accent-8 p-4 rounded-2`,
              darkMode ? tw`bg-secondary-9` : null,
            ]}>
            <Image
              source={{uri: `${value.file}`}}
              style={tw`w-80 h-80 rounded-2`}
            />
            <TouchableOpacity
              title="Close"
              onPress={toggleModal}
              style={tw`mt-4 items-center`}>
              <Text
                style={tw`text-primary-1 border border-accent-5 px-4 py-1 rounded`}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Display text2 */}
      <Text
        style={tw`text-primary-5 font-nokia-bold w-[80%] mx-auto self-center text-justify text-xs lg:text-lg xl:text-xl lg:pt-2`}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {value.text2}
      </Text>
    </View>
  );
}

export default ScrollMix;
