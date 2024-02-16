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
import {RenderHTML, defaultRenderer} from 'react-native-render-html';

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
    const verseContent = sslWeek.bible[0].verses[verseKey];

    if (verseContent) {
      setSelectedVerse(verseContent);
      setVerseModalVisible(true);
    } else {
      console.error(`No verse found for key: ${verseKey}`);
    }
  };

  const hideModal = () => {
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

  const renderNode = (node, depth, index, defaultRenderer) => {
    if (node.type === 'text') {
      return (
        <Text key={index} style={tw`font-nokia-bold`}>
          {node.data}
        </Text>
      );
    }
    if (node.name === 'blockquote') {
      return (
        <View key={index}>
          <Text style={tw`border-l-4 border-accent-6 font-nokia-bold pl-3`}>
            {defaultRenderer(node.children)}
          </Text>
        </View>
      );
    }
    if (node.name === 'a') {
      const verseKey = node.attribs.href ? node.attribs.href.substring(1) : ''; // Assume href contains the verse key
      return (
        <TouchableOpacity key={index} onPress={() => showModal(verseKey)}>
          <Text style={tw`text-accent-7 underline`}>
            {defaultRenderer(node.children)}
          </Text>
        </TouchableOpacity>
      );
    }
    if (node.name === 'code') {
      return (
        <Text style={tw`text-accent-6`} key={index}>
          {defaultRenderer(node.children)}
        </Text>
      );
    }
  };

  const source = {
    html: sanitizedContent,
  };

  // define the custom renderer
  const customRenderer = {
    renderers: {
      a: (htmlAttribs, children, convertedCSSStyles, passProps) => (
        <TouchableOpacity onPress={() => showModal(htmlAttribs.verse)}>
          <Text style={tw`text-accent-7 underline`}>{children}</Text>
        </TouchableOpacity>
      ),
    },
    // Possibly add additional renderers for other tags like 'code', 'blockquote' etc. similar to above
  };

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const gradientColor = '#000000';
  const dateStyle = 'font-nokia-bold text-lg text-primary-6';

  const styles = StyleSheet.create({
    text: tw`font-nokia-bold`,
    h3: darkMode
      ? tw`font-nokia-bold text-primary-1 text-2xl`
      : tw`font-nokia-bold text-secondary-6 text-2xl`,
    p: darkMode
      ? tw`text-primary-1 font-nokia-bold text-justify py-1`
      : tw`text-secondary-6 font-nokia-bold text-justify py-1`,
  });

  const stylesSecond = StyleSheet.create({
    text: tw`text-accent-6`,
    h2: darkMode
      ? tw`font-nokia-bold text-primary-1 text-2xl`
      : tw`font-nokia-bold text-secondary-6 text-2xl leading-tighter -mb-8`,
    sup: tw`font-nokia-bold`,
  });

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
            <ScrollView
              contentContainerStyle={tw`flex justify-center items-center bg-secondary-9 bg-opacity-40`}
              style={{height: '70%'}}>
              <View
                style={tw`mx-4 mt-12 bg-white rounded-lg p-6 items-center shadow-opacity-25 rounded-xl border border-accent-6`}>
                <TouchableOpacity style={tw``} onPress={hideModal}>
                  <Text style={tw`text-gray-400 text-lg font-nokia-bold`}>
                    Close
                  </Text>
                </TouchableOpacity>
                <HTMLView value={selectedVerse} stylesheet={stylesSecond} />
              </View>
            </ScrollView>
          </Modal>

          <View style={tw`flex flex-col gap-4 px-4 mt-4`}>
            <RenderHTML
              contentWidth={70} // You should obtain width from somewhere. It's necessary for images if you have any.
              source={source}
              tagsStyles={styles}
              renderers={customRenderer}
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

export default SSLWeek;
