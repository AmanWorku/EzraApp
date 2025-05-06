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
  ImageBackground,
} from 'react-native';
import tw from '../../../tailwind';
import {useSelector} from 'react-redux';
import {useGetInVerseQuery} from '../../services/SabbathSchoolApi'; // Import the new API hook
import LinearGradient from 'react-native-linear-gradient';
import ErrorScreen from '../../components/ErrorScreen';

const InVerseHome = () => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch data from the new endpoint
  const {data: inVerseData, error, isLoading, refetch} = useGetInVerseQuery();

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

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
        {inVerseData?.map(item => (
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
                  {item.description}
                </Text>
              </View>
              <TouchableOpacity
                style={tw`px-4 py-1 rounded-4 bg-accent-6 self-start`}>
                <Text style={tw`font-nokia-bold text-sm text-primary-1`}>
                  Open Lesson
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InVerseHome;
