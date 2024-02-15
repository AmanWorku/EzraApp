import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import DateConverter from './DateConverter';
import {
  useGetSSLOfDayQuery,
  useGetSSLOfDayLessonQuery,
} from '../../services/SabbathSchoolApi';
import {useNavigation} from '@react-navigation/native';
import {ArrowSquareLeft} from 'phosphor-react-native';
import HTMLView from 'react-native-htmlview';
import tw from './../../../tailwind';
import LinearGradient from 'react-native-linear-gradient';

const SSLWeek = ({route}) => {
  const {ssl, weekId} = route.params;
  const scrollRef = useRef();
  const navigation = useNavigation();
  const [check, setCheck] = useState('01');
  const daysOfWeek = ['አርብ', 'ቅዳሜ', 'እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ'];
  const {data: sslQuarter, error: quarterError} = useGetSSLOfDayQuery({
    path: ssl,
    id: weekId,
  });
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
  const [verseModalVisible, setVerseModalVisible] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState('');

  const showModal = verseKey => {
    console.log('Showing Modal with Verse: ', verseKey);
    setSelectedVerse(verseKey); // Now this should set the actual verse text
    setVerseModalVisible(true);
  };

  const hideModal = () => {
    console.log('Hiding Modal');
    setVerseModalVisible(false);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({y: 0, animated: true});
  }, [check]);

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
    const nextCheck = parseInt(check, 10) + 1;
    const paddedNextCheck = nextCheck.toString().padStart(2, '0');
    setCheck(paddedNextCheck);
  };

  const onPreviousButtonClick = () => {
    const previousCheck = parseInt(check, 10) - 1;
    const paddedPreviousCheck = previousCheck.toString().padStart(2, '0');
    setCheck(paddedPreviousCheck);
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
  if (quarterError) {
    return (
      <Text style={tw`text-red-500 mt-12`}>Error: {quarterError.message}</Text>
    );
  }

  const {content} = sslWeek;
  const sanitizedContent = content.replace(/\n/g, '');

  const styles = StyleSheet.create({
    h3: darkMode
      ? tw`font-nokia-bold text-primary-1 text-2xl`
      : tw`font-nokia-bold text-secondary-6 text-2xl`,
    p: darkMode
      ? tw`text-primary-1 font-nokia-bold text-justify py-2`
      : tw`text-secondary-6 font-nokia-bold text-justify py-2`,
    blockquote: darkMode
      ? tw`border-l-4 border-orange-500 p-4 text-primary-1 font-nokia-bold text-xl`
      : tw`border-l-4 border-orange-500 p-4 text-secondary-6 font-nokia-bold text-xl`,
    'blockquote.p': tw`font-nokia-bold text-4xl`,
    em: tw`mt-4`,
    code: {
      ...tw`font-nokia-bold`,
      color: '#EA9215',
    },
    strong: tw`text-xl`,
    a: tw`text-accent-7`,
  });
  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    // console.log('Node:', node);

    // Check if the node is a text node
    if (node.type === 'text') {
      return <Text key={index}>{node.data}</Text>;
    }

    // Handle other types of nodes
    if (node.name === 'blockquote') {
      return (
        <View style={tw`border-l-4 border-accent-6`} key={index}>
          {defaultRenderer(node.children, parent)}
        </View>
      );
    }
    if (node.name === 'a' && node.attribs && node.attribs.class === 'verse') {
      // Extract the verse data from the 'verse' attribute instead of 'href'
      const verseKey = node.attribs.verse ? node.attribs.verse : '';
      console.log('Verse key:', verseKey);

      return (
        <TouchableOpacity key={index} onPress={() => showModal(verseKey)}>
          {defaultRenderer(node.children, node)}
        </TouchableOpacity>
      );
    }
    if (node.name === 'code') {
      // Render code element
      return (
        <Text style={tw`text-blue-500`} key={index}>
          {defaultRenderer(node.children, node)}
        </Text>
      );
    }
  };

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const gradientColor = '#000000';
  const dateStyle = 'font-nokia-bold text-lg text-primary-6';

  return (
    <View style={darkMode ? tw`bg-secondary-9 h-full` : null}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['#EA9215']}
            tintColor="#EA9215"
          />
        }>
        <View style={tw`flex`}>
          <ImageBackground
            source={{uri: sslQuarter.lesson.cover}}
            style={tw`flex-5 flex-col justify-between py-6 px-4 h-80`}>
            <TouchableOpacity
              onPress={handleBackButtonPress}
              style={{zIndex: 1, marginTop: 12}}>
              <ArrowSquareLeft size={36} weight="fill" color={'#EA9215'} />
            </TouchableOpacity>
            <LinearGradient
              colors={[gradientColor, `${gradientColor}20`]}
              style={tw`absolute inset-0`}
              start={{x: 0.5, y: 1}}
              end={{x: 0.5, y: 0.2}}
            />
            <View style={tw`absolute bottom-0 p-4`}>
              <Text style={tw`font-nokia-bold text-lg text-primary-6 py-1`}>
                {daysOfWeek[check % 7]}፣&nbsp;&nbsp;
                <DateConverter
                  gregorianDate={sslWeek.date}
                  style={tw`text-2xl`}
                  textStyle={dateStyle}
                />
              </Text>
              <Text
                style={tw`flex flex-col font-nokia-bold text-3xl text-primary-1 `}>
                {sslWeek.title}
              </Text>
            </View>
          </ImageBackground>
          <Modal
            animationType="slide"
            transparent={true}
            visible={verseModalVisible}
            onRequestClose={hideModal}>
            <SafeAreaView style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{selectedVerse}</Text>
                <TouchableOpacity
                  style={styles.hideModalButton}
                  onPress={hideModal}>
                  <Text style={styles.textStyle}>Hide</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Modal>
          <View style={tw`flex flex-col gap-4 px-4 mt-4`}>
            <HTMLView
              value={sanitizedContent}
              stylesheet={styles}
              renderNode={renderNode}
              addLineBreaks={false}
            />
            <View style={tw`flex flex-row justify-between`}>
              {check !== '01' && (
                <TouchableOpacity
                  style={tw`mb-2 border border-accent-6 px-4 py-1 rounded-4 w-18`}
                  onPress={onPreviousButtonClick}>
                  <Text style={tw`text-accent-6 font-nokia-bold text-xl`}>
                    Back
                  </Text>
                </TouchableOpacity>
              )}
              {check !== '07' && (
                <TouchableOpacity
                  style={[
                    tw`mb-2 border border-accent-6 px-4 py-1 rounded-4 w-18`,
                    check === '01' && tw`self-end`, // Align to the right if check is '01'
                  ]}
                  onPress={onNextButtonClick}>
                  <Text style={tw`text-accent-6 font-nokia-bold text-xl`}>
                    Next
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... other styles remain unchanged

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hideModalButton: {
    position: 'absolute',
    bottom: 10, // Adjust this value to position the button
    alignSelf: 'center', // Center the button horizontally
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20, // Adjust padding to make the button visible
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SSLWeek;
