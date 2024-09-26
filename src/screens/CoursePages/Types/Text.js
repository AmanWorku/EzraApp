import React from 'react';
import {StyleSheet} from 'react-native';
import tw from '../../../../tailwind';
import HTMLView from 'react-native-htmlview';

const TextComponent = ({value, darkMode}) => {
  const tailwindStyles = StyleSheet.create({
    text: tw`text-primary-1 font-nokia-bold text-justify text-sm leading-snug`,
    p: {
      ...tw`text-primary-1 font-nokia-bold text-justify text-sm leading-snug`,
      marginVertical: -15,
    },
    a: {
      ...tw`text-accent-6 font-nokia-bold text-sm underline`,
      marginVertical: -15,
    },
    h1: tw`text-primary-1 font-nokia-bold text-justify text-2xl leading-snug`,
    h2: tw`text-primary-1 font-nokia-bold text-justify text-xl leading-snug`,
    h3: tw`text-primary-1 font-nokia-bold text-justify text-lg leading-snug`,
  });
  return (
    <HTMLView
      value={value} // Assuming body[0] contains HTML string
      stylesheet={tailwindStyles}
    />
  );
};

export default TextComponent;
