import React, {useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import tw from '../../../../tailwind';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const Slide = ({value, setIsSlideComplete}) => {
  const [activeIndexCarousel, setActiveIndexCarousel] = useState(-1);

  const handleSnapToItem = index => {
    setActiveIndexCarousel(index);

    if (index === value.length - 1) {
      setIsSlideComplete(true);
    }
  };

  if (value.length < 2) {
    setIsSlideComplete(true);
  }

  return (
    <View style={tw`items-center justify-center`}>
      <Carousel
        layout={'default'}
        data={value}
        renderItem={({item}) => (
          <View style={tw`items-center justify-center`}>
            <Text
              style={tw`font-nokia-bold text-sm text-primary-1 text-justify`}>
              {item}
            </Text>
          </View>
        )}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width - 100}
        windowSize={1}
        onSnapToItem={handleSnapToItem}
      />
      <Pagination
        dotsLength={value.length}
        activeDotIndex={activeIndexCarousel}
        containerStyle={tw`mt-2`}
        dotStyle={tw`w-1.5 h-1.5 bg-primary-1`}
        inactiveDotStyle={tw`bg-primary-1`}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default Slide;
