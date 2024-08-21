import {Text, View, TouchableOpacity} from 'react-native';
import Carousel from '@eleva/react-native-reanimated-carousel';
import tw from '../../../../tailwind';
import React, {useRef} from 'react';
import {ArrowCircleDown, ArrowCircleUp} from 'phosphor-react-native';

const Sequence = ({value, setIsSequenceComplete}) => {
  const carouselRef = useRef(null);
  const handlePrev = () => {
    const currentIndex = carouselRef.current?.getCurrentIndex();
    if (currentIndex > 0) {
      carouselRef.current?.scrollTo({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    const currentIndex = carouselRef.current?.getCurrentIndex();
    if (currentIndex < value.length - 1) {
      carouselRef.current?.scrollTo({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      setIsSequenceComplete(true);
    }
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={handlePrev} style={tw`self-center`}>
        <ArrowCircleUp size={32} color="#EA9521" weight="fill" />
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        width={tw`100%`}
        height={200}
        vertical={true}
        data={value}
        scrollAnimationDuration={1000}
        renderItem={({item}) => (
          <View
            style={tw`flex-1 justify-center border border-accent-6 bg-accent-8 bg-opacity-50 rounded my-2`}>
            <Text
              style={tw`font-nokia-bold text-center text-lg px-4 text-primary-1`}>
              {item}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={handleNext} style={tw`self-center`}>
        <ArrowCircleDown size={32} color="#EA9521" weight="fill" />
      </TouchableOpacity>
    </View>
  );
};

export default Sequence;
