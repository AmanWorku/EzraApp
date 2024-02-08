import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  List,
  User,
  CaretCircleDown,
  Star,
  ArrowSquareLeft,
} from 'phosphor-react-native';
import tw from './../../../tailwind';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useGetSSLOfQuarterQuery} from '../../services/SabbathSchoolApi';
import LinearGradient from 'react-native-linear-gradient';
const SSLQuarter = ({route}) => {
  const {sslId} = route.params;
  const {
    data: sslQuarter,
    error,
    isLoading,
    refetch,
  } = useGetSSLOfQuarterQuery(sslId);
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

  if (error) return <Text>Error: {error.message}</Text>;

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

  const gradientColor = darkMode
    ? sslQuarter.quarterly.color_primary_dark
    : sslQuarter.quarterly.color_primary;

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
        <View style={tw`flex-1 h-130`}>
          <ImageBackground
            source={{uri: sslQuarter.quarterly.splash}}
            style={tw`flex-5 justify-between py-6 px-4`}>
            <LinearGradient
              colors={[gradientColor, `${gradientColor}30`]}
              style={tw`absolute inset-0`}
              start={{x: 0.5, y: 1}}
              end={{x: 0.5, y: 0.2}}
            />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowSquareLeft
                size={36}
                weight="fill"
                color={'#EA9215'}
                style={tw`mt-8`}
              />
            </TouchableOpacity>
            <View>
              <Text
                style={tw`font-nokia-bold text-3xl text-primary-1 text-center`}>
                {sslQuarter.quarterly.title}
              </Text>
              <Text
                style={tw`font-nokia-bold text-sm text-primary-3 text-center`}>
                {sslQuarter.quarterly.human_date}
              </Text>
              <TouchableOpacity
                style={tw`border border-primary-3 rounded-full px-4 py-2 self-center mt-4`}>
                <Text style={tw`font-nokia-bold text-primary-1`}>
                  የዛሬን ክፍል ክፈት
                </Text>
              </TouchableOpacity>
              <Text
                style={tw` mt-4 font-nokia-bold text-sm text-primary-1 text-justify`}
                numberOfLines={3}>
                {sslQuarter.quarterly.description}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
          <Text>
            {sslQuarter.lessons?.map(item => (
              <View key={item.id}>
                <Text>{item.title}</Text>
              </View>
            ))}
          </Text>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default SSLQuarter;
