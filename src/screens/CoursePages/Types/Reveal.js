import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import FlipCard from 'react-native-flip-card';
import tw from '../../../../tailwind';

const Reveal = ({value, setIsRevealComplete}) => {
  // State to track the current flip status of each card
  const [flip, setFlip] = useState(value.map(() => false));

  // State to track if each card has ever been flipped at least once
  const [hasBeenFlipped, setHasBeenFlipped] = useState(value.map(() => false));

  // Handler function to flip the card and track if it has been flipped
  const handleFlip = index => {
    setFlip(prevFlip =>
      prevFlip.map((isFlipped, i) => (i === index ? !isFlipped : isFlipped)),
    );

    // Update hasBeenFlipped state if the card is being flipped for the first time
    setHasBeenFlipped(prevHasBeenFlipped =>
      prevHasBeenFlipped.map((wasFlipped, i) =>
        i === index ? true : wasFlipped,
      ),
    );
  };

  // Effect to check if all cards have been flipped at least once
  useEffect(() => {
    const allHaveBeenFlipped = hasBeenFlipped.every(wasFlipped => wasFlipped);
    setIsRevealComplete(allHaveBeenFlipped);
  }, [hasBeenFlipped, setIsRevealComplete]);

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
