import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
} from 'react-native';
import {ArrowSquareLeft, Warning, XCircle} from 'phosphor-react-native';
import DateConverter from './DateConverter';
import tw from './../../../tailwind';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useGetSSLOfQuarterQuery} from '../../services/SabbathSchoolApi';
import LinearGradient from 'react-native-linear-gradient';
import ErrorScreen from '../../components/ErrorScreen';
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
  const textStyle = 'font-nokia-bold text-sm text-secondary-4';
  const [showModal, setShowModal] = useState(false);
  const [fullDescription, setFullDescription] = useState('');

  const handleMorePress = () => {
    setFullDescription(sslQuarter.quarterly.introduction);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
  const handleButtonPress = (ssl, weekId) => {
    navigation.navigate('SSLWeek', {ssl, weekId});
  };

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
              <View style={tw`mt-4`}>
                <Text
                  style={tw`font-nokia-bold text-sm text-primary-1 text-justify`}
                  numberOfLines={3}>
                  {sslQuarter.quarterly.description}{' '}
                </Text>
                <TouchableOpacity onPress={handleMorePress}>
                  <Text
                    style={tw`font-nokia-bold text-primary-3 border border-primary-3 px-2 w-24 text-center mt-2 rounded py-1`}>
                    ተጨማሪ
                  </Text>
                </TouchableOpacity>
              </View>
              <Modal visible={showModal} transparent animationType="fade">
                <View
                  style={tw`flex-1 justify-center items-center bg-secondary-10 bg-opacity-50`}>
                  <View
                    style={[
                      tw`bg-primary-1 rounded-lg w-90% my-20 rounded`,
                      darkMode ? tw`bg-secondary-6` : null,
                    ]}>
                    <View style={tw`p-4`}>
                      <View
                        style={[
                          tw`flex flex-row justify-between border-b border-accent-6 mb-4`,
                          {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 1,
                            padding: 16,
                            backgroundColor: darkMode ? '#313C44' : '#FFFFFF',
                          },
                        ]}>
                        <Text
                          style={[
                            tw`font-nokia-bold text-lg text-secondary-6 text-center`,
                            darkMode ? tw`text-primary-1` : null,
                          ]}>
                          ሙሉ መግለጫ
                        </Text>
                        <TouchableOpacity onPress={closeModal}>
                          <XCircle
                            weight="bold"
                            size={24}
                            style={tw`text-accent-6`}
                          />
                        </TouchableOpacity>
                      </View>
                      <ScrollView contentContainerStyle={{paddingTop: 56}}>
                        <Text
                          style={[
                            tw`font-nokia-bold text-sm text-secondary-6 text-justify`,
                            darkMode ? tw`text-primary-1` : null,
                          ]}>
                          {fullDescription}
                        </Text>
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </ImageBackground>
        </View>
        <SafeAreaView style={tw`flex`}>
          {sslQuarter.lessons?.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={tw`flex flex-row items-center gap-6 border-t border-secondary-3 w-full py-3 px-6`}
              onPress={() => handleButtonPress(sslId, item.id)}>
              <Text
                style={[
                  tw`font-nokia-bold text-3xl text-secondary-3`,
                  darkMode ? tw`text-primary-7` : null,
                ]}>
                {index + 1}
              </Text>
              <View style={tw`flex flex-col`}>
                <Text
                  style={[
                    tw`font-nokia-bold text-xl leading-tight text-secondary-6`,
                    darkMode ? tw`text-primary-1` : null,
                  ]}>
                  {item.title}
                </Text>
                <View style={tw`flex flex-row`}>
                  <DateConverter
                    gregorianDate={item.start_date}
                    textStyle={textStyle}
                  />
                  <Text style={tw`font-nokia-bold text-secondary-3`}> - </Text>
                  <DateConverter
                    gregorianDate={item.end_date}
                    textStyle={textStyle}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default SSLQuarter;
