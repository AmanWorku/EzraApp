import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from 'react-native';
import tw from '../../../../tailwind';
import {ArrowSquareDown, ArrowSquareUp} from 'phosphor-react-native';

const AccordionComponent = ({value, setIsAccordionExpanded}) => {
  const [expandedIndices, setExpandedIndices] = useState([]);

  const toggleAccordion = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const isExpanded = expandedIndices.includes(index);
    const newExpandedIndices = isExpanded
      ? expandedIndices.filter(i => i !== index)
      : [...expandedIndices, index];

    setExpandedIndices(newExpandedIndices);

    // Check if all accordions are expanded
    if (newExpandedIndices.length === value.length) {
      setIsAccordionExpanded(true); // Notify parent that all accordions are expanded
    } else {
      setIsAccordionExpanded(false);
    }
  };

  const renderAccordionContent = (item, index) => {
    const isExpanded = expandedIndices.includes(index);
    const contentHeight = isExpanded ? item.contentHeight : 0;

    return isExpanded ? (
      <Animated.View style={[tw`overflow-hidden`, {height: contentHeight}]}>
        <Text style={tw`py-2 px-4 font-nokia-bold text-primary-1`}>
          {item.content}
        </Text>
      </Animated.View>
    ) : null;
  };

  return (
    <View>
      {value.map((item, index) => (
        <View key={index} style={tw`mb-2 overflow-hidden`}>
          <TouchableOpacity
            style={[
              tw`flex flex-row bg-accent-6 w-full items-center justify-between px-4 rounded`,
              expandedIndices.includes(index) && tw`mb-2`,
            ]}
            onPress={() => toggleAccordion(index)}>
            <Text style={tw`font-nokia-bold text-lg text-primary-1 py-3`}>
              {item.title}
            </Text>
            {expandedIndices.includes(index) ? (
              <ArrowSquareUp size={24} color={'white'} />
            ) : (
              <ArrowSquareDown size={24} color={'white'} />
            )}
          </TouchableOpacity>
          {renderAccordionContent(item, index)}
        </View>
      ))}
    </View>
  );
};

export default AccordionComponent;
