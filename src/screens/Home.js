import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import tw from './../../tailwind';
import {useNavigation} from '@react-navigation/native';
import {useGetDevotionsQuery} from '../redux/api-slices/apiSlice';
import {useGetCoursesQuery} from '../services/api';
import HomeCurrentSSL from './SSLScreens/HomeCurrentSSL';
import {toEthiopian} from 'ethiopian-date';
import ErrorScreen from '../components/ErrorScreen';
import PreviousDevotions from './DevotionScreens/PreviousDevotions';
import NetInfo from '@react-native-community/netinfo';
import DevotionCard from '../components/DevotionCard';
import CourseCard from '../components/CourseCard';
import Header from '../components/Header';

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
  const [hasError, setHasError] = useState(false);

  const navigation = useNavigation();
  const darkMode = useSelector(state => state.ui.darkMode);

  const {
    data: devotions = [],
    isFetching,
    refetch: refetchDevotions,
    error,
  } = useGetDevotionsQuery();

  const {
    data: courses = [],
    isFetching: courseIsFetching,
    refetch: refetchCourses,
    error: courseError,
  } = useGetCoursesQuery();

  const [selectedDevotion, setSelectedDevotion] = useState(null);

  const handleButtonPress = id => {
    navigation.navigate('Course', {
      screen: 'CourseContent',
      params: {courseId: id},
    });
  };

  const fetchData = useCallback(async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      Toast.show({
        type: 'info',
        text1: 'Internet Connection Required',
        text2: 'Please connect to the internet to reload data.',
      });
      setHasError(true);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setHasError(false);
      await Promise.all([refetchDevotions(), refetchCourses()]);
    } catch (e) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [refetchDevotions, refetchCourses]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const onRefresh = useCallback(async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      Toast.show({
        type: 'info',
        text1: 'Internet Connection Required',
        text2: 'Please connect to the internet to reload data.',
      });
      return;
    }
    try {
      setIsRefreshing(true);
      setHasError(false);
      await Promise.all([refetchDevotions(), refetchCourses()]);
    } catch (e) {
      setHasError(true);
    } finally {
      setIsRefreshing(false);
    }
  }, [refetchDevotions, refetchCourses]);

  if ((courseIsFetching && isFetching && !devotions.length) || isLoading) {
    return (
      <SafeAreaView
        style={darkMode ? tw`bg-secondary-9 h-screen flex-1` : tw`flex-1`}>
        <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          Loading
        </Text>
      </SafeAreaView>
    );
  }

  if (error || courseError || hasError) {
    console.log(courseError, error, hasError);
    return <ErrorScreen refetch={fetchData} darkMode={darkMode} />;
  }

  if (!devotions || devotions.length === 0) {
    return (
      <SafeAreaView
        style={darkMode ? tw`bg-secondary-9 h-screen flex-1` : tw`flex-1`}>
        <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          Loading
        </Text>
      </SafeAreaView>
    );
  }

  const devotionToDisplay = selectedDevotion || devotions[0];

  const publishedCourses = courses.filter(course => course.published);
  const lastCourse = publishedCourses[publishedCourses.length - 1];
  console.log('navigation:', navigation.getState());

  return (
    <View style={darkMode ? tw`bg-secondary-9 flex-1` : tw`flex-1`}>
      <SafeAreaView style={tw`flex mx-auto w-11/12`}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={onRefresh}
              colors={['#EA9215']}
              tintColor={'#EA9215'}
            />
          }>
          <Header darkMode={darkMode} navigation={navigation} />
          {devotionToDisplay && (
            <DevotionCard
              devotion={devotionToDisplay}
              darkMode={darkMode}
              navigation={navigation}
            />
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
            <CourseCard
              course={lastCourse}
              darkMode={darkMode}
              handleButtonPress={handleButtonPress}
            />
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
