import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {X} from 'phosphor-react-native';
import tw from '../../../tailwind';

const VerseModal = ({isOpen, onClose, content}) => {
  if (!isOpen) return null;

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} weight="fill" color={tw`text-primary-1`} />
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <Text style={[tw`font-nokia-bold text-xl text-primary-1`]}>
              {content}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: tw`bg-primary-0`,
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  contentContainer: {
    maxHeight: '90%',
    overflow: 'scroll',
  },
});

export default VerseModal;
