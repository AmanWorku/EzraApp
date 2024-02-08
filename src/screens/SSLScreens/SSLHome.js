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
import Link from '@react-navigation/native';
import {
  List,
  User,
  CaretCircleDown,
  Star,
  ArrowSquareRight,
} from 'phosphor-react-native';
import tw from './../../../tailwind';
import {useGetCoursesQuery} from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useGetSSLsQuery} from '../../services/SabbathSchoolApi';
const SSLHome = () => {
  const {data: ssl, error, isLoading, refetch} = useGetSSLsQuery();
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
          {ssl.map((item, index) => (
            <Link
              key={index}
              to={item.id}
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e2e8f0',
                padding: 8,
                margin: 4,
                flex: 1,
              }}>
              <Image source={{uri: item.cover}} />
              <View>
                <Text>{item.human_date}</Text>
                <Text>{item.title}</Text>
                <Text numberOfLines={2}>{item.description}</Text>
              </View>
            </Link>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SSLHome;
