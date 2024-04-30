import React, {useState} from 'react';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import tw from '../../../../tailwind';
import Toast from 'react-native-toast-message';
import DraggableFlatList from 'react-native-draggable-flatlist';

const DND = ({value}) => {
  const [choices, setChoices] = useState(value.choices);
  const [droppedChoice, setDroppedChoice] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleAnswerSelection = answer => {
    setDroppedChoice(answer);
  };

  const checkAnswer = () => {
    setIsAnswerChecked(true);
    if (droppedChoice.text === value.correctAnswer) {
      return Toast.show({
        type: 'success',
        text1: 'Correct Answer!',
      });
    } else {
      return Toast.show({
        type: 'error',
        text1: 'Wrong Answer!',
      });
    }
  };

  const renderItem = ({item, drag, isActive}) => (
    <TouchableOpacity
      onLongPress={drag}
      disabled={isActive}
      style={[
        tw`mr-2 border border-primary-1 rounded-lg p-2`,
        isActive ? tw`bg-primary-2 text-secondary-6` : null,
      ]}>
      <Text style={tw`font-nokia-bold text-sm text-primary-1`}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  const renderDroppableArea = () => (
    <View style={tw`my-4 border border-primary-1 px-8 py-4 rounded-lg`}>
      {droppedChoice ? (
        <Text style={tw`font-nokia-bold text-secondary-6`}>
          {droppedChoice.text}
        </Text>
      ) : (
        <Text style={tw`font-nokia-bold text-primary-1`}>Drop Here</Text>
      )}
    </View>
  );

  return (
    <View style={tw`flex-1 justify-center items-center w-100%`}>
      <Text style={tw`font-nokia-bold text-lg text-primary-1 mb-4`}>
        {value.question}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <DraggableFlatList
          data={choices}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.text}-${index}`}
          onDragEnd={({data}) => handleAnswerSelection(data)}
          horizontal
        />
      </ScrollView>
      {renderDroppableArea()}
      <TouchableOpacity
        onPress={checkAnswer}
        style={tw`mt-2 bg-primary-2 px-4 py-2 rounded-lg`}
        disabled={!droppedChoice || isAnswerChecked}>
        <Text style={tw`font-nokia-bold text-secondary-6`}>
          {isAnswerChecked ? 'Answer Checked' : 'Check Answer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DND;
