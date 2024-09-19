import React from 'react';
import {FlatList, ScrollView, Text} from 'react-native';
import tw from '../../../../tailwind';

const List = ({value}) => (
  <ScrollView nestedScrollEnabled>
    <FlatList
      data={value}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <Text style={tw`font-nokia-bold text-sm text-primary-1`}>
          {'\u2022 '}
          {item}
        </Text>
      )}
    />
  </ScrollView>
);

export default List;
