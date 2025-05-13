import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  ImageBackground,
  Linking,
} from 'react-native';
import tw from './../../../tailwind';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  useGetInVersesQuery,
  useGetInVerseOfDayQuery,
  useGetInVerseOfQuarterQuery,
} from '../../services/InVerseapi';
import {useGetVideoLinkQuery} from '../../services/videoLinksApi';
import useCalculateLessonIndex from './hooks/useCalculateLessonIndex';
import LinearGradient from 'react-native-linear-gradient';
import {YoutubeLogo} from 'phosphor-react-native';
import ErrorScreen from '../../components/ErrorScreen';
import {format} from 'date-fns';
import DateConverter from './DateConverter';

const InVerseHome = () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [quarter, week, year] = useCalculateLessonIndex(currentDate);
  const [backgroundImage, setBackgroundImage] = useState('');
  const {data: InVerse, error, isLoading, refetch} = useGetInVersesQuery();

  console.log('InVerse Check:', InVerse);

  const {
    data: lessonDetails,
    error: lessonError,
    isLoading: lessonIsLoading,
    refetch: lessonRefetch,
  } = useGetInVerseOfDayQuery({path: quarter, id: week});

  const {
    data: quarterDetails,
    error: quarterError,
    isLoading: quarterIsLoading,
    refetch: quarterRefetch,
  } = useGetInVerseOfQuarterQuery(quarter);

  const lastDigitQuarter = parseInt(quarter?.slice(-1), 10);
  useEffect(() => {
    if (lessonDetails) {
      setBackgroundImage(lessonDetails.lesson.cover);
    }
  }, [lessonDetails]);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await lessonRefetch();
      await quarterRefetch();
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [lessonRefetch, quarterRefetch, refetch]);

  const language = useSelector(state => state.language.language);

  // Refetch data when language changes
  useEffect(() => {
    onRefresh();
  }, [language, onRefresh]);

  const navigation = useNavigation();
  const darkMode = useSelector(state => state.ui.darkMode);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: videoLink,
    error: videoError,
    isLoading: videoLoading,
  } = useGetVideoLinkQuery({
    year: year,
    quarter: lastDigitQuarter,
    lesson: week,
  });

  if (quarterError) {
    console.error(
      'Error initializing useGetInVerseOfQuarterQuery:',
      quarterError,
    );
  }

  if (!useGetInVerseOfQuarterQuery) {
    return (
      <SafeAreaView>
        <Text>Error: Hook not initialized</Text>
      </SafeAreaView>
    );
  }

  const handleSearch = text => {
    setSearchTerm(text);
  };

  const filteredData = InVerse?.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const parseCustomDate = dateString => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const formatDateRange = (startDate, endDate) => {
    try {
      const start = format(parseCustomDate(startDate), 'MMM dd');
      const end = format(parseCustomDate(endDate), 'MMM dd');
      return `${start} - ${end}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={darkMode ? tw`bg-secondary-9 h-100%` : null}>
        <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          Loading
        </Text>
      </SafeAreaView>
    );
  }

  const handleWatchYouTube = () => {
    if (videoLink && videoLink.videoUrl) {
      Linking.openURL(videoLink.videoUrl);
    } else {
      alert('Video link not available');
    }
  };

  if (error) {
    return <ErrorScreen refetch={refetch} darkMode={darkMode} />;
  }

  const handleInVerseOpen = InVerseId => {
    navigation.navigate('InVerseQuarter', {InVerseId});
  };

  const textStyle = 'font-nokia-bold text-primary-3 text-2xl';
  const gradientColor = '#222222';
  const handleOpenButtonPress = () => {
    navigation.navigate('InVerseWeek', {
      InVerse: quarter,
      weekId: week,
    });
  };

  if (lessonIsLoading || quarterIsLoading || videoLoading) {
    return (
      <SafeAreaView style={darkMode ? tw`bg-secondary-9 h-100%` : null}>
        <ActivityIndicator size="large" color="#EA9215" style={tw`mt-20`} />
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          Loading
        </Text>
      </SafeAreaView>
    );
  }

  if (lessonError) {
    return (
      <SafeAreaView style={darkMode ? tw`bg-secondary-9 h-100%` : null}>
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
          <View style={tw`border border-accent-6 rounded mb-4`}>
            <Text style={tw`font-nokia-bold text-accent-6 text-center py-4`}>
              Wait for quarterly update!
            </Text>
          </View>
          <TextInput
            placeholder="Search InVerses..."
            value={searchTerm}
            onChangeText={handleSearch}
            style={[
              tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold`,
              darkMode ? tw`text-primary-1` : null,
            ]}
            placeholderTextColor={darkMode ? '#898989' : '#AAB0B4'}
          />
          <Text style={tw`font-nokia-bold text-accent-6 text-sm mt-2`}>
            የሩብ አመት ትምህርቶች
          </Text>
          <Text
            style={[
              tw`font-nokia-bold text-secondary-6 text-xl`,
              darkMode ? tw`text-primary-1` : null,
            ]}>
            ያለፉ የሩብ አመት ትምህርቶች
          </Text>
          <View style={tw`border-b border-accent-6 my-1`} />
          <View style={tw`flex flex-col`}>
            {filteredData.map((item, index) => (
              <View
                key={item.id}
                style={tw`flex flex-row gap-2 my-2 border border-accent-6 p-1.5 rounded-2 h-64`}>
                <Image
                  source={{uri: item.cover}}
                  style={({aspectRatio: 1}, tw`flex-1 w-42% rounded-2`)}
                />
                <View style={tw`flex-1 gap-2 justify-between`}>
                  <View>
                    <Text style={tw`font-nokia-bold text-sm text-accent-6`}>
                      {item.human_date}
                    </Text>
                    <Text
                      style={[
                        tw`font-nokia-bold text-xl text-secondary-6 leading-tight`,
                        darkMode ? tw`text-primary-1` : null,
                      ]}>
                      {item.title}
                    </Text>
                    <View style={tw`border-b border-accent-6 my-1`} />
                    <Text
                      numberOfLines={4}
                      style={[
                        tw`font-nokia-bold text-sm text-secondary-6 text-justify mt-2`,
                        darkMode ? tw`text-primary-1` : null,
                      ]}>
                      {'  '}
                      {item.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={tw`px-4 py-1 rounded-4 bg-accent-6 self-start`}
                    onPress={() => handleInVerseOpen(item.id)}>
                    <Text style={tw`font-nokia-bold text-sm text-primary-1`}>
                      ትምህርቱን ክፈት
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (quarterError) {
    return <Text> Error: {quarterError}</Text>;
  }

  if (!lessonDetails || !quarterDetails) {
    console.error('Missing lesson or quarter details:', {
      lessonDetails,
      quarterDetails,
    });
    return <Text>Loading...</Text>;
  }

  console.log('Quarter:', quarter);
  console.log('useGetInVerseOfQuarterQuery:', useGetInVerseOfQuarterQuery);

  return (
    <View style={darkMode ? tw`bg-secondary-9 h-100%` : null}>
      <SafeAreaView style={tw`flex mb-50`}>
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
          <View style={tw`rounded overflow-hidden`}>
            <ImageBackground
              source={{
                uri: backgroundImage,
              }}
              style={tw`w-full h-44 justify-end`}>
              <LinearGradient
                colors={[gradientColor, `${gradientColor}20`]}
                style={tw`absolute inset-0`}
                start={{x: 0.5, y: 1}}
                end={{x: 0.5, y: 0.2}}
              />
              <View style={[tw`absolute inset-0 rounded-lg`]}>
                <View style={tw`flex absolute bottom-0 left-0 p-4`}>
                  <Text style={tw`font-nokia-bold text-primary-6`}>
                    {language === 'en'
                      ? "This Week's Lesson"
                      : 'የዚህ ሳምንት ትምህርት'}
                  </Text>
                  <View style={tw`flex flex-row items-center`}>
                    {language === 'en' ? (
                      <Text style={tw`font-nokia-bold text-accent-6`}>
                        {formatDateRange(
                          lessonDetails.lesson.start_date,
                          lessonDetails.lesson.end_date,
                        )}
                      </Text>
                    ) : (
                      <View style={tw`flex flex-row items-center`}>
                        <DateConverter
                          gregorianDate={lessonDetails.lesson.start_date}
                          textStyle={tw`font-nokia-bold text-accent-6`}
                        />
                        <Text style={tw`font-nokia-bold text-accent-6`}>
                          {' '}
                          -{' '}
                        </Text>
                        <DateConverter
                          gregorianDate={lessonDetails.lesson.end_date}
                          textStyle={tw`font-nokia-bold text-accent-6`}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={tw`my-2`}>
            <Text style={tw`font-nokia-bold text-accent-6`}>
              {quarterDetails.quarterly.title}
            </Text>
            <Text
              style={[
                tw`font-nokia-bold text-secondary-6 text-2xl`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              {lessonDetails.lesson.title}
            </Text>
            <Text style={tw`font-nokia-bold text-accent-6`}>
              {quarterDetails.quarterly.human_date}
            </Text>
          </View>
          <View style={tw`border-b border-accent-6 mb-1`} />
          <Text
            style={[
              tw`font-nokia-bold text-secondary-6 text-justify`,
              darkMode ? tw`text-primary-1` : null,
            ]}>
            {'   '}
            {quarterDetails.quarterly.description}
          </Text>
          <View style={tw`flex flex-row mx-auto gap-2 items-center my-2`}>
            <TouchableOpacity
              style={tw`bg-accent-6 px-3 py-1 rounded-full`}
              onPress={handleOpenButtonPress}>
              <Text style={tw`text-primary-1 font-nokia-bold`}>
                {language === 'en' ? 'Open Lesson' : 'ትምህርቱን ክፈት'}
              </Text>
            </TouchableOpacity>

            {videoLink && (
              <TouchableOpacity
                style={tw`flex flex-row border border-accent-6 px-3 py-1 rounded-full gap-1`}
                onPress={handleWatchYouTube}>
                <Text
                  style={[
                    tw`font-nokia-bold text-secondary-6 items-center`,
                    darkMode ? tw`text-primary-1` : null,
                  ]}>
                  {language === 'en' ? 'Watch on YouTube' : 'በዩቲዩብ ይመልከቱ'}
                </Text>
                <YoutubeLogo size={20} weight="fill" color="#EA9215" />
              </TouchableOpacity>
            )}
          </View>
          <TextInput
            placeholder={
              language === 'en' ? 'Search InVerses...' : 'የቀድሞ ትምህርቶችን ፈልግ...'
            }
            value={searchTerm}
            onChangeText={handleSearch}
            style={[
              tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold`,
              darkMode ? tw`text-primary-1` : null,
            ]}
            placeholderTextColor={darkMode ? '#898989' : '#AAB0B4'}
          />
          <Text style={tw`font-nokia-bold text-accent-6 text-sm mt-2`}>
            {language === 'en' ? 'Quarterly Lessons' : 'የሩብ አመት ትምህርቶች'}
          </Text>
          <Text
            style={[
              tw`font-nokia-bold text-secondary-6 text-xl`,
              darkMode ? tw`text-primary-1` : null,
            ]}>
            {language === 'en'
              ? 'Past Quarterly Lessons'
              : 'ያለፉ የሩብ አመት ትምህርቶች'}
          </Text>
          <View style={tw`border-b border-accent-6 my-1`} />
          <View style={tw`flex flex-col`}>
            {filteredData.map((item, index) => (
              <View
                key={item.id}
                style={tw`flex flex-row gap-2 my-2 border border-accent-6 p-1.5 rounded-2 h-64`}>
                <Image
                  source={{uri: item.cover}}
                  style={({aspectRatio: 1}, tw`flex-1 w-42% rounded-2`)}
                />
                <View style={tw`flex-1 gap-2 justify-between`}>
                  <View>
                    <Text style={tw`font-nokia-bold text-sm text-accent-6`}>
                      {item.human_date}
                    </Text>
                    <Text
                      style={[
                        tw`font-nokia-bold text-xl text-secondary-6 leading-tight`,
                        darkMode ? tw`text-primary-1` : null,
                      ]}>
                      {item.title}
                    </Text>
                    <View style={tw`border-b border-accent-6 my-1`} />
                    <Text
                      numberOfLines={4}
                      style={[
                        tw`font-nokia-bold text-sm text-secondary-6 text-justify mt-2`,
                        darkMode ? tw`text-primary-1` : null,
                      ]}>
                      {'  '}
                      {item.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={tw`px-4 py-1 rounded-4 bg-accent-6 self-start`}
                    onPress={() => handleInVerseOpen(item.id)}>
                    <Text style={tw`font-nokia-bold text-sm text-primary-1`}>
                      {language === 'en' ? 'Open Lesson' : 'ትምህርቱን ክፈት'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default InVerseHome;
