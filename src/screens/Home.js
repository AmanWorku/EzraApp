import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {
  List,
  User,
  BookOpenText,
  ArrowSquareUpRight,
} from 'phosphor-react-native';
import {useSelector} from 'react-redux';
import tw from './../../tailwind';
import {useNavigation} from '@react-navigation/native';
import {useGetDevotionsQuery} from '../redux/api-slices/apiSlice';

const Home = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const darkMode = useSelector(state => state.ui.darkMode);
  const {data: devotionals = [], isFetching, refetch} = useGetDevotionsQuery();
  const lastDevotional = devotionals[devotionals.length - 1] || {};
  const handleButtonPress = () => {
    navigation.navigate('CourseContent');
  };
  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);
  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={['#EA9215']}
              tintColor="#EA9215"
            />
          }>
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
              Home
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
              placeholder="Search anything..."
              style={[
                tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold`,
                darkMode ? tw`text-primary-1` : null,
              ]}
              placeholderTextColor={darkMode ? '#898989' : '#AAB0B4'}
            />
          </View>
          <View
            style={[
              tw`border-2 border-accent-6 mt-6 rounded-4 bg-primary-6 shadow-lg px-4 py-4`,
              darkMode ? tw`bg-secondary-8` : null,
            ]}>
            <View
              style={tw`flex flex-row w-[100%] justify-between items-center`}>
              <View style={tw`flex flex-row items-center gap-2`}>
                <BookOpenText
                  size={32}
                  weight="bold"
                  style={tw`text-accent-6`}
                />
                <Text
                  style={[
                    tw`text-secondary-6 font-nokia-bold text-lg`,
                    darkMode ? tw`text-primary-2` : null,
                  ]}>
                  የዕለቱ ጥቅስ
                </Text>
              </View>
              <TouchableOpacity
                style={tw`bg-accent-6 px-4 py-1 rounded-full`}
                onPress={() => navigation.navigate('Devotional')}>
                <Text style={tw`text-primary-1 font-nokia-bold text-sm`}>
                  Open
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tw`border-b border-accent-6 mt-2 mb-1`} />
            <View>
              <Text
                style={[
                  tw`font-nokia-bold text-lg text-secondary-6`,
                  darkMode ? tw`text-primary-2` : null,
                ]}>
                {lastDevotional.verse}
              </Text>
            </View>
          </View>
          <View style={tw`border-b border-primary-7 mt-4 mb-2`} />
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-5 text-lg`,
                darkMode ? tw`text-primary-7` : null,
              ]}>
              Continue Studying
            </Text>
            <TouchableOpacity
              style={tw`border border-accent-6 px-4 py-1 rounded-4`}>
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                All Courses
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`border border-accent-6 mt-4 rounded-4 p-2`}>
            {/* <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={tw`mt-4`}>
          <View style={tw`flex flex-row items-center gap-4`}>
            <View style={tw`border border-accent-6 rounded-4 px-4 py-4`}>
              <Text style={tw`font-nokia-bold text-lg text-secondary-6`}>
                የአማርኛ ትምህርት መጽሐፍ ቅዱስ
              </Text>
              <Text style={tw`font-nokia-light text-lg text-secondary-6`}>
                በአማርኛ ትምህርት መጽሐፍ ቅዱስ ለመጻፍ የሚያስችል መልክ ነው።
              </Text>
            </View>
            <View style={tw`border border-accent-6 rounded-4 px-4 py-4`}>
              <Text style={tw`font-nokia-bold text-lg text-secondary-6`}>
                የአማርኛ ትምህርት መጽሐፍ ቅዱስ
              </Text>
              <Text style={tw`font-nokia-light text-lg text-secondary-6`}>
                በአማርኛ ትምህርት መጽሐፍ ቅዱስ ለመጻፍ የሚያስችል መልክ ነው።
              </Text>
            </View>
          </View>
        </ScrollView> */}
            <View style={tw`h-48`}>
              <Image
                source={require('./../assets/bible.png')}
                style={tw`w-full h-full rounded-3`}
              />
            </View>
            <Text style={tw`font-nokia-bold text-accent-6 text-xl mt-2`}>
              የአጠናን ዘዴዎች
            </Text>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-6 text-2xl`,
                darkMode ? tw`text-primary-3` : null,
              ]}>
              ፍሬያማ የመጽሃፍ ቅዱስ አጠናን ዘዴዎች
            </Text>
            <TouchableOpacity
              style={tw`bg-accent-6 px-4 py-2 rounded-full w-36 mt-2`}
              onPress={handleButtonPress}>
              <Text
                style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                ኮርሱን ክፈት
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`border-b border-primary-7 mt-4 mb-2`} />
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-4 text-lg`,
                darkMode ? tw`text-primary-7` : null,
              ]}>
              Study this week's SSL
            </Text>
            <TouchableOpacity
              style={tw`border border-accent-6 px-4 py-1 rounded-4`}>
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                All SSLs
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={tw`flex flex-row border border-accent-6 mt-4 rounded-4 p-2 gap-2`}>
            <View style={tw`h-32 w-32`}>
              <Image
                source={require('./../assets/bible.png')}
                style={tw`w-full h-full rounded-3`}
              />
            </View>
            <View style={tw`w-65%`}>
              <Text
                style={tw`font-nokia-bold text-accent-6 text-sm leading-tight`}>
                የአጠናን ዘዴዎች
              </Text>
              <Text
                style={[
                  tw`font-nokia-bold text-secondary-6 text-lg leading-tight`,
                  darkMode ? tw`text-primary-3` : null,
                ]}>
                ፍሬያማ የመጽሃፍ ቅዱስ አጠናን ዘዴዎች
              </Text>
              <View style={tw`border-b border-accent-6 mt-1 w-[63%]`} />
              <Text
                style={[
                  tw`font-nokia-bold text-secondary-5 text-xs`,
                  darkMode ? tw`text-primary-3` : null,
                ]}>
                ጥቅምት 01 - ጥቅምት 07
              </Text>
              <TouchableOpacity
                style={tw`bg-accent-6 px-4 py-1 rounded-full w-36 mt-1`}>
                <Text
                  style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                  ኮርሱን ክፈት
                </Text>
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
              style={tw`border border-accent-6 px-4 py-1 rounded-4`}
              onPress={() => navigation.navigate('AllDevotionals')}>
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                All Devotionals
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row flex-wrap justify-between mt-4`}>
            {devotionals.slice(-4).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={tw`w-[47.5%] h-35 mb-4 rounded-2 overflow-hidden`}>
                <ImageBackground
                  source={{
                    uri: `https://ezra-seminary-api.onrender.com/images/${item.image}`,
                  }}
                  style={tw`w-full h-full justify-end `}
                  imageStyle={tw`rounded-lg`}>
                  <View
                    style={[
                      tw`absolute inset-0 bg-accent-10 bg-opacity-60 rounded-lg`,
                      darkMode ? tw`bg-accent-11 bg-opacity-70` : null,
                    ]}>
                    <ArrowSquareUpRight
                      size={32}
                      weight="fill"
                      style={tw`text-white self-end m-2`}
                      color="#F8F8F8"
                    />
                    <View style={tw`flex absolute bottom-0 left-0 my-2`}>
                      <Text style={tw`font-nokia-bold text-white text-lg mx-2`}>
                        {item.title}
                      </Text>
                      <Text
                        style={tw`font-nokia-bold text-white text-sm mx-2 text-accent-2`}>
                        {item.month} {item.day}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
