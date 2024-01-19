import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import tw from './../../../tailwind';
import {useNavigation} from '@react-navigation/native';
import {ArrowSquareLeft, CheckCircle, Circle} from 'phosphor-react-native';

const CourseContent = () => {
  const navigation = useNavigation();
  const backButtonPress = () => {
    navigation.navigate('DisplayCourse');
  };
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 h-70`}>
          <ImageBackground
            source={require('./../../assets/bible2.jpeg')}
            style={tw`flex-5`}>
            <TouchableOpacity onPress={backButtonPress}>
              <ArrowSquareLeft
                size={36}
                weight="fill"
                color={'#EA9215'}
                style={tw`px-8 mt-4`}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View style={tw`flex-1 bg-primary-7 flex-row gap-2 items-center`}>
            <View style={tw`ml-6 p-1 bg-accent-6 rounded-1`}>
              <Text style={tw`font-nokia-bold text-primary-1`}>10%</Text>
            </View>
            <Text>Pass 100% of your lessons to complete this course</Text>
          </View>
        </View>
        <View style={tw`flex mx-auto w-[92%]`}>
          <Text style={tw`font-nokia-bold text-secondary-6 text-2xl mt-2`}>
            ፍሬያማ የመጽሃፍ ቅዱስ አጠናን ዘዴዎች
          </Text>
          <Text
            style={tw`font-nokia-bold text-secondary-6 text-justify text-lg leading-tight my-3`}>
            {'    '}
            መጽሃፍ ቅዱስን በተለያየ መንገድ ማጥናት ይቻላል። ነገር ግን ፍሪያማ ከሆኑት መንገዶች መካከል የሚከተሉት
            ወሳኝ ነጥቦችን ይይዛሉ። ከእነዚህም... More
          </Text>
          <View style={tw`flex flex-row items-center`}>
            <View style={tw`border-b-4 border-accent-6`}>
              <Text style={tw`py-2`}>ትምህርቶች</Text>
            </View>
            <View style={tw`border-b border-accent-6 h-4 flex-grow mt-5`} />
          </View>
          <View>
            <View
              style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
              <View style={tw`flex`}>
                <Text style={tw`font-nokia-bold text-secondary-6 text-lg`}>
                  ክፍል ሁለት- የሰባቱ የአጠናን ዘዴዎች ዳሰሳ
                </Text>
                <Text style={tw`font-nokia-bold text-accent-6 text-xs`}>
                  15/15 Slides
                </Text>
              </View>
              <CheckCircle size={20} weight="fill" color={'#EA9215'} />
            </View>
            <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
          </View>
          <View>
            <View
              style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
              <View style={tw`flex`}>
                <Text style={tw`font-nokia-bold text-secondary-6 text-lg`}>
                  ክፍል ሦስት- የጥሞና ጥናት
                </Text>
                <Text style={tw`font-nokia-bold text-accent-6 text-xs`}>
                  0/15 Slides
                </Text>
              </View>
              <Circle size={20} color={'#EA9215'} />
            </View>
            <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
          </View>
          <View>
            <View
              style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
              <View style={tw`flex`}>
                <Text style={tw`font-nokia-bold text-secondary-6 text-lg`}>
                  ክፍል አራት- የመጽሐፍ ጥናት
                </Text>
                <Text style={tw`font-nokia-bold text-accent-6 text-xs`}>
                  0/15 Slides
                </Text>
              </View>
              <Circle size={20} color={'#EA9215'} />
            </View>
            <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
          </View>
          <View>
            <View
              style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
              <View style={tw`flex`}>
                <Text style={tw`font-nokia-bold text-secondary-6 text-lg`}>
                  ክፍል አምስት- የምዕራፍ ጥናት
                </Text>
                <Text style={tw`font-nokia-bold text-accent-6 text-xs`}>
                  0/15 Slides
                </Text>
              </View>
              <Circle size={20} color={'#EA9215'} />
            </View>
            <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
          </View>
          <View>
            <View
              style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
              <View style={tw`flex`}>
                <Text style={tw`font-nokia-bold text-secondary-6 text-lg`}>
                  ክፍል ስድስት- የጥቅስ ጥናት
                </Text>
                <Text style={tw`font-nokia-bold text-accent-6 text-xs`}>
                  0/15 Slides
                </Text>
              </View>
              <Circle size={20} color={'#EA9215'} />
            </View>
            <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
          </View>
          <View>
            <View
              style={tw`flex flex-row justify-between px-4 py-2 items-center`}>
              <View style={tw`flex`}>
                <Text style={tw`font-nokia-bold text-secondary-6 text-lg`}>
                  ክፍል ሰባት- የርዕስ ጥናት
                </Text>
                <Text style={tw`font-nokia-bold text-accent-6 text-xs`}>
                  0/15 Slides
                </Text>
              </View>
              <Circle size={20} color={'#EA9215'} />
            </View>
            <View style={tw`border-b border-accent-6 h-1 flex-grow`} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseContent;
