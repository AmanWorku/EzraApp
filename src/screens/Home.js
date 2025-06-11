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
import {useSelector, useDispatch} from 'react-redux';
import tw from './../../tailwind';
import {useNavigation} from '@react-navigation/native';
import {useGetDevotionsQuery} from '../redux/api-slices/apiSlice';
import {useGetCoursesQuery} from '../services/api';
import HomeCurrentSSL from './SSLScreens/HomeCurrentSSL';
import PreviousDevotions from './DevotionScreens/PreviousDevotions';
import {toEthiopian} from 'ethiopian-date';
import NetInfo from '@react-native-community/netinfo';
import DevotionCard from '../components/DevotionCard';
import CourseCard from '../components/CourseCard';
import Header from '../components/Header';
import {setDevotions} from '../redux/devotionsSlice';
import {setCourses} from '../redux/courseSlice';
import {scheduleVerseOfTheDayNotification} from '../utils/notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [isOffline, setIsOffline] = useState(false);
  const [cachedData, setCachedData] = useState({
    devotions: [],
    courses: [],
    lastCacheTime: null,
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);
  const user = useSelector(state => state.auth.user);
  const persistedDevotions = useSelector(state => state.devotions);
  const persistedCourses = useSelector(state => state.courses);

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

  // Cache management functions
  const CACHE_KEY = 'home_data_cache';
  const CACHE_EXPIRY_HOURS = 24; // Cache expires after 24 hours

  const loadCachedData = useCallback(async () => {
    try {
      const cachedString = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedString) {
        const cached = JSON.parse(cachedString);
        const now = new Date().getTime();
        const cacheTime = new Date(cached.lastCacheTime).getTime();
        const isExpired = now - cacheTime > CACHE_EXPIRY_HOURS * 60 * 60 * 1000;

        if (!isExpired) {
          setCachedData(cached);
          // Update Redux store with cached data
          if (cached.devotions?.length > 0) {
            dispatch(setDevotions(cached.devotions));
          }
          if (cached.courses?.length > 0) {
            dispatch(setCourses(cached.courses));
          }
          return cached;
        }
      }
    } catch (error) {
      console.error('Error loading cached data:', error);
    }
    return null;
  }, [dispatch]);

  const saveCachedData = useCallback(async (devotionsData, coursesData) => {
    try {
      const cacheData = {
        devotions: devotionsData || [],
        courses: coursesData || [],
        lastCacheTime: new Date().toISOString(),
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      setCachedData(cacheData);
    } catch (error) {
      console.error('Error saving cached data:', error);
    }
  }, []);

  const handleButtonPress = id => {
    navigation.navigate('Course', {
      screen: 'CourseContent',
      params: {courseId: id},
    });
  };

  useEffect(() => {
    const getDevotionsToUse = () => {
      if (isOffline) {
        return cachedData.devotions?.length > 0
          ? cachedData.devotions
          : persistedDevotions;
      }
      return devotions?.length > 0 ? devotions : cachedData.devotions;
    };

    const devotionsToUse = getDevotionsToUse();
    if (devotionsToUse && devotionsToUse.length > 0) {
      const today = new Date();
      const ethiopianDate = toEthiopian(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
      );
      const [year, month, day] = ethiopianDate;
      const ethiopianMonth = ethiopianMonths[month];
      const todaysDevotion = devotionsToUse.find(
        devotion =>
          devotion.month === ethiopianMonth && Number(devotion.day) === day,
      );
      setSelectedDevotion(todaysDevotion || devotionsToUse[0]);
    }
  }, [devotions, isOffline, persistedDevotions, cachedData.devotions]);

  const getDataToDisplay = () => {
    if (isOffline) {
      return {
        devotions:
          cachedData.devotions?.length > 0
            ? cachedData.devotions
            : persistedDevotions,
        courses:
          cachedData.courses?.length > 0
            ? cachedData.courses
            : persistedCourses,
      };
    }
    return {
      devotions: devotions?.length > 0 ? devotions : cachedData.devotions,
      courses: courses?.length > 0 ? courses : cachedData.courses,
    };
  };

  const {devotions: devotionsToDisplay, courses: coursesToDisplay} =
    getDataToDisplay();
  const devotionToDisplay = selectedDevotion || devotionsToDisplay[0];

  const fetchData = useCallback(async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      setIsOffline(true);
      // Load cached data when offline
      const cached = await loadCachedData();
      if (
        cached &&
        (cached.devotions?.length > 0 || cached.courses?.length > 0)
      ) {
        Toast.show({
          type: 'info',
          text1: 'Offline Mode',
          text2: 'Showing cached data. Connect to internet for updates.',
        });
        setHasError(false);
        setIsLoading(false);
        return;
      } else {
        Toast.show({
          type: 'error',
          text1: 'No Cached Data',
          text2: 'Please connect to the internet to load data.',
        });
        setHasError(true);
        setIsLoading(false);
        return;
      }
    }

    try {
      setIsLoading(true);
      setHasError(false);
      setIsOffline(false);

      const [devotionsData, coursesData] = await Promise.all([
        refetchDevotions(),
        refetchCourses(),
      ]);

      // Update Redux store
      dispatch(setDevotions(devotionsData.data));
      dispatch(setCourses(coursesData.data));

      // Save to cache
      await saveCachedData(devotionsData.data, coursesData.data);

      if (devotionToDisplay) {
        scheduleVerseOfTheDayNotification(devotionToDisplay.verse);
      }
    } catch (e) {
      console.error('Fetch error:', e);
      // Try to load cached data if network request fails
      const cached = await loadCachedData();
      if (
        cached &&
        (cached.devotions?.length > 0 || cached.courses?.length > 0)
      ) {
        Toast.show({
          type: 'info',
          text1: 'Network Error',
          text2: 'Showing cached data. Please check your connection.',
        });
        setHasError(false);
      } else {
        setHasError(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    refetchDevotions,
    refetchCourses,
    dispatch,
    devotionToDisplay,
    loadCachedData,
    saveCachedData,
  ]);

  // Load cached data on app start
  useEffect(() => {
    const initializeApp = async () => {
      // First, try to load cached data
      const cached = await loadCachedData();
      if (
        cached &&
        (cached.devotions?.length > 0 || cached.courses?.length > 0)
      ) {
        setIsLoading(false);
        // Check internet connection and fetch fresh data in background
        const netInfo = await NetInfo.fetch();
        if (netInfo.isConnected) {
          fetchData();
        } else {
          setIsOffline(true);
        }
      } else {
        // No cached data, must fetch from network
        fetchData();
      }
    };

    initializeApp();
  }, [fetchData, loadCachedData]);

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
      setIsOffline(false);

      const [devotionsData, coursesData] = await Promise.all([
        refetchDevotions(),
        refetchCourses(),
      ]);

      // Update Redux store
      dispatch(setDevotions(devotionsData.data));
      dispatch(setCourses(coursesData.data));

      // Save to cache
      await saveCachedData(devotionsData.data, coursesData.data);

      Toast.show({
        type: 'success',
        text1: 'Data Updated',
        text2: 'Latest content has been loaded and cached.',
      });
    } catch (e) {
      console.error('Refresh error:', e);
      setHasError(true);
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'Unable to refresh data. Please try again.',
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [refetchDevotions, refetchCourses, dispatch, saveCachedData]);

  if (isLoading) {
    return (
      <SafeAreaView
        style={darkMode ? tw`bg-secondary-9 h-screen flex-1` : tw`flex-1`}>
        <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          {isOffline ? 'Loading cached data...' : 'Loading...'}
        </Text>
      </SafeAreaView>
    );
  }

  if (hasError && (!devotionsToDisplay || devotionsToDisplay.length === 0)) {
    return (
      <SafeAreaView
        style={darkMode ? tw`bg-secondary-9 h-screen flex-1` : tw`flex-1`}>
        <View style={tw`flex-1 justify-center items-center px-4`}>
          <Text
            style={tw`font-nokia-bold text-lg text-accent-6 text-center mb-4`}>
            No Data Available
          </Text>
          <Text style={tw`font-nokia-bold text-secondary-6 text-center mb-4`}>
            Please connect to the internet to load content.
          </Text>
          <TouchableOpacity
            style={tw`bg-accent-6 px-6 py-3 rounded-lg`}
            onPress={fetchData}>
            <Text style={tw`font-nokia-bold text-primary-1`}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!devotionsToDisplay || devotionsToDisplay.length === 0) {
    return (
      <SafeAreaView
        style={darkMode ? tw`bg-secondary-9 h-screen flex-1` : tw`flex-1`}>
        <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  const publishedCourses = coursesToDisplay
    ? coursesToDisplay.filter(course => course.published)
    : [];
  const lastCourse = publishedCourses[publishedCourses.length - 1];

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
          {user && (
            <Text
              style={[
                tw`font-nokia-bold text-2xl text-secondary-6`,
                darkMode ? tw`text-accent-6` : null,
              ]}>
              Welcome, {user.firstName}!
            </Text>
          )}
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
              onPress={() =>
                navigation.navigate('Course', {screen: 'CourseHome'})
              }>
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
                darkMode ? tw`text-primary-3` : null,
              ]}>
              የዚህ ሳምንት ሰንበት ትምህርት
            </Text>
            <TouchableOpacity
              style={tw`border border-accent-6 px-4 py-1 rounded-4`}
              onPress={() => navigation.navigate('SSLHome')}>
              <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                All SSLs
              </Text>
            </TouchableOpacity>
          </View>
          <HomeCurrentSSL />
          <View style={tw`border-b border-primary-7 mt-4 mb-2`} />
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
          {devotionsToDisplay.length > 0 && (
            <PreviousDevotions
              devotions={devotionsToDisplay}
              darkMode={darkMode}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
