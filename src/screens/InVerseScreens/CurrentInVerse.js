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
} from 'react-native';
import tw from '../../../tailwind';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  useGetInVersesQuery,
  useGetInVerseOfQuarterQuery,
} from '../../services/SabbathSchoolApi';
import useCalculateLessonIndex from './hooks/useCalculateLessonIndex';
import ErrorScreen from '../../components/ErrorScreen';

const CurrentInVerse = () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const [quarter, week] = useCalculateLessonIndex(currentDate);
  const {data: InVerse, error, isLoading, refetch} = useGetInVersesQuery();

  const {
    data: quarterDetails,
    error: quarterError,
    isLoading: quarterIsLoading,
    refetch: quarterRefetch,
  } = useGetInVerseOfQuarterQuery(quarter);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await quarterRefetch();
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [quarterRefetch, refetch]);

  const navigation = useNavigation();
  const darkMode = useSelector(state => state.ui.darkMode);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = text => {
    setSearchTerm(text);
  };

  const filteredData = InVerse?.filter(InVerseItems => {
    return InVerseItems.title.includes(searchTerm);
  });

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

  if (quarterError) {
    return <Text> Error: {quarterError}</Text>;
  }

  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
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
            Explore quarterly lessons
          </Text>
          <Text
            style={[
              tw`font-nokia-bold text-secondary-6 text-xl`,
              darkMode ? tw`text-primary-1` : null,
            ]}>
            Lessons of previous quarters
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
    </View>
  );
};

export default CurrentInVerse;
