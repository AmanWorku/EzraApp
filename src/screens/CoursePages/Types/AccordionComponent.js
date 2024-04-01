import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
import tw from '../../../../tailwind';
import {ArrowSquareDown} from 'phosphor-react-native';

const AccordionComponent = ({value}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const toggleAccordion = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
    Animated.timing(animation, {
      toValue: expandedIndex === index ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const renderAccordionContent = (item, index) => {
    const contentHeight = expandedIndex === index ? item.contentHeight : 0;

    // Check if the current index is equal to the expanded index
    if (expandedIndex === index) {
      return (
        <Animated.View style={[tw`overflow-hidden`, {height: contentHeight}]}>
          <Text style={tw`py-2 px-4 font-nokia-bold text-primary-1`}>
            {item.content}
          </Text>
        </Animated.View>
      );
    } else {
      return null; // Return null if the accordion is not expanded
    }
  };

  return (
    <View>
      {value.map((item, index) => (
        <View key={index} style={tw`mb-2 rounded-lg overflow-hidden`}>
          <TouchableOpacity
            style={[
              tw`flex flex-row bg-accent-6 w-100% items-center justify-between px-4 `,
              expandedIndex === index && tw`mb-2`,
            ]}
            onPress={() => toggleAccordion(index)}>
            <Text style={tw`font-nokia-bold text-lg text-primary-1 py-3`}>
              {item.title}
            </Text>
            <ArrowSquareDown size={24} weight="fill" color={'white'} />
          </TouchableOpacity>
          {renderAccordionContent(item, index)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  titleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default AccordionComponent;
