import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import tw from './../../../tailwind';
import {useNavigation} from '@react-navigation/native';
import {ArrowSquareLeft} from 'phosphor-react-native';

const CourseContent = () => {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 h-70`}>
          <ImageBackground
            source={require('./../../assets/bible2.jpeg')}
            style={tw`flex-5`}>
            <ArrowSquareLeft
              size={36}
              weight="fill"
              color={'#EA9215'}
              style={tw`px-8 mt-4`}
            />
          </ImageBackground>
          <View style={tw`flex-1 bg-primary-7 flex-row gap-2 items-center`}>
            <View style={tw`ml-6 p-1 bg-accent-6 rounded-1`}>
              <Text style={tw`font-nokia-bold text-primary-1`}>10%</Text>
            </View>
            <Text>Pass 100% of your lessons to complete this course</Text>
          </View>
        </View>
        <View style={tw`flex mx-auto w-[92%]`}>
          <Text>ፍሬያማ የመጽሃፍ ቅዱስ አጠናን ዘዴዎች</Text>
          <Text>
            {' '}
            መጽሃፍ ቅዱስን በተለያየ መንገድ ማጥናት ይቻላል። ነገር ግን ፍሪያማ ከሆኑት መንገዶች መካከል የሚከተሉት
            ወሳኝ ነጥቦችን ይይዛሉ። ከእነዚህም... More{' '}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseContent;
