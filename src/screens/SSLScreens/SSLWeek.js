import React, {useState, useEffect, useRef} from 'react';
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
  TextInput,
  Image,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';
import DateConverter from './DateConverter';
import {
  useGetSSLOfDayQuery,
  useGetSSLOfDayLessonQuery,
} from '../../services/SabbathSchoolApi';
import {useGetVideoLinkQuery} from '../../services/videoLinksApi';
import {useNavigation} from '@react-navigation/native';
import {ArrowSquareLeft, YoutubeLogo} from 'phosphor-react-native';
import HTMLView from 'react-native-htmlview';
import tw from './../../../tailwind';
import LinearGradient from 'react-native-linear-gradient';
import ErrorScreen from '../../components/ErrorScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SSLWeek = ({route}) => {
  const {ssl, weekId} = route.params;
  const scrollRef = useRef();
  const navigation = useNavigation();
  const [check, setCheck] = useState('01');
  const daysOfWeek = ['አርብ', 'ቅዳሜ', 'እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ'];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVerseKey, setSelectedVerseKey] = useState('');
  const [selectedVerseContent, setSelectedVerseContent] = useState('');
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

  const year = ssl.substring(0, 4);
  const quarter = ssl.substring(5, 7);

  const {data: videoLink, error: videoError} = useGetVideoLinkQuery({
    year: year,
    quarter: quarter,
    lesson: weekId,
  });

  const handleWatchYouTube = () => {
    if (videoLink && videoLink.videoUrl) {
      Linking.openURL(videoLink.videoUrl);
    } else {
      alert('Video link not available');
    }
  };

  const [notes, setNotes] = useState({});
  const codeCounterRef = useRef(0);
  const [temporaryNotes, setTemporaryNotes] = useState({});

  useEffect(() => {
    scrollRef.current?.scrollTo({y: 0, animated: true});
  }, [check]);

  const fetchNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = async (key, noteContent) => {
    const newNotes = {...notes, [key]: noteContent};
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const handleBlur = noteKey => {
    saveNote(noteKey, temporaryNotes[noteKey]);
  };

  const darkMode = useSelector(state => state.ui.darkMode);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleVerseClick = verseKey => {
    if (
      sslWeek &&
      sslWeek.bible &&
      sslWeek.bible.length > 0 &&
      sslWeek.bible[[0]].verses &&
      sslWeek.bible[[0]].verses[verseKey]
    ) {
      setSelectedVerseKey(verseKey);
      setSelectedVerseContent(sslWeek.bible[[0]].verses[verseKey]);
      setIsModalOpen(true);
    } else {
      console.error(`Verse key "${verseKey}" not found`);
    }
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVerseKey('');
    setSelectedVerseContent('');
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

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
    return <ErrorScreen refetch={refetch} darkMode={darkMode} />;
  }

  if (quarterError) {
    return (
      <Text style={tw`text-red-500 mt-12`}>Error: {quarterError.message}</Text>
    );
  }

  const {content} = sslWeek;
  const sanitizedContent = content.replace(/\n/g, '');

  const styles = StyleSheet.create({
    text: tw`font-nokia-bold`,
    h3: darkMode
      ? tw`font-nokia-bold text-primary-1 text-2xl`
      : tw`font-nokia-bold text-secondary-6 text-2xl`,
    p: darkMode
      ? tw`text-primary-1 font-nokia-bold text-justify py-2 flex-wrap`
      : tw`text-secondary-6 font-nokia-bold text-justify py-2 flex-wrap`,
    blockquote: darkMode
      ? tw`text-primary-1 font-nokia-bold text-xl`
      : tw`text-secondary-6 font-nokia-bold text-xl`,
    'blockquote.p': tw`font-nokia-bold text-4xl`,
    em: tw`mt-4`,
    code: {
      ...tw`font-nokia-bold`,
      color: '#EA9215',
      backgroundColor: darkMode ? '#333' : '#f5f5f5',
      padding: 4,
      borderRadius: 4,
    },
    strong: tw`text-xl`,
    a: tw`text-accent-6 underline`,
    // Styles for table elements
    table: tw`border border-gray-300 my-4`,
    // tr: tw`border-b border-gray-300`,
    td: tw`border-r border-gray-300 p-2`,
    // 'tr:last-child': tw`border-b-0`,
    // 'td:last-child': tw`border-r-0`,
  });

  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name === 'a') {
      const {class: className, verse: verseReference} = node.attribs;
      if (className === 'verse' && verseReference) {
        const onPress = () => handleVerseClick(verseReference);
        return (
          <Text key={index} style={styles.a} onPress={onPress}>
            {defaultRenderer(node.children, node)}
          </Text>
        );
      }
      return (
        <Text key={index} style={styles.a}>
          {defaultRenderer(node.children, node)}
        </Text>
      );
    }

    if (node.name === 'blockquote') {
      const childrenWithStyles = node.children.map((child, childIndex) => {
        if (child.type === 'text') {
          return (
            <Text
              key={childIndex}
              style={[
                tw`font-nokia-bold text-lg text-justify`,
                darkMode ? tw`text-primary-1` : tw`text-secondary-6`,
              ]}>
              {child.data}
            </Text>
          );
        } else {
          return defaultRenderer(child.children, child);
        }
      });
      return (
        <View
          key={index}
          style={[
            tw`border-l-4 border-accent-6 pl-4 flex flex-row flex-wrap text-wrap`,
          ]}>
          {childrenWithStyles}
        </View>
      );
    }

    // if (node.name === 'code') {
    //   codeCounterRef.current += 1;
    //   const noteKey = `${sslWeek.index}-${check}-code-${codeCounterRef.current}`;
    //   return (
    //     <View key={index}>
    //       <Text style={styles.code}>
    //         {defaultRenderer(node.children, node)}
    //       </Text>
    //       <View style={tw`mt-2`}>
    //         <TextInput
    //           style={tw`border border-gray-300 rounded p-2 text-accent-1 font-nokia-bold`}
    //           placeholder="Add a note..."
    //           placeholderTextColor="#9CA3AF"
    //           value={temporaryNotes[noteKey] || notes[noteKey] || ''}
    //           onChangeText={text =>
    //             setTemporaryNotes(prev => ({...prev, [noteKey]: text}))
    //           }
    //           onBlur={() => handleBlur(noteKey)}
    //         />
    //       </View>
    //     </View>
    //   );
    // }

    if (node.name === 'table') {
      return (
        <View key={index} style={styles.table}>
          {defaultRenderer(node.children, node)}
        </View>
      );
    }

    if (node.name === 'tr') {
      return (
        <View key={index} style={styles.tr}>
          {defaultRenderer(node.children, node)}
        </View>
      );
    }

    if (node.name === 'td') {
      return (
        <View key={index} style={styles.td}>
          {defaultRenderer(node.children, node)}
        </View>
      );
    }

    return undefined;
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
            <TouchableOpacity
              onPress={handleWatchYouTube}
              style={{
                zIndex: 1,
                marginTop: 42,
                position: 'absolute',
                right: 20,
              }}>
              <YoutubeLogo size={36} weight="fill" color={'#EA9215'} />
            </TouchableOpacity>
            <LinearGradient
              colors={[gradientColor, `${gradientColor}20`]}
              style={tw`absolute inset-0`}
              start={{x: 0.5, y: 1}}
              end={{x: 0.5, y: 0.2}}
            />
            <View style={tw`absolute bottom-0 p-4`}>
              <Text style={tw`font-nokia-bold text-lg text-primary-6 py-1`}>
                {daysOfWeek[check % 7]} &nbsp;
                <DateConverter
                  gregorianDate={sslWeek.date}
                  style={tw`text-2xl`}
                  textStyle={dateStyle}
                />
              </Text>
              <Text
                style={tw`flex flex-col font-nokia-bold text-3xl text-primary-1`}>
                {sslWeek.title}
              </Text>
            </View>
          </ImageBackground>
          <View style={tw`flex flex-col gap-4 px-4 mt-4`}>
            <HTMLView
              value={sanitizedContent}
              renderNode={renderNode}
              stylesheet={styles}
              addLineBreaks={false}
            />
            <View style={tw`flex flex-row justify-between`}>
              {check !== '01' && (
                <TouchableOpacity
                  style={tw`mb-2`}
                  onPress={onPreviousButtonClick}>
                  <Text
                    style={tw`text-accent-6 font-nokia-bold text-xl border border-accent-6 px-4 py-1 rounded-4`}>
                    Back
                  </Text>
                </TouchableOpacity>
              )}
              {check !== '07' && (
                <TouchableOpacity
                  style={[tw`mb-2`, check === '01' && tw`self-end`]}
                  onPress={onNextButtonClick}>
                  <Text
                    style={tw`text-accent-6 font-nokia-bold text-xl border border-accent-6 px-4 py-1 rounded-4`}>
                    Next
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={onCloseModal}>
        <View
          style={tw`flex-1 justify-center items-center bg-secondary-9 bg-opacity-70`}>
          <View
            style={[
              tw`max-h-80% bg-primary-2 p-4 rounded-lg w-11/12 max-w-lg border border-accent-8`,
              darkMode ? tw`bg-secondary-9` : null,
            ]}>
            <ScrollView>
              <HTMLView
                value={`<div>${selectedVerseContent}</div>`}
                stylesheet={{
                  p: [
                    tw`text-secondary-6 font-nokia-bold text-justify`,
                    darkMode ? tw`text-primary-1` : null,
                  ],
                  div: [
                    tw`text-secondary-6 font-nokia-bold text-justify`,
                    darkMode ? tw`text-primary-1` : null,
                  ],
                  h2: tw`font-nokia-bold text-2xl text-accent-6`,
                  sup: tw`text-xs font-nokia-bold text-superscript text-accent-6`,
                }}
                addLineBreaks={true}
              />
            </ScrollView>
            <TouchableOpacity
              style={tw`bg-accent-6 mt-4 rounded-lg p-2`}
              onPress={onCloseModal}>
              <Text style={tw`font-nokia-bold text-primary-1 text-center`}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SSLWeek;
