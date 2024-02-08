import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  List,
  User,
  CaretCircleDown,
  Star,
  ArrowSquareRight,
} from 'phosphor-react-native';
import tw from './../../../tailwind';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useGetSSLOfQuarterQuery} from '../../services/SabbathSchoolApi';

const SSLQuarter = () => {
  const {
    data: sslQuarter,
    error,
    isLoading,
    refetch,
  } = useGetSSLOfQuarterQuery();
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

  //   const handleSearch = e => {
  //     setSearchTerm(e.target.value);
  //   };
  if (error) return <div>Error: {error.message}</div>;

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
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex`}>
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
          <View style={tw`flex flex-col`}>
            {sslQuarter.map((item, index) => (
              <View
                key={index}
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
                        tw`font-nokia-bold text-xl text-secondary-6`,
                        darkMode ? tw`text-primary-1` : null,
                      ]}>
                      {item.title}
                    </Text>
                    <View style={tw`border-b border-accent-6 my-1`} />
                    <Text
                      numberOfLines={5}
                      style={[
                        tw`font-nokia-bold text-sm text-secondary-6 text-justify mt-2`,
                        darkMode ? tw`text-primary-1` : null,
                      ]}>
                      {item.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={tw`px-4 py-1 rounded-4 bg-accent-6 self-start`}
                    onPress={navigation.navigate('SSLQuarter', {
                      sslId: item.id,
                    })}>
                    <Text style={tw`font-nokia-bold text-sm text-primary-1`}>
                      ኮርሱን ክፈት
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

export default SSLQuarter;
