import {Text, Dimensions, StyleSheet, View} from 'react-native';
import Carousel from '@eleva/react-native-reanimated-carousel';
import React from 'react';

const Sequence = ({value}) => {
  return (
    <View style={{flex: 1}}>
      <Carousel
        width={width}
        height={width / 2}
        vertical={true}
        data={value}
        scrollAnimationDuration={1000}
        renderItem={({value}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center', fontSize: 30}}>{value}</Text>
          </View>
        )}
      />
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
});

export default Sequence;
