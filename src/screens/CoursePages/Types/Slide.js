import React, {useState} from 'react';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';
import tw from '../../../../tailwind';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {CaretCircleLeft, CaretCircleRight} from 'phosphor-react-native'; // Ensure you have this package

const Slide = ({value, setIsSlideComplete}) => {
  const [activeIndexCarousel, setActiveIndexCarousel] = useState(0);

  const handleSnapToItem = index => {
    setActiveIndexCarousel(index);
    if (index === value.length - 1) {
      setIsSlideComplete(true);
    }
  };

  const goToNext = () => {
    if (activeIndexCarousel < value.length - 1) {
      handleSnapToItem(activeIndexCarousel + 1);
    }
  };

  const goToPrevious = () => {
    if (activeIndexCarousel > 0) {
      handleSnapToItem(activeIndexCarousel - 1);
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
          <View style={tw`items-center justify-center mx-1`}>
            <Text
              style={tw`font-nokia-bold text-sm text-primary-1 text-justify items-center px-2`}>
              {item}
            </Text>
          </View>
        )}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width - 100}
        windowSize={1}
        onSnapToItem={handleSnapToItem}
        firstItem={activeIndexCarousel} // This prop controls the active slide
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
      {/* Navigation Arrows */}
      <View style={tw`absolute flex-row justify-between w-full items-center`}>
        <TouchableOpacity
          onPress={goToPrevious}
          disabled={activeIndexCarousel === 0}
          style={tw`bg-accent-8 rounded-full shadow-md ${
            activeIndexCarousel === 0 ? 'opacity-50' : 'opacity-100'
          }`}>
          <CaretCircleLeft size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToNext}
          disabled={activeIndexCarousel === value.length - 1}
          style={tw`bg-accent-8 rounded-full shadow-md ${
            activeIndexCarousel === value.length - 1
              ? 'opacity-50'
              : 'opacity-100'
          }`}>
          <CaretCircleRight size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Slide;
