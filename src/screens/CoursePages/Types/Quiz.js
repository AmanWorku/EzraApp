import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from '../../../../tailwind';
import Toast from 'react-native-toast-message';

const Quiz = ({
  value,
  selectedAnswer,
  setSelectedAnswer,
  isAnswerChecked,
  setIsAnswerChecked,
}) => {
  const handleAnswerSelection = answer => {
    // Allow selection only if the answer is not yet checked
    if (!isAnswerChecked) {
      setSelectedAnswer(answer);
    }
  };

  const checkAnswer = () => {
    // Check answer only if an answer is selected and the answer is not yet checked
    if (selectedAnswer && !isAnswerChecked) {
      setIsAnswerChecked(true); // Set answer checked flag to true
      if (selectedAnswer.text === value.correctAnswer) {
        // Show success message if the answer is correct
        return Toast.show({
          type: 'success',
          text1: 'Correct Answer!',
        });
      } else {
        // Show error message if the answer is incorrect
        return Toast.show({
          type: 'error',
          text1: 'Wrong Answer!',
        });
      }
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
              tw` mb-2`,
              selectedAnswer === choice && !isAnswerChecked
                ? tw`bg-primary-2 text-secondary-6 rounded-lg`
                : null,
            ]}
            disabled={isAnswerChecked}>
            <Text
              style={[
                tw`font-nokia-bold text-sm text-primary-1 border border-primary-1 rounded-lg p-2`,
                selectedAnswer === choice && !isAnswerChecked
                  ? tw` text-secondary-6`
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
        disabled={isAnswerChecked}>
        <Text style={tw`font-nokia-bold text-white`}>
          {isAnswerChecked ? 'Answer Checked' : 'Check Answer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quiz;
