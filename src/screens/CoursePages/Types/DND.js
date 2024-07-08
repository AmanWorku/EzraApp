import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from '../../../../tailwind';
import Toast from 'react-native-toast-message';

const DND = ({value}) => {
  console.log(value);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleAnswerSelection = answer => {
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    setIsAnswerChecked(true);
    if (selectedAnswer.text === value.correctDndAnswer) {
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

  return (
    <View style={tw`items-center justify-center`}>
      <Text style={tw`font-nokia-bold text-lg text-primary-1 mb-4`}>
        {value.question}
      </Text>
      <View style={tw`flex flex-row justify-center flex-wrap gap-4`}>
        {value.choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAnswerSelection(choice)}
            style={[
              tw`mb-2`,
              selectedAnswer === choice && !isAnswerChecked
                ? tw`bg-primary-2 text-secondary-6 rounded-lg`
                : null,
            ]}
            disabled={isAnswerChecked}>
            <Text
              style={[
                tw`font-nokia-bold text-sm text-primary-1 border border-primary-1 rounded-lg p-2`,
                selectedAnswer === choice && !isAnswerChecked
                  ? tw`text-secondary-6`
                  : null,
              ]}>
              {choice.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={checkAnswer}
        style={tw`mt-4 bg-primary-2 px-4 py-2 rounded-lg`}
        disabled={!selectedAnswer || isAnswerChecked}>
        <Text style={tw`font-nokia-bold text-secondary-6`}>
          {isAnswerChecked ? 'Answer Checked' : 'Check Answer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DND;
