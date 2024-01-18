import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  List,
  User,
  CaretCircleDown,
  Star,
  ArrowSquareLeft,
  PencilSimple,
} from 'phosphor-react-native';
import tw from './../../../tailwind';
import {useNavigation} from '@react-navigation/native';

const DisplayCourse = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('MyHome');
  };

  return (
    <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex flex-row justify-between my-4 text-secondary-6`}>
          <List size={32} weight="bold" style={tw`text-secondary-6`} />
          <Text style={tw`font-nokia-bold text-xl text-secondary-6`}>
            Course
          </Text>
          <User size={32} weight="bold" style={tw`text-secondary-6`} />
        </View>
        <View style={tw`flex flex-row w-100% gap-4`}>
          <TouchableOpacity onPress={handleButtonPress} style={tw``}>
            <ArrowSquareLeft size={36} weight="fill" color={'#EA9215'} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search courses..."
            style={tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold w-86%`}
          />
        </View>
        <Image
          source={require('./../../assets/intro.png')}
          style={tw`w-98 h-56 mt-4`}
          resizeMode="contain"
        />
        <Text style={tw`font-nokia-bold text-accent-6 text-xl mt-4`}>
          የአጠናን ዘዴዎች
        </Text>
        <Text
          style={tw`font-nokia-bold text-secondary-6 text-2xl leading-tight`}>
          ፍሬያማ የመጽሃፍ ቅዱስ አጠናን ዘዴዎች
        </Text>
        <View style={tw`flex flex-row items-center gap-2 mt-2`}>
          <PencilSimple size={24} weight="fill" color={'#EA9215'} />
          <Text style={tw`font-nokia-bold text-accent-6 text-lg`}>
            ፓ/ር መልዓክ አለማየሁ
          </Text>
        </View>
        <View style={tw`border-b border-accent-6 my-4`}></View>
        <Text
          style={tw`font-nokia-bold text-secondary-6 text-lg leading-tight text-justify`}>
          {'   '}
          መጽሃፍ ቅዱስን በተለያየ መንገድ ማጥናት ይቻላል። ነገር ግን ፍሪያማ ከሆኑት መንገዶች መካከል የሚከተሉት ወሳኝ
          ነጥቦችን ይይዛሉ። ከእነዚህም መካከል ሰባቱን አንድ በአንድ … ቪድዮ ጌሞችን ማዘውተር እና የተለያዩ ገጾችን
          መመልከት የታዳጊ ልጆች የለተለት ተግባር እየሆነ መጥⶆል. ሆኖም ግን ይህ ተግባር በጎም መጥፎም ጎኖች አሉት::
          በጎ ተግባር ልንላቸው ከምንችለው ነገሮች መሃከል አንዱ ታዳጊዎችን በእውቀት እንዲዳብሩ ይረዳል::
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisplayCourse;
