import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import tw from './../../../tailwind';
import {DotsThreeOutlineVertical} from 'phosphor-react-native';
import {useFocusEffect} from '@react-navigation/native';

const SlideSample2 = () => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true);
      return () => StatusBar.setHidden(false);
    }, []),
  );
  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        source={require('./../../assets/bible6.jpeg')}
        style={tw`flex-1 p-2`}>
        <View style={tw`absolute inset-0 bg-accent-9 bg-opacity-80`} />
        <View style={tw`flex-1 justify-between pt-8 px-2`}>
          <View style={tw`flex-none`}>
            <View style={tw`flex flex-row items-center justify-between`}>
              <View style={tw`flex flex-row items-center gap-3`}>
                <View style={tw`pr-2 border-r border-primary-1`}>
                  <Image
                    source={require('./../../assets/LogoSmall.png')}
                    style={tw`w-22 h-11`}
                    resizeMode="contain"
                  />
                </View>
                <Text style={tw`font-nokia-bold text-primary-1 text-sm`}>
                  ክፍል ሦስት - የጥሞና ጥናት
                </Text>
              </View>
              <View style={tw`flex flex-row items-center gap-1`}>
                <Text style={tw`font-nokia-bold text-primary-1 text-lg`}>
                  4/15
                </Text>
                <DotsThreeOutlineVertical weight="fill" color="#EA9215" />
              </View>
            </View>
            <View style={tw`border-b border-accent-6 mt-2`} />
          </View>
          <ScrollView
            contentContainerStyle={tw` flex-grow justify-center pt-8 px-2`}
            showsVerticalScrollIndicator={false}>
            <View style={tw`flex gap-4`}>
              <Text
                style={tw`font-nokia-bold text-2xl text-primary-1 text-center`}>
                ቃሉን በሕይወታችን የመለማመድ አስፈላጊነት
              </Text>
              <Text style={tw`font-nokia-bold text-xl text-primary-1`}>
                ማስተዋልን ይጨምራል
              </Text>
              <View
                style={tw`w-95% border-2 border-accent-7 shadow-lg self-center`}>
                <Image
                  source={require('./../../assets/day1.jpeg')}
                  style={tw`w-full h-54`}
                  resizeMode="cover"
                />
              </View>
              <Text style={tw`font-nokia-bold text-xl text-primary-1`}>
                1. ፈቃዱን እንደሚገባ ለማስተዋል እንደሚገባ ለማስተዋል
              </Text>
              <Text
                style={tw`font-nokia-bold text-lg text-primary-1 text-justify`}>
                {'   '}ቃሉን በሕይወታችን እስክንለማመደው ድረስ እንደሚገባ ልናስተውለው አንችልም። የእግዚአብሔርን
                ቃል በተግባር ላይ ማዋል በብርሃን ውስጥ ብርሃንን ለማየት የሚያስችለን ብቸኛው ጎዳና ነው። ጌታችን
                አኢየሱስ ይዞት የመጣውን ድንቅ መገለጥ ለመረዳት የቻሉት በትህትና እርሱን ለመታዘዝ ዝቅ ያሉት እንጂ
                በእውቀታቸው አንቱ የተባሉት ሊቃውንት አልነበሩም። “የሰማይና የምድር ጌታ አባት ሆይ፤ ይህን
                ከጥበበኞችና ከዐዋቂዎች ሰውረህ ለሕፃናት ስለ ገለጥህላቸው አመሰግንሃለሁ፤ “ ማቴ 11፡ 25
              </Text>
              <Text style={tw`font-nokia-bold text-xl text-primary-1`}>
                ማስተዋልን ይጨምራል
              </Text>
              <View
                style={tw`w-95% border-2 border-accent-7 shadow-lg self-center`}>
                <Image
                  source={require('./../../assets/phoneandbible.jpeg')}
                  style={tw`w-full h-54`}
                  resizeMode="cover"
                />
              </View>
              <Text style={tw`font-nokia-bold text-xl text-primary-1`}>
                2. ፈቃዱን እንደሚገባ ለማስተዋል እንደሚገባ ለማስተዋል
              </Text>
              <Text
                style={tw`font-nokia-bold text-lg text-primary-1 text-justify`}>
                {'   '}ቃሉን በሕይወታችን እስክንለማመደው ድረስ እንደሚገባ ልናስተውለው አንችልም። የእግዚአብሔርን
                ቃል በተግባር ላይ ማዋል በብርሃን ውስጥ ብርሃንን ለማየት የሚያስችለን ብቸኛው ጎዳና ነው። ጌታችን
                አኢየሱስ ይዞት የመጣውን ድንቅ መገለጥ ለመረዳት የቻሉት በትህትና እርሱን ለመታዘዝ ዝቅ ያሉት እንጂ
                በእውቀታቸው አንቱ የተባሉት ሊቃውንት አልነበሩም። “የሰማይና የምድር ጌታ አባት ሆይ፤ ይህን
                ከጥበበኞችና ከዐዋቂዎች ሰውረህ ለሕፃናት ስለ ገለጥህላቸው አመሰግንሃለሁ፤ “ ማቴ 11፡ 25
              </Text>
            </View>
          </ScrollView>
          <View style={tw`flex-none`}>
            <View style={tw`border-b border-accent-6 my-2`} />
            <TouchableOpacity
              style={tw`bg-accent-6 px-4 py-2 rounded-full w-36 my-2 mx-auto`}>
              <Text
                style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                ቀጥል
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SlideSample2;
