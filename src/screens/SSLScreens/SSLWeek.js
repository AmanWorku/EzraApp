import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  useGetSSLOfDayQuery,
  useGetSSLOfDayLessonQuery,
} from '../../services/SabbathSchoolApi';
import HTMLView from 'react-native-htmlview';
import tw from './../../../tailwind';

const SSLWeek = ({route}) => {
  const {width} = useWindowDimensions();
  const {ssl, weekId} = route.params;
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [check, setCheck] = useState('01'); // State to hold the check value
  const {data: sslQuarter} = useGetSSLOfDayQuery(ssl, weekId);
  const {
    data: sslWeek,
    isLoading,
    error,
    refetch,
  } = useGetSSLOfDayLessonQuery({
    path: ssl,
    id: weekId,
    day: check,
  });

  const navigation = useNavigation();
  const darkMode = useSelector(state => state.ui.darkMode);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  const onNextButtonClick = () => {
    const nextCheck = parseInt(check) + 1; // Increment check by 1
    setCheck(nextCheck.toString()); // Update the state with the new check value
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

  if (error) {
    return <Text style={tw`text-red-500 mt-12`}>Error: {error.message}</Text>;
  }

  const {content} = sslWeek;

  const styles = StyleSheet.create({
    h3: darkMode
      ? tw`font-nokia-bold text-primary-1 text-xl`
      : tw`font-nokia-bold text-secondary-6`,
    p: darkMode
      ? tw`text-primary-1 font-nokia-bold text-justify`
      : tw`text-secondary-6 font-nokia-bold text-justify`,
    blockquote: darkMode
      ? tw`border-l-4 border-orange-500 pl-4 my-5 text-primary-1`
      : tw`border-l-4 border-orange-500 pl-4 my-5 text-secondary-6`,
    em: tw`mt-4`, // Margin top 4
    code: {
      ...tw`font-nokia-bold`,
      color: '#CE8013', // Custom code color
    },
    strong: tw`text-xl`, // Extra large font size
  });

  return (
    <View style={darkMode ? tw`bg-secondary-9 h-full` : null}>
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
        <SafeAreaView style={tw`flex`}>
          <ScrollView>
            <View style={tw`flex px-4`}>
              <HTMLView value={content} stylesheet={styles} />
              <TouchableOpacity
                style={tw`mb-2 border border-accent-6 px-4 py-1 rounded-4 w-18 flex self-end`}
                onPress={onNextButtonClick}>
                <Text style={tw`text-accent-6 font-nokia-bold text-xl `}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default SSLWeek;
