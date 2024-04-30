import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FlipCard from 'react-native-flip-card';
import tw from '../../../../tailwind';

const Reveal = ({value}) => {
  const [flip, setFlip] = useState(value.map(() => false));

  const handleFlip = index => {
    setFlip(prevFlip =>
      prevFlip.map((isFlipped, i) => (i === index ? !isFlipped : isFlipped)),
    );
  };

  return (
    <>
      {value.map((revealItem, index) => (
        <FlipCard
          key={index}
          style={tw`w-full h-[50%] rounded-lg shadow`}
          friction={6}
          perspective={1000}
          flipHorizontal={false}
          flipVertical={true}
          flip={flip[index]}>
          {/* Face Side */}
          <TouchableOpacity
            style={tw`flex-1 items-center justify-center border border-accent-6 bg-accent-10 bg-opacity-50 rounded py-8`}
            onPress={() => handleFlip(index)}>
            <Text style={tw`font-nokia-bold text-xl text-primary-1`}>
              {revealItem.title}
            </Text>
          </TouchableOpacity>
          {/* Back Side */}
          <TouchableOpacity
            style={tw`flex-1 items-center justify-center border border-accent-6 bg-accent-10 bg-opacity-80 rounded`}
            onPress={() => handleFlip(index)}>
            <Text style={tw`font-nokia-bold text-lg text-primary-1 p-4`}>
              {revealItem.content}
            </Text>
          </TouchableOpacity>
        </FlipCard>
      ))}
    </>
  );
};

export default Reveal;
