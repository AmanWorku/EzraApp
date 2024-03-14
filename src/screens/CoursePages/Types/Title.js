import React from 'react';
import {Text} from 'react-native';
import tw from '../../../../tailwind';

const Title = ({value}) => (
  <Text style={tw`text-primary-1 text-3xl font-nokia-bold text-center`}>
    {value}
  </Text>
);

export default Title;
