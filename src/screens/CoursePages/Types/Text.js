import React from 'react';
import {Text} from 'react-native';
import tw from '../../../../tailwind';

const TextComponent = ({value}) => (
  <Text
    style={tw`font-nokia-bold text-sm text-primary-1 text-justify leading-tight`}>
    {'  '}
    {value}
  </Text>
);

export default TextComponent;
