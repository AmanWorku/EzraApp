import {View, Text, Pressable, Image} from 'react-native';
import {SafeAreaView} from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';
import Button from '../components/Button';

const styles = {
  flexContainer: {
    flex: 1,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: 'absolute',
    top: 10,
  },
  imageContainer2: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: 'absolute',
    top: -30,
    left: 100,
  },
  imageContainer3: {
    width: 100,
    height: 100,
    borderRadius: 20,
    position: 'absolute',
    top: 130,
    left: -50,
  },
  imageContainer4: {
    height: 200,
    width: 200,
    borderRadius: 20,
    position: 'absolute',
    top: 110,
    left: 100,
  },
  contentContainer: {
    paddingHorizontal: 22,
    position: 'absolute',
    top: 400,
    width: '100%',
  },
  title: {
    fontSize: 50,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 46,
    fontWeight: '800',
  },
  textContainer: {
    marginVertical: 22,
  },
  text: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 22,
    width: '100%',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
};

const Welcome = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}>
      <View style={styles.flexContainer}>
        <View>
          <Image
            source={require('../assets/hero1.jpg')}
            style={[
              styles.imageContainer,
              {
                transform: [
                  {translateX: 20},
                  {translateY: 50},
                  {rotate: '-15deg'},
                ],
              },
            ]}
          />

          <Image
            source={require('../assets/hero3.jpg')}
            style={[
              styles.imageContainer2,
              {
                transform: [
                  {translateX: 50},
                  {translateY: 50},
                  {rotate: '-5deg'},
                ],
              },
            ]}
          />

          <Image
            source={require('../assets/hero3.jpg')}
            style={[
              styles.imageContainer3,
              {
                transform: [
                  {translateX: 50},
                  {translateY: 50},
                  {rotate: '15deg'},
                ],
              },
            ]}
          />

          <Image
            source={require('../assets/hero2.jpg')}
            style={[
              styles.imageContainer4,
              {
                transform: [
                  {translateX: 50},
                  {translateY: 50},
                  {rotate: '-15deg'},
                ],
              },
            ]}
          />
        </View>

        {/* content  */}

        <View style={styles.contentContainer}>
          <Text style={[styles.title, {color: COLORS.white}]}>Let's Get</Text>
          <Text style={[styles.subtitle, {color: COLORS.white}]}>Started</Text>

          <View style={styles.textContainer}>
            <Text
              style={[styles.text, {color: COLORS.white, marginVertical: 4}]}>
              Connect with each other with chatting
            </Text>
            <Text style={[styles.text, {color: COLORS.white}]}>
              Calling, Enjoy Safe and private texting
            </Text>
          </View>

          <Button
            title="Join Now"
            onPress={() => navigation.navigate('Signup')}
            style={styles.buttonContainer}
          />

          <View style={styles.linkContainer}>
            <Text style={[styles.text, {color: COLORS.white}]}>
              Already have an account ?
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text
                style={[styles.text, styles.linkText, {color: COLORS.white}]}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
