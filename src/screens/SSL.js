import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import tw from './../../tailwind';
import {useSelector} from 'react-redux';
import SSLHome from './SSLScreens/SSLHome';
import InVerseHome from './InVerseScreens/InVerseHome'; // Import the InVerseHome component
import {User} from 'phosphor-react-native';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

const SSL = ({navigation}) => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const [activeTab, setActiveTab] = useState('SSL'); // State to toggle between SSL and InVerse
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = useCallback(async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      Toast.show({
        type: 'info',
        text1: 'Internet Connection Required',
        text2: 'Please connect to the internet to reload data.',
      });
      setIsRefreshing(false);
      return;
    }

    try {
      setIsRefreshing(true);
      // Add a small delay to show the refresh animation
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Force re-render of the active component
      setActiveTab(prev => (prev === 'SSL' ? 'InVerse' : 'SSL'));
      setActiveTab(prev => (prev === 'InVerse' ? 'SSL' : 'InVerse'));
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const handleReload = async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      Toast.show({
        type: 'info',
        text1: 'Internet Connection Required',
        text2: 'Please connect to the internet to reload data.',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Add a small delay to show the loading animation
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Force re-render of the active component
      setActiveTab(prev => (prev === 'SSL' ? 'InVerse' : 'SSL'));
      setActiveTab(prev => (prev === 'InVerse' ? 'SSL' : 'InVerse'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[tw`flex-1`, darkMode ? tw`bg-secondary-9` : null]}>
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#EA9215" />
          <Text
            style={[
              tw`font-nokia-bold text-lg text-accent-6 mt-4`,
              darkMode ? tw`text-primary-1` : null,
            ]}>
            Loading...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[tw`flex-1`, darkMode ? tw`bg-secondary-9` : null]}>
      <View style={tw`flex-1  mx-auto w-[92%]`}>
        {/* Header Section */}
        <View style={tw`flex flex-row justify-between my-4 px-4`}>
          <View style={tw`border-b border-accent-6`}>
            <Text
              style={[
                tw`font-nokia-bold text-xl text-secondary-6 text-center`,
                darkMode ? tw`text-primary-1` : null,
              ]}>
              Sabbath School
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

        {/* Switch Button */}
        <View style={tw`flex flex-row justify-center gap-4 my-2`}>
          <TouchableOpacity
            style={[
              tw`px-4 py-2 rounded-full`,
              activeTab === 'SSL'
                ? tw`bg-accent-6`
                : tw`border border-accent-6`,
            ]}
            onPress={() => setActiveTab('SSL')}>
            <Text
              style={[
                tw`font-nokia-bold`,
                activeTab === 'SSL'
                  ? tw`text-primary-1`
                  : darkMode
                  ? tw`text-accent-6`
                  : tw`text-secondary-6`,
              ]}>
              SSL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`px-4 py-2 rounded-full`,
              activeTab === 'InVerse'
                ? tw`bg-accent-6`
                : tw`border border-accent-6`,
            ]}
            onPress={() => setActiveTab('InVerse')}>
            <Text
              style={[
                tw`font-nokia-bold`,
                activeTab === 'InVerse'
                  ? tw`text-primary-1`
                  : darkMode
                  ? tw`text-accent-6`
                  : tw`text-secondary-6`,
              ]}>
              InVerse
            </Text>
          </TouchableOpacity>
        </View>

        {/* Render Active Component */}
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={['#EA9215']}
              tintColor="#EA9215"
            />
          }>
          {activeTab === 'SSL' ? (
            <SSLHome onReload={handleReload} />
          ) : (
            <InVerseHome onReload={handleReload} />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SSL;
