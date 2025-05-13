import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tw from './../../tailwind';
import {useSelector} from 'react-redux';
import SSLHome from './SSLScreens/SSLHome';
import InVerseHome from './InVerseScreens/InVerseHome'; // Import the InVerseHome component
import {List, User} from 'phosphor-react-native';

const SSL = ({navigation}) => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const [activeTab, setActiveTab] = useState('SSL'); // State to toggle between SSL and InVerse

  console.log('Active Tab:', activeTab);

  return (
    <View style={darkMode ? tw`bg-secondary-9` : null}>
      <SafeAreaView style={tw`flex flex-col mx-auto w-[92%]`}>
        {/* Header Section */}
        <View style={tw`flex flex-row justify-between my-4`}>
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
        <View style={tw`flex flex-row justify-center gap-4 my-4`}>
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
                activeTab === 'SSL' ? tw`text-primary-1` : tw`text-secondary-6`,
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
                  : tw`text-secondary-6`,
              ]}>
              InVerse
            </Text>
          </TouchableOpacity>
        </View>

        {/* Render Active Component */}
        {activeTab === 'SSL' ? <SSLHome /> : <InVerseHome />}
      </SafeAreaView>
    </View>
  );
};

export default SSL;
