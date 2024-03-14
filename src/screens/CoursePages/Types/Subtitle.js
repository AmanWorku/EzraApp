import React from 'react';
import {Text} from 'react-native';
import tw from '../../../../tailwind';

const Subtitle = ({value}) => (
  <Text style={tw`font-nokia-bold text-primary-1 text-lg text-center `}>
    {value}
  </Text>
);

export default Subtitle;
