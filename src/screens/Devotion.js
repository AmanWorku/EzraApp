import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {useSelector} from 'react-redux';
import {
  List,
  User,
  ArrowSquareUpRight,
  DownloadSimple,
  ShareNetwork,
} from 'phosphor-react-native';
import tw from './../../tailwind';

const Devotion = () => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const handleDownload = async () => {
    try {
      const url =
        'https://img.freepik.com/free-photo/holy-bible-with-rays-light-coming-out-ai-generative_123827-23906.jpg';
      const fileName = 'bible.jpg';

      const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      const options = {
        fromUrl: url,
        toFile: downloadDest,
        background: true,
        begin: res => {
          console.log('Download has begun', res);
        },
        progress: res => {
          let percentage = ((100 * res.bytesWritten) / res.contentLength) | 0;
          console.log(`Progress ${percentage}%`);
        },
      };

      const result = await RNFS.downloadFile(options).promise;

      if (result.statusCode == 200) {
        console.log('File downloaded to:', downloadDest);
        // You can share or open the file here if necessary.
      } else {
        console.log('Download failed with status code:', result.statusCode);
      }
    } catch (error) {
      console.error('Error during download:', error);
    }
  };

  const handleShare = async () => {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/day18.png`; // Update the path as needed
      const shareOptions = {
        title: 'Share file',
        message: 'Share file with:',
        url: `file://${filePath}`,
        type: 'image/png', // Updated MIME type for a .png image
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error during sharing:', error);
    }
  };

  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`flex flex-row justify-between my-4`}>
            <List
              size={32}
              weight="bold"
              style={[
                tw`text-secondary-6`,
                darkMode ? tw`text-primary-1` : null,
              ]}
            />
            <Text
              style={[
                tw`font-nokia-bold text-xl text-secondary-6`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              Devotional
            </Text>
            <User
              size={32}
              weight="bold"
              style={[
                tw`text-secondary-6`,
                darkMode ? tw`text-primary-1` : null,
              ]}
            />
          </View>
          <View>
            <TextInput
              placeholder="Search devotionals..."
              style={[
                tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold`,
                darkMode ? tw`text-primary-1` : null,
              ]}
              placeholderTextColor={darkMode ? '#898989' : '#AAB0B4'}
            />
          </View>
          <View style={tw`flex flex-row mt-6 justify-between`}>
            <View style={tw`w-70%`}>
              <Text
                style={[
                  tw`font-nokia-bold text-secondary-6 text-4xl leading-tight`,
                  darkMode ? tw`text-primary-1` : null,
                ]}>
                ያከብረኛል
              </Text>
              <View style={tw`border-b border-accent-6 mb-1`} />
              <Text
                style={[
                  tw`font-nokia-bold text-secondary-6 text-sm`,
                  darkMode ? tw`text-primary-1` : null,
                ]}>
                የዕለቱ የመጽሐፍ ቅዱስ ንባብ ክፍል -
              </Text>
              <Text
                style={tw`font-nokia-bold text-accent-6 text-xl leading-tight`}>
                መዝ 51:16-23
              </Text>
            </View>
            <View
              style={tw`flex items-center justify-center border border-accent-6 p-2 rounded-4 w-20 h-20`}>
              <View
                style={tw`flex justify-center gap-[-1] bg-secondary-6 rounded-2 w-16 h-16`}>
                <Text style={tw`font-nokia-bold text-primary-1 text-center`}>
                  ታህሳስ
                </Text>
                <Text
                  style={tw`font-nokia-bold text-primary-1 text-4xl leading-tight text-center`}>
                  18
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              tw`border border-accent-6 p-4 rounded-4 mt-4 bg-primary-5 shadow-lg`,
              darkMode ? tw`bg-secondary-8` : null,
            ]}>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-6 text-lg leading-tight`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              "የምስጋናን መሥዋዕት የሚሠዋ ያከብረኛል፤" መዝሙር 51:23
            </Text>
          </View>
          <View style={tw`mt-2`}>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-6 text-sm leading-snug text-justify my-2`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              {'  '}
              አምላካችን እግዚአብሔር ላደረገልን ዘርዝረንና ቆጥረን ስለማንጨርሰው እጅግ የበዛ መልካምነቱ ምስጋና እጅግ
              በጣም ያንስበታል። ግን ከዚያ ሌላ የምንሰጠው ምንም ስለሌለ ከልባችን የመነጨ እውነተኛ ምሥጋና ለእርሱ
              ልንሰዋ ይገባል። እርሱም የጠየቀን ይህንኑ ነው። "የምስጋናን መሥዋዕት የሚሠዋ ያከብረኛል፤" መዝሙር
              50:23
            </Text>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-6 text-sm leading-snug text-justify my-2`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              {'  '}
              በምሥጋና ደግሞ ታላቅ ድል አለ። ንጉስ ኢዮሳፋጥ እጅግ አስፈሪ በሆነ የጠላት ጦር በተከበበ ጊዜ
              “እግዚአብሔርን አመስግኑ፣ ፍቅሩ ለዘላለም ጸንቶ ይኖራልና” የሚሉ መዘምራን ከሠራዊቱ ፊት ቀድመው
              እንዲሄዱ መደበ። “መዘመርና ማወደስ እንደ ጀመሩም፣ እግዚአብሔር ይሁዳን በወረሩት በአሞን፣ በሞዓብና
              በሴይር ተራራ ሰዎች ላይ ድብቅ ጦር አመጣባቸው፤ ተሸነፉም።” 2 ዜና 20:22
            </Text>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-6 text-sm leading-snug text-justify my-2`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              {'  '}
              ጳውሎስና ሲላስ እጅግ ከደረሰባቸው ከባድ ድብደባና የእስር እንግልት የተነሳ እጅግ በከባድ ስይቃ ውስጥ
              ሆነው ሳለ የሆነውን ቅዱስ ቃሉ እንዲህ ይለናል፦ “እኩለ ሌሊት አካባቢ ጳውሎስና ሲላስ እየጸለዩና
              እየዘመሩ እግዚአብሔርን ሲያመሰግኑ ነበር፤ ሌሎቹ እስረኞችም ያዳምጧቸው ነበር። ድንገትም የወህኒ ቤቱን
              መሠረት የሚያናውጥ ታላቅ የመሬት መንቀጥቀጥ ሆነ፤ ወዲያውም የወህኒ ቤቱ በሮች ተከፈቱ፤ የሁሉም እስራት
              ተፈታ።” የሐዋ 16፡ 25፣ 26
            </Text>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-6 text-sm leading-snug text-justify my-2`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              {'  '}
              በእርግጥም የእግዚአብሔርን መልካምነትና ለዘላለም ጸንቶ የሚኖረውን የእርሱን ፍቅር በማሰብ በምስጋና
              ውስጣችን ሲሞላ በጠላታችን ላይ ድል የምንቀዳጅበትን መለኮታዊ ኃይል እንለማመዳለን።
            </Text>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-6 text-sm leading-snug text-justify my-2`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              {'  '}
              እጅግ ከባድ በሆነ የሕይወት እኩለ ሌሊት ውስጥ ሆነንም ቢሆን እግዚአብሔርን ስናመሰግን፣ የተዘጋብን በር
              ሲከፈት እስራታችንም ሲበጠስ እናየዋለን። ተስፋን የሰጠን እርሱ የታመነ ነውና የተስፋውን ቃል በእምነት
              አጥብቀን ስንይዝ አንደበታችን በምስጋና ይሞላል። ጉልበታችን ይታደሳል። ለእግዚአብሔር ብዙ ክብር የሚያመጣ
              ሕይወት እንኖራለን።
            </Text>
          </View>
          <View
            style={[
              tw`border border-accent-6 p-4 rounded-4 mt-4 bg-primary-4 shadow-sm mb-2`,
              darkMode ? tw`bg-secondary-8` : null,
            ]}>
            <Text
              style={tw`font-nokia-bold text-accent-6 text-sm leading-tight text-center`}>
              አባት ሆይ፣ በእርግጥም አንተን ማመስገን መልካም እንደሆነ ተረድተን በምስጋና የተሞላ ሕይወት እንድንኖርና
              ማጉረምረም ከእኛ እንዲርቅ በጸጋህ እርዳን። አሜን።
            </Text>
          </View>
          <View
            style={tw`border border-accent-6 rounded-4 mt-4 overflow-hidden`}>
            <Image
              source={require('./../assets/day18.png')}
              style={tw`w-full h-96`}
              resizeMode="cover"
            />
            <View style={tw`flex flex-row gap-2 justify-center my-4`}>
              <TouchableOpacity
                style={tw`flex flex-row items-center gap-2 px-2 py-1 bg-accent-6 rounded-4`}
                onPress={handleDownload}>
                <Text style={tw`font-nokia-bold text-primary-1`}>
                  {' '}
                  ምስሉን አውርድ
                </Text>
                <DownloadSimple
                  size={28}
                  weight="bold"
                  style={tw`text-primary-1`}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex flex-row items-center gap-2 px-2 py-1 bg-accent-6 rounded-4`}
                onPress={handleShare}>
                <Text style={tw`font-nokia-bold text-primary-1`}>
                  {' '}
                  ምስሉን አጋራ
                </Text>
                <ShareNetwork
                  size={28}
                  weight="bold"
                  style={tw`text-primary-1`}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`border-b border-primary-7 mt-4 mb-4`} />
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-4 text-lg`,
                darkMode ? tw`text-primary-3` : null,
              ]}>
              Discover Devotionals
            </Text>
            <TouchableOpacity
              style={tw`border border-accent-6 px-4 py-1 rounded-4`}>
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                All Devotionals
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row flex-wrap h-88 gap-4 mt-4`}>
            <View
              style={tw`w-[47.5%] h-[45%] flex flex-col gap-8 rounded-2 overflow-hidden`}>
              <ImageBackground
                source={require('./../assets/bible.png')}
                style={tw`overflow-hidden p-2`}>
                <ArrowSquareUpRight
                  size={32}
                  weight="fill"
                  style={tw`text-secondary-1 self-end`}
                  color={'#FDFDFD'}
                />
                <Text style={tw`font-nokia-bold mt-22 text-primary-1 text-lg`}>
                  ታህሳስ 18
                </Text>
              </ImageBackground>
            </View>
            <View
              style={tw`w-[47.5%] h-[45%] flex flex-col gap-8 rounded-2 overflow-hidden`}>
              <ImageBackground
                source={require('./../assets/day22.png')}
                style={tw`overflow-hidden p-2`}>
                <ArrowSquareUpRight
                  size={32}
                  weight="fill"
                  style={tw`text-secondary-1 self-end`}
                  color={'#FDFDFD'}
                />
                <Text style={tw`font-nokia-bold mt-22 text-primary-1 text-lg`}>
                  ታህሳስ 17
                </Text>
              </ImageBackground>
            </View>
            <View
              style={tw`w-[47.5%] h-[45%] flex flex-col gap-8 rounded-2 overflow-hidden`}>
              <ImageBackground
                source={require('./../assets/day4.jpeg')}
                style={tw`overflow-hidden p-2`}>
                <View>
                  <ArrowSquareUpRight
                    size={32}
                    weight="fill"
                    style={tw`text-secondary-1 self-end`}
                    color={'#FDFDFD'}
                  />
                  <Text
                    style={tw`font-nokia-bold mt-22 text-primary-1 text-lg`}>
                    ታህሳስ 16
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View
              style={tw`w-[47.5%] h-[45%] flex flex-col gap-8 rounded-2 overflow-hidden`}>
              <ImageBackground
                source={require('./../assets/day1.jpeg')}
                style={tw`overflow-hidden p-2`}>
                <View>
                  <ArrowSquareUpRight
                    size={32}
                    weight="fill"
                    style={tw`text-secondary-1 self-end`}
                    color={'#FDFDFD'}
                  />
                  <Text
                    style={tw`font-nokia-bold mt-22 text-primary-1 text-lg`}>
                    ታህሳስ 15
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Devotion;
