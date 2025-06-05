import React from 'react';
import {Text, View, StyleSheet, Linking} from 'react-native';
import tw from '../../../../tailwind';
import parse, {domToReact} from 'html-react-parser';

const TextComponent = ({value}) => {
  const handleLinkPress = url => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  const renderOptions = {
    replace: domNode => {
      // Helper to extract alignment styles
      const getAlignStyle = () => {
        if (domNode.attribs?.class) {
          if (domNode.attribs.class.includes('ql-align-center')) {
            return styles.centerText;
          } else if (domNode.attribs.class.includes('ql-align-right')) {
            return styles.rightText;
          }
        }
        return styles.leftText; // Default to left alignment
      };

      // Helper to extract font size styles
      const getFontSizeStyle = () => {
        if (domNode.attribs?.class) {
          if (domNode.attribs.class.includes('ql-size-huge')) {
            return styles.hugeFont;
          } else if (domNode.attribs.class.includes('ql-size-large')) {
            return styles.largeFont;
          } else if (domNode.attribs.class.includes('ql-size-small')) {
            return styles.smallFont;
          }
        }
        return styles.defaultFont; // Default to standard size
      };

      // Handle block elements like paragraphs and spans
      if (['p', 'span', 'strong', 'em'].includes(domNode.name)) {
        return (
          <Text style={[styles.textBase, getAlignStyle(), getFontSizeStyle()]}>
            {domToReact(domNode.children, renderOptions)}
          </Text>
        );
      }

      // Render ordered and unordered lists
      if (domNode.name === 'ol' || domNode.name === 'ul') {
        return (
          <View style={[styles.listContainer, getAlignStyle()]}>
            {domNode.children.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={[styles.textBase, getFontSizeStyle()]}>
                  {domNode.name === 'ol' ? `${index + 1}. ` : '• '}
                  {domToReact(item.children, renderOptions)}
                </Text>
              </View>
            ))}
          </View>
        );
      }

      // Render underlined text
      if (domNode.name === 'u') {
        return (
          <Text
            style={[styles.textBase, styles.underlineText, getFontSizeStyle()]}>
            {domToReact(domNode.children, renderOptions)}
          </Text>
        );
      }

      // Render line breaks
      if (domNode.name === 'br') {
        return <Text>{'\n'}</Text>;
      }

      // Handle individual list items
      if (domNode.name === 'li') {
        return (
          <View style={[styles.listItem, getAlignStyle()]}>
            <Text style={[styles.textBase, getFontSizeStyle()]}>
              {domToReact(domNode.children, renderOptions)}
            </Text>
          </View>
        );
      }

      if (domNode.name === 'a' && domNode.attribs?.href) {
        return (
          <Text
            style={[styles.textBase, styles.linkText, getFontSizeStyle()]}
            onPress={() => handleLinkPress(domNode.attribs.href)}>
            {domToReact(domNode.children, renderOptions)}
          </Text>
        );
      }

      // Handle plain text nodes
      if (domNode.type === 'text') {
        return (
          <Text style={[styles.textBase, getFontSizeStyle()]}>
            {domNode.data}
          </Text>
        );
      }

      // Fallback for unhandled nodes
      return null;
    },
  };

  return <View style={styles.container}>{parse(value, renderOptions)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textBase: {
    ...tw`text-primary-1 font-nokia-bold leading-snug`,
    flexWrap: 'wrap',
    textAlign: 'justify', // Default to justified text
    fontFamily: 'NokiaPureText-Bold', // Add explicit font family
  },
  defaultFont: tw`text-base`,
  hugeFont: tw`text-3xl`,
  largeFont: tw`text-2xl`,
  smallFont: tw`text-sm`,
  underlineText: tw`underline`,
  listContainer: tw`mt-2`,
  listItem: tw`flex-row items-start`,
  centerText: {
    textAlign: 'center',
  },
  rightText: {
    textAlign: 'right',
  },
  leftText: {
    textAlign: 'left',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontFamily: 'NokiaPureText-Bold', // Add explicit font family
  },
});

export default TextComponent;
