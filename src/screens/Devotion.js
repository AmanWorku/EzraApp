import {View, Text, ScrollView, SafeAreaView, TextInput} from 'react-native';
import React from 'react';
import {
  List,
  User,
  BookOpenText,
  ArrowSquareUpRight,
} from 'phosphor-react-native';
import tw from './../../tailwind';

const Devotion = () => {
  return (
    <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex flex-row justify-between my-4 text-secondary-6`}>
          <List size={32} weight="bold" style={tw`text-secondary-6`} />
          <Text style={tw`font-nokia-bold text-xl text-secondary-6`}>
            Devotional
          </Text>
          <User size={32} weight="bold" style={tw`text-secondary-6`} />
        </View>
        <View>
          <TextInput
            placeholder="Search devotionals..."
            style={tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold`}
          />
        </View>
        <View style={tw`flex flex-row mt-6 gap-4`}>
          <View style={tw`w-70%`}>
            <Text
              style={tw`font-nokia-bold text-secondary-6 text-4xl leading-tight`}>
              ያከብረኛል
            </Text>
            <View style={tw`border-b border-accent-6 mb-1`}></View>
            <Text style={tw`font-nokia-bold text-secondary-6 text-sm`}>
              የዕለቱ የመጽሐፍ ቅዱስ ንባብ ክፍል -
            </Text>
            <Text
              style={tw`font-nokia-bold text-accent-6 text-xl leading-tight`}>
              መዝ 51:16-23
            </Text>
          </View>
          <View style={tw`border border-accent-6 p-2 rounded-4 h-24`}>
            <View style={tw`bg-secondary-6 p-2 rounded-3 h-19.5`}>
              <Text style={tw`font-nokia-bold text-primary-1 text-center`}>
                ታህሳስ
              </Text>
              <Text
                style={tw`font-nokia-bold text-primary-1 text-4xl leading-tight mt-[-8]`}>
                18
              </Text>
            </View>
          </View>
        </View>
        <View
          style={tw`border border-accent-6 p-4 rounded-4 mt-4 bg-primary-5 shadow-lg`}>
          <Text
            style={tw`font-nokia-bold text-secondary-6 text-lg leading-tight`}>
            "የምስጋናን መሥዋዕት የሚሠዋ ያከብረኛል፤" መዝሙር 51:23
          </Text>
        </View>
        <View>
          <Text style={tw``}>
            አምላካችን እግዚአብሔር ላደረገልን ዘርዝረንና ቆጥረን ስለማንጨርሰው እጅግ የበዛ መልካምነቱ ምስጋና እጅግ
            በጣም ያንስበታል። ግን ከዚያ ሌላ የምንሰጠው ምንም ስለሌለ ከልባችን የመነጨ እውነተኛ ምሥጋና ለእርሱ
            ልንሰዋ ይገባል። እርሱም የጠየቀን ይህንኑ ነው። "የምስጋናን መሥዋዕት የሚሠዋ ያከብረኛል፤" መዝሙር
            50:23
          </Text>
          <Text>
            በምሥጋና ደግሞ ታላቅ ድል አለ። ንጉስ ኢዮሳፋጥ እጅግ አስፈሪ በሆነ የጠላት ጦር በተከበበ ጊዜ
            “እግዚአብሔርን አመስግኑ፣ ፍቅሩ ለዘላለም ጸንቶ ይኖራልና” የሚሉ መዘምራን ከሠራዊቱ ፊት ቀድመው እንዲሄዱ
            መደበ። “መዘመርና ማወደስ እንደ ጀመሩም፣ እግዚአብሔር ይሁዳን በወረሩት በአሞን፣ በሞዓብና በሴይር ተራራ
            ሰዎች ላይ ድብቅ ጦር አመጣባቸው፤ ተሸነፉም።” 2 ዜና 20:22
          </Text>
          <Text>
            ጳውሎስና ሲላስ እጅግ ከደረሰባቸው ከባድ ድብደባና የእስር እንግልት የተነሳ እጅግ በከባድ ስይቃ ውስጥ ሆነው
            ሳለ የሆነውን ቅዱስ ቃሉ እንዲህ ይለናል፦ “እኩለ ሌሊት አካባቢ ጳውሎስና ሲላስ እየጸለዩና እየዘመሩ
            እግዚአብሔርን ሲያመሰግኑ ነበር፤ ሌሎቹ እስረኞችም ያዳምጧቸው ነበር። ድንገትም የወህኒ ቤቱን መሠረት
            የሚያናውጥ ታላቅ የመሬት መንቀጥቀጥ ሆነ፤ ወዲያውም የወህኒ ቤቱ በሮች ተከፈቱ፤ የሁሉም እስራት ተፈታ።”
            የሐዋ 16፡ 25፣ 26
          </Text>
          <Text>
            በእርግጥም የእግዚአብሔርን መልካምነትና ለዘላለም ጸንቶ የሚኖረውን የእርሱን ፍቅር በማሰብ በምስጋና ውስጣችን
            ሲሞላ በጠላታችን ላይ ድል የምንቀዳጅበትን መለኮታዊ ኃይል እንለማመዳለን።
          </Text>
          <Text>
            እጅግ ከባድ በሆነ የሕይወት እኩለ ሌሊት ውስጥ ሆነንም ቢሆን እግዚአብሔርን ስናመሰግን፣ የተዘጋብን በር
            ሲከፈት እስራታችንም ሲበጠስ እናየዋለን። ተስፋን የሰጠን እርሱ የታመነ ነውና የተስፋውን ቃል በእምነት
            አጥብቀን ስንይዝ አንደበታችን በምስጋና ይሞላል። ጉልበታችን ይታደሳል። ለእግዚአብሔር ብዙ ክብር የሚያመጣ
            ሕይወት እንኖራለን።
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Devotion;