import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import FlipCard from 'react-native-flip-card';
import tw from '../../../../tailwind';

const Reveal = ({value}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <FlipCard
      style={tw`w-full h-$half rounded-lg bg-white shadow`}
      friction={6}
      perspective={1000}
      flipHorizontal={true}
      flipVertical={false}
      flip={isFlipped}
      onClick={handleFlip}>
      {/* Face Side */}
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`font-nokia-bold text-lg text-primary-1 px-4`}>
          {value.title}
        </Text>
      </View>
      {/* Back Side */}
      <View
        style={tw`flex-1 items-center justify-center bg-accent-6 rounded-lg`}>
        <Text style={tw`font-nokia-bold text-lg text-primary-1 px-4`}>
          {value.content}
        </Text>
      </View>
    </FlipCard>
  );
};

export default Reveal;
