import React from 'react';
import {Text, View, StyleShee, Linking} from 'react-native';
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
      const getAlignStyle = () => {
        if (domNode.attribs && domNode.attribs.class) {
          if (domNode.attribs.class.includes('ql-align-center')) {
            return styles.center;
          } else if (domNode.attribs.class.includes('ql-align-right')) {
            return styles.right;
          }
        }
        return styles.left; // Default to left alignment
      };

      const getFontSizeStyle = () => {
        if (domNode.attribs && domNode.attribs.class) {
          if (domNode.attribs.class.includes('ql-size-huge')) {
            return styles.huge;
          } else if (domNode.attribs.class.includes('ql-size-large')) {
            return styles.large;
          } else if (domNode.attribs.class.includes('ql-size-small')) {
            return styles.small;
          }
        }
        return styles.default; // Default to standard size
      };

      if (
        domNode.name === 'p' ||
        domNode.name === 'span' ||
        domNode.name === 'strong' ||
        domNode.name === 'em'
      ) {
        return (
          <View style={getAlignStyle()}>
            <Text style={[getFontSizeStyle(), styles.text]}>
              {domToReact(domNode.children, renderOptions)}
            </Text>
          </View>
        );
      }

      // Render lists
      if (domNode.name === 'ol' || domNode.name === 'ul') {
        return (
          <View style={[styles.list, getAlignStyle()]}>
            {domNode.children.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={[styles.listItemText, getFontSizeStyle()]}>
                  {domNode.name === 'ol' ? `${index + 1}. ` : '• '}
                  {domToReact(item.children, renderOptions)}
                </Text>
              </View>
            ))}
          </View>
        );
      }

      if (domNode.name === 'u') {
        const fontSizeStyle = getFontSizeStyle();

        return (
          <View style={getAlignStyle()}>
            <Text style={[fontSizeStyle, styles.underline]}>
              {domToReact(domNode.children, renderOptions)}
            </Text>
          </View>
        );
      }

      if (domNode.name === 'br') {
        return <Text></Text>;
      }

      // Render list item
      if (domNode.name === 'li') {
        return (
          <View style={[styles.listItem, getAlignStyle()]}>
            <Text style={[styles.listItemText, getFontSizeStyle()]}>
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
      // Handle text nodes (fallback)
      if (domNode.type === 'text') {
        return (
          <Text style={[styles.text, getAlignStyle()]}>{domNode.data}</Text>
        );
      }
    },
  };

  return <View>{parse(value, renderOptions)}</View>;
};

const styles = StyleSheet.create({
  text: tw`text-primary-1 font-nokia-bold leading-snug text-justify`,
  paragraph: tw`text-primary-1 font-nokia-bold leading-snug text-justify`,
  huge: tw`text-primary-1 font-nokia-bold text-3xl`,
  large: tw`text-primary-1 font-nokia-bold text-2xl`,
  small: tw`text-primary-1 font-nokia-bold text-sm`,
  default: tw`text-primary-1 font-nokia-bold text-lg`,
  bold: tw`font-nokia-bold`,
  italic: tw`font-nokia-bold italic`,
  underline: tw`underline`,
  list: tw`my-2`,
  listItem: tw`flex-row items-baseline`,
  listItemText: tw`text-primary-1 font-nokia-bold`,
  center: {
    alignItems: 'center',
  },
  right: {
    alignItems: 'flex-end',
  },
  left: {
    alignItems: 'flex-start',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default TextComponent;
