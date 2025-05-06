import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  ArrowSquareLeft,
  User,
  ArrowSquareUpRight,
  ArrowSquareDown,
} from 'phosphor-react-native';
import tw from './../../../tailwind';
import {useGetDevotionsQuery} from './../../redux/api-slices/apiSlice';
import ErrorScreen from '../../components/ErrorScreen';

// Utility function for Ethiopian month names
const ethopianMonths = [
  'መስከረም',
  'ጥቅምት',
  'ህዳር',
  'ታህሳስ',
  'ጥር',
  'የካቲት',
  'መጋቢት',
  'ሚያዚያ',
  'ግንቦት',
  'ሰኔ',
  'ሐምሌ',
  'ነሐሴ',
  'ጳጉሜ',
];

const AllDevotionals = ({navigation}) => {
  const darkMode = useSelector(state => state.ui.darkMode);

  const {
    data: originalDevotionals = [],
    isFetching,
    refetch,
    error,
  } = useGetDevotionsQuery();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedMonth, setExpandedMonth] = useState(null);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  // Function to get the index of an Ethiopian month
  const getEthiopianMonthIndex = monthName => ethopianMonths.indexOf(monthName);

  // Organize devotionals by month and sort days within each month
  const sortedDevotionals = useMemo(() => {
    const devotionalsByMonth = originalDevotionals.reduce((acc, devotion) => {
      const monthName = devotion.month;
      if (!acc[monthName]) acc[monthName] = [];
      acc[monthName].push(devotion);
      return acc;
    }, {});

    // Sort devotionals by Ethiopian month order and day within each month
    const sortedMonths = Object.keys(devotionalsByMonth).sort((a, b) => {
      return getEthiopianMonthIndex(a) - getEthiopianMonthIndex(b);
    });

    sortedMonths.forEach(month => {
      devotionalsByMonth[month] = devotionalsByMonth[month].sort(
        (a, b) => a.day - b.day,
      );
    });

    return {sortedMonths, devotionalsByMonth};
  }, [originalDevotionals]);

  const toggleMonth = month =>
    setExpandedMonth(expandedMonth === month ? null : month);

  if (isFetching) {
    return (
      <SafeAreaView style={darkMode ? tw`bg-secondary-9 h-full flex-1` : null}>
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
    <View style={darkMode ? tw`bg-secondary-9 h-100%` : null}>
      <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={tw`h-100%`}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={['#EA9215']}
              tintColor="#EA9215"
            />
          }>
          <View style={tw`flex flex-row justify-between my-4`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowSquareLeft size={36} weight="fill" color={'#EA9215'} />
            </TouchableOpacity>
            <Text
              style={[
                tw`font-nokia-bold text-xl text-secondary-6`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              All Devotionals
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
          {sortedDevotionals.sortedMonths.map(month => (
            <View key={month} style={tw`my-2`}>
              <TouchableOpacity
                style={tw`flex flex-row justify-between items-center border-b border-accent-6 pb-2`}
                onPress={() => toggleMonth(month)}>
                <Text
                  style={[
                    tw`font-nokia-bold text-lg text-secondary-6`,
                    darkMode ? tw`text-primary-1` : null,
                  ]}>
                  {month}
                </Text>
                <ArrowSquareDown
                  size={24}
                  weight={expandedMonth === month ? 'fill' : 'regular'}
                  color="#EA9215"
                  style={tw`mr-2`}
                />
              </TouchableOpacity>
              {expandedMonth === month && (
                <View style={tw`flex flex-row flex-wrap justify-between mt-4`}>
                  {sortedDevotionals.devotionalsByMonth[month].map(
                    (item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={tw`w-[47.5%] h-35 mb-4 rounded-2 overflow-hidden`}
                        onPress={() =>
                          navigation.navigate('SelectedDevotional', {
                            devotionalId: item._id,
                          })
                        }>
                        <ImageBackground
                          source={{uri: `${item.image}`}}
                          style={tw`w-full h-full justify-end`}
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
                            <View
                              style={tw`flex absolute bottom-0 left-0 my-2`}>
                              <Text
                                style={tw`font-nokia-bold text-white text-lg mx-2`}>
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
                    ),
                  )}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AllDevotionals;
