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
import tw from './../../tailwind';
import {useGetCoursesQuery} from './../services/api';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Course = () => {
  const {data: courses, error, isLoading, refetch} = useGetCoursesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortByLatest, setSortByLatest] = useState(false); // Default to sorting by latest
  const darkMode = useSelector(state => state.ui.darkMode);
  const navigation = useNavigation();
  const [newError, setNewError] = useState(null);

  const onRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  const handleSearch = text => {
    setSearchTerm(text);
  };

  let filteredData = courses
    ?.filter(course => {
      return course.title.includes(searchTerm);
    })
    .slice();
  if (!sortByLatest) {
    filteredData = filteredData.reverse();
  }
  const handleButtonPress = id => {
    navigation.navigate('CourseContent', {courseId: id});
  };

  const toggleSortOrder = () => {
    setSortByLatest(prev => !prev);
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

  if (error || newError) {
    const errorMessage = error ? error.message : newError.message;
    return (
      <SafeAreaView style={darkMode ? tw`bg-secondary-9 h-full` : null}>
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
          <View style={tw`flex-1 items-center justify-center`}>
            <Text style={tw`font-nokia-bold text-accent-6 text-lg mb-4`}>
              Error: {errorMessage}
            </Text>
            <TouchableOpacity
              style={tw`bg-accent-6 px-4 py-2 rounded-full mb-4`}
              onPress={() => refetch()}>
              <Text style={tw`text-primary-1 font-nokia-bold text-sm`}>
                Try Again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-accent-6 px-4 py-2 rounded-full`}
              onPress={() => navigation.navigate('Home')}>
              <Text style={tw`text-primary-1 font-nokia-bold text-sm`}>
                Go to Home
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
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
          <View style={tw`flex flex-row justify-between my-4`}>
            <View style={tw`border-b border-accent-6`}>
              <Text
                style={[
                  tw`font-nokia-bold text-xl text-secondary-6 text-center`,
                  darkMode ? tw`text-primary-1` : null,
                ]}>
                Courses
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <User
                size={32}
                weight="bold"
                style={[
                  tw`text-secondary-6`,
                  darkMode ? tw`text-primary-1` : null,
                ]}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              placeholder="Search courses..."
              value={searchTerm}
              onChangeText={handleSearch}
              style={[
                tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold`,
                darkMode ? tw`text-primary-1` : null,
              ]}
              placeholderTextColor={darkMode ? '#898989' : '#AAB0B4'}
            />
          </View>
          <View style={tw`flex flex-row justify-between mt-3 items-center`}>
            <Text style={tw`font-nokia-bold text-accent-6 text-lg`}>
              Popular Courses
            </Text>
            <TouchableOpacity
              style={tw`flex flex-row justify-between items-center gap-2`}
              onPress={toggleSortOrder}>
              <Text style={tw`font-nokia-bold text-accent-6 text-lg`}>
                {sortByLatest ? 'Latest' : 'Oldest'}
              </Text>
              <CaretCircleDown size={24} weight="fill" color={'#EA9215'} />
            </TouchableOpacity>
          </View>
          {filteredData.length > 0 ? (
            filteredData.map((course, index) => (
              <View
                style={tw`border border-accent-6 my-2 rounded-4 p-2`}
                key={index}>
                <View style={tw`h-48`}>
                  <Image
                    source={{
                      uri: `https://ezra-seminary.mybese.tech/images/${course.image}`,
                    }}
                    style={tw`w-full h-full rounded-3`}
                  />
                </View>
                <Text style={tw`font-nokia-bold text-accent-6 text-xl mt-2`}>
                  የአጠናን ዘዴዎች
                </Text>
                <Text
                  style={[
                    tw`font-nokia-bold text-secondary-6 text-2xl`,
                    darkMode ? tw`text-primary-3` : null,
                  ]}>
                  {course.title}
                </Text>
                <View style={tw`flex flex-row items-center justify-between`}>
                  <TouchableOpacity
                    style={tw`bg-accent-6 px-4 py-2 rounded-full w-36 mt-2`}
                    onPress={() => handleButtonPress(course._id)}>
                    <Text
                      style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                      ኮርሱን ክፈት
                    </Text>
                  </TouchableOpacity>
                  <View style={tw`flex flex-row items-center gap-1`}>
                    <Text style={tw`font-nokia-bold text-accent-6 text-2xl `}>
                      5.0
                    </Text>
                    <Star size={22} weight="fill" color={'#EA9215'} />
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text
              style={tw`font-nokia-bold text-accent-6 text-lg text-center mt-4 h-full`}>
              No results found
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Course;
