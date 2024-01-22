import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

const SlideSample1 = () => {
  return (
    <View style={styles.fullScreen}>
      <Text>Sample text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default SlideSample1;
