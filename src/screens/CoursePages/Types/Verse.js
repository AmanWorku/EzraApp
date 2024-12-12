import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, Pressable} from 'react-native';
import {X} from 'phosphor-react-native';
import tw from '../../../../tailwind';

const VerseSection = ({value}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClose = () => {
    setActiveIndex(null);
  };

  return (
    <View style={tw`w-full flex  items-center mt-4`}>
      <TouchableOpacity
        onPress={() => setActiveIndex(value[0])}
        style={tw`underline`}>
        <Text
          style={tw`text-primary-2 bg-accent-7 px-3 py-1 rounded-xl text-lg font-nokia-bold`}>
          {value[0]}
        </Text>
      </TouchableOpacity>

      {activeIndex !== null && (
        <Modal
          transparent={true}
          visible={activeIndex !== null}
          animationType="fade"
          onRequestClose={handleClose}>
          <Pressable
            style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
            onPress={e => {
              if (e.target === e.currentTarget) {
                handleClose();
              }
            }}>
            <View
              style={tw`w-[90%] max-w-lg bg-secondary-6 bg-opacity-85 shadow-2xl px-4 py-6 rounded-lg my-2 border border-accent-6 relative`}>
              <Text
                style={tw`absolute top-[-1rem] self-center transform -translate-x-1/2 text-lg text-primary-2 bg-accent-8 px-4 py-1 rounded-md shadow-md font-nokia-bold`}>
                {value[0]}
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                style={tw`absolute right-1 top-1 z-50 p-1 bg-accent-6 border rounded-full`}>
                <X size={15} style={tw`text-primary-5`} />
              </TouchableOpacity>
              <Text
                style={tw`text-primary-2 text-lg leading-relaxed py-1 font-nokia-bold text-center`}>
                "{value[1]}"
              </Text>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

export default VerseSection;
