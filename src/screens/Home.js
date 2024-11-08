import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {User, BookOpenText, ArrowSquareUpRight} from 'phosphor-react-native';
import {useSelector} from 'react-redux';
import tw from './../../tailwind';
import {useNavigation} from '@react-navigation/native';
import {useGetDevotionsQuery} from '../redux/api-slices/apiSlice';
import {useGetCoursesQuery} from '../services/api';
import HomeCurrentSSL from './SSLScreens/HomeCurrentSSL';
import {toEthiopian} from 'ethiopian-date';
import ErrorScreen from '../components/ErrorScreen';
import PreviousDevotions from './DevotionScreens/PreviousDevotions';

const ethiopianMonths = [
  '', // There is no month 0
  'መስከረም',
  'ጥቅምት',
  'ህዳር',
  'ታህሳስ',
  'ጥር',
  'የካቲት',
  'መጋቢት',
  'ሚያዝያ',
  'ግንቦት',
  'ሰኔ',
  'ሐምሌ',
  'ነሐሴ',
  'ጳጉሜ', // 13th month
];

const Home = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const darkMode = useSelector(state => state.ui.darkMode);
  const {
    data: devotions = [],
    isFetching,
    refetch,
    error,
  } = useGetDevotionsQuery();
  const {
    data: courses = [],
    courseIsFetching,
    courseError,
  } = useGetCoursesQuery();

  const [selectedDevotion, setSelectedDevotion] = useState(null);

  const handleButtonPress = id => {
    navigation.navigate('CourseHome', {
      screen: 'CourseContent',
      params: {courseId: id},
    });
  };

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  useEffect(() => {
    if (devotions && devotions.length > 0) {
      const today = new Date();
      const ethiopianDate = toEthiopian(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
      );
      const [year, month, day] = ethiopianDate;
      const ethiopianMonth = ethiopianMonths[month];
      const todaysDevotion = devotions.find(
        devotion =>
          devotion.month === ethiopianMonth && Number(devotion.day) === day,
      );
      setSelectedDevotion(todaysDevotion || devotions[0]);
    }
  }, [devotions]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (courseIsFetching && isFetching && !devotions.length) {
    return (
      <SafeAreaView style={darkMode ? tw`bg-secondary-9 h-100%` : null}>
        <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          Loading
        </Text>
      </SafeAreaView>
    );
  }

  if (error || courseError) {
    return <ErrorScreen refetch={refetch} darkMode={darkMode} />;
  }

  if (!devotions || devotions.length === 0) {
    return (
      <SafeAreaView style={darkMode ? tw`bg-secondary-9 h-100%` : null}>
        <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          Loading
        </Text>
      </SafeAreaView>
    );
  }

  const devotionToDisplay = selectedDevotion || devotions[0];

  if (!isFetching && isLoading) {
    setIsLoading(false);
  }

  const publishedCourses = courses.filter(course => course.published);
  const lastCourse = publishedCourses[publishedCourses.length - 1];

  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={onRefresh}
              colors={['#EA9215']}
              tintColor="#EA9215"
            />
          }>
          <View style={tw`flex flex-row justify-between my-4`}>
            <View style={tw`border-b border-accent-6`}>
              <Text
                style={[
                  tw`font-nokia-bold text-xl text-secondary-6 text-center`,
                  darkMode ? tw`text-primary-1` : null,
                ]}>
                Home
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <User
                size={32}
                weight="bold"
                style={[
                  tw`text-secondary-6`,
                  darkMode ? tw`text-primary-1` : null,
                ]}
              />
            </TouchableOpacity>
          </View>
          {devotionToDisplay && (
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
                    የዕለቱ ጥቅስ -
                  </Text>
                  <Text style={tw`text-accent-6 font-nokia-bold text-lg`}>
                    {devotionToDisplay.month} {devotionToDisplay.day}
                  </Text>
                </View>
                <TouchableOpacity
                  style={tw`bg-accent-6 px-4 py-1 rounded-full`}
                  onPress={() =>
                    navigation.navigate('Devotional', {
                      screen: 'SelectedDevotional',
                      params: {devotionalId: devotionToDisplay._id},
                    })
                  }>
                  <Text style={tw`text-primary-1 font-nokia-bold text-sm`}>
                    ክፈት
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
                  {devotionToDisplay.verse}
                </Text>
              </View>
            </View>
          )}
          <View style={tw`border-b border-primary-7 mt-4 mb-2`} />
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-5 text-lg`,
                darkMode ? tw`text-primary-7` : null,
              ]}>
              ማጥናት ይቀጥሉ
            </Text>
            <TouchableOpacity
              style={tw`border border-accent-6 px-4 py-1 rounded-4`}
              onPress={() => navigation.navigate('Course')}>
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                ሁሉም ኮርሶች
              </Text>
            </TouchableOpacity>
          </View>
          {lastCourse && (
            <View style={tw`border border-accent-6 mt-4 rounded-4 p-2`}>
              <View style={tw`h-48`}>
                <Image
                  source={{
                    uri: `${lastCourse.image}`,
                  }}
                  style={tw`w-full h-full rounded-3`}
                />
              </View>
              <Text style={tw`font-nokia-bold text-accent-6 text-xl mt-2`}>
                {lastCourse.title}
              </Text>
              <Text
                style={[
                  tw`font-nokia-bold text-secondary-6 text-2xl`,
                  darkMode ? tw`text-primary-3` : null,
                ]}>
                {lastCourse.title}
              </Text>
              <TouchableOpacity
                style={tw`bg-accent-6 px-4 py-2 rounded-full w-36 mt-2`}
                onPress={() => handleButtonPress(lastCourse._id)}>
                <Text
                  style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                  ኮርሱን ክፈት
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={tw`border-b border-primary-7 mt-4 mb-2`} />
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-4 text-lg`,
                darkMode ? tw`text-primary-7` : null,
              ]}>
              የዚህ ሳምንት ሰንበት ትምህርት
            </Text>
            <TouchableOpacity
              style={tw`border border-accent-6 px-4 py-1 rounded-4`}
              onPress={() => navigation.navigate('SSL')}>
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                All SSLs
              </Text>
            </TouchableOpacity>
          </View>
          <HomeCurrentSSL />
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
              onPress={() =>
                navigation.navigate('Devotional', {
                  screen: 'AllDevotionals',
                })
              }>
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                All Devotionals
              </Text>
            </TouchableOpacity>
          </View>
          {devotions.length > 0 && (
            <PreviousDevotions devotions={devotions} navigation={navigation} />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
