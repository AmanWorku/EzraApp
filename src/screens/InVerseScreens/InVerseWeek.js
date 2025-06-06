import React, {useState, useEffect, useRef, useCallback} from 'react';
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
  Linking,
  TextInput,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import DateConverter from './DateConverter';
import {
  useGetInVerseOfDayQuery,
  useGetInVerseOfDayLessonQuery,
} from '../../services/InVerseapi';
import {useNavigation} from '@react-navigation/native';
import {ArrowSquareLeft, CaretUp, CaretDown} from 'phosphor-react-native';
import HTMLView from 'react-native-htmlview';
import tw from '../../../tailwind';
import LinearGradient from 'react-native-linear-gradient';
import ErrorScreen from '../../components/ErrorScreen';
import {format} from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace the NoteBox component with this simpler version
const NoteInput = ({darkMode}) => {
  const [text, setText] = useState('');

  return (
    <TextInput
      multiline
      value={text}
      onChangeText={setText}
      placeholder="Write your note here..."
      placeholderTextColor="#AAB0B4"
      style={[
        tw`bg-primary-2 border border-accent-6 rounded-lg px-3 py-2 min-h-[60px]`,
        darkMode ? tw`text-primary-1` : tw`text-secondary-6`,
        tw`font-nokia-bold text-base`,
      ]}
      textAlignVertical="top"
      autoCapitalize="none"
      autoCorrect={false}
      spellCheck={false}
      numberOfLines={4}
    />
  );
};

// Replace the NoteInput component with this new modal-based system
const NoteModal = ({isVisible, onClose, onSave, initialText, darkMode}) => {
  const [noteText, setNoteText] = useState(initialText || '');

  const handleSave = () => {
    onSave(noteText);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View
        style={tw`flex-1 justify-center items-center bg-secondary-9 bg-opacity-80`}>
        <View
          style={[
            tw`w-11/12 bg-primary-2 p-4 rounded-2 border border-accent-8`,
            darkMode ? tw`bg-secondary-9` : null,
          ]}>
          <TextInput
            multiline
            value={noteText}
            onChangeText={setNoteText}
            placeholder="Write your note here..."
            placeholderTextColor="#AAB0B4"
            style={[
              tw` border border-accent-6 rounded-2 px-3 py-2 min-h-[120px] mb-4`,
              darkMode
                ? tw`text-primary-1 bg-secondary-7`
                : tw`text-secondary-6 bg-primary-2`,
              tw`font-nokia-bold text-base`,
            ]}
            textAlignVertical="top"
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
          />
          <View style={tw`flex-row justify-end gap-4`}>
            <TouchableOpacity
              onPress={onClose}
              style={tw`px-4 py-2 rounded-lg border border-accent-6`}>
              <Text
                style={[
                  tw`font-nokia-bold`,
                  darkMode ? tw`text-primary-1` : tw`text-secondary-6`,
                ]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              style={tw`px-4 py-2 rounded-lg bg-accent-6`}>
              <Text style={tw`font-nokia-bold text-primary-1`}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const InVerseWeek = ({route}) => {
  const {InVerse, weekId} = route.params;
  const scrollRef = useRef();
  const navigation = useNavigation();
  const [check, setCheck] = useState('01');
  const daysOfWeek = ['አርብ', 'ቅዳሜ', 'እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ'];
  const daysOfWeekEng = [
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVerseKey, setSelectedVerseKey] = useState('');
  const [selectedVerseContent, setSelectedVerseContent] = useState('');
  const language = useSelector(state => state.language.language);

  // notes for each <code> block
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [notes, setNotes] = useState({});

  const {data: InVerseQuarter, error: quarterError} = useGetInVerseOfDayQuery({
    path: InVerse,
    id: weekId,
  });

  const {
    data: InVerseWeek,
    isLoading,
    error,
    refetch,
  } = useGetInVerseOfDayLessonQuery({
    path: InVerse,
    id: weekId,
    day: check,
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({y: 0, animated: true});
  }, [check]);

  const darkMode = useSelector(state => state.ui.darkMode);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load notes from AsyncStorage when component mounts or when weekId/check changes
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem(
          `notes-${weekId}-${check}`,
        );
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        } else {
          setNotes({});
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    };
    loadNotes();
  }, [weekId, check]);

  // Save notes to AsyncStorage whenever they change
  const handleSaveNote = useCallback(
    async (noteId, text) => {
      try {
        const newNotes = {
          ...notes,
          [noteId]: text,
        };
        setNotes(newNotes);
        await AsyncStorage.setItem(
          `notes-${weekId}-${check}`,
          JSON.stringify(newNotes),
        );
      } catch (error) {
        console.error('Error saving note:', error);
      }
    },
    [notes, weekId, check],
  );

  const handleVerseClick = useCallback(
    verseKey => {
      if (
        InVerseWeek &&
        InVerseWeek.bible &&
        InVerseWeek.bible.length > 0 &&
        InVerseWeek.bible[[0]].verses &&
        InVerseWeek.bible[[0]].verses[verseKey]
      ) {
        setSelectedVerseKey(verseKey);
        setSelectedVerseContent(InVerseWeek.bible[[0]].verses[verseKey]);
        setIsModalOpen(true);
      } else {
        console.error(
          `Verse key "${verseKey}" not found in InVerseWeek:`,
          InVerseWeek,
        );
      }
    },
    [InVerseWeek],
  );

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedVerseKey('');
    setSelectedVerseContent('');
  }, []);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  const [showSupplementalNotes, setShowSupplementalNotes] = useState(false);

  const handleToggleSupplementalNotes = useCallback(() => {
    setShowSupplementalNotes(prev => !prev);
  }, []);

  const onPrevious = () => {
    if (check !== '01') {
      setCheck(prev => (parseInt(prev, 10) - 1).toString().padStart(2, '0'));
      scrollRef.current?.scrollTo({y: 0, animated: true});
    }
  };

  const onNext = () => {
    if (check !== '07') {
      setCheck(prev => (parseInt(prev, 10) + 1).toString().padStart(2, '0'));
      scrollRef.current?.scrollTo({y: 0, animated: true});
    }
  };

  // Styles definition should be here, after hooks and before early returns if it uses darkMode
  const styles = StyleSheet.create({
    text: tw`font-nokia-bold`,
    h3: darkMode
      ? tw`font-nokia-bold text-primary-1 text-2xl`
      : tw`font-nokia-bold text-secondary-6 text-2xl`,
    p: darkMode
      ? tw`text-primary-1 font-nokia-bold text-justify py-2`
      : tw`text-secondary-6 font-nokia-bold text-justify py-2`,
    blockquote: darkMode
      ? tw`text-primary-1 font-nokia-bold text-xl`
      : tw`text-secondary-6 font-nokia-bold text-xl`,
    'blockquote.p': tw`font-nokia-bold text-4xl`,
    em: tw`mt-4`,
    code: {
      ...tw`font-nokia-bold`,
      color: '#EA9215',
      backgroundColor: darkMode ? '#333' : '#f5f5f5',
      padding: 8,
      borderRadius: 4,
    },
    strong: tw`text-xl`,
    a: darkMode
      ? tw`text-accent-6 font-nokia-bold text-justify py-2`
      : tw`text-accent-6 font-nokia-bold text-justify py-2`,
    table: tw`border border-gray-300 my-4`,
    td: tw`border-r border-gray-300 p-2`,
  });

  // Memoize renderNode
  const renderNode = useCallback(
    (node, index, siblings, parent, defaultRenderer) => {
      /* 1 ─────────  PARAGRAPH  ───────── */
      if (node.name === 'p') {
        // Special case for supplemental notes toggle, which needs access to showSupplementalNotes state
        if (node.children[0]?.data === 'Supplemental EGW Notes') {
          return (
            <TouchableOpacity
              key={index}
              onPress={handleToggleSupplementalNotes}
              style={[
                tw`flex flex-row justify-between p-2 rounded-lg mt-4 border border-lg h-8`,
              ]}>
              <Text
                style={[
                  tw`font-nokia-bold`,
                  darkMode ? tw`text-accent-6` : tw`text-secondary-6`,
                ]}>
                {node.children[0].data}
              </Text>
              {showSupplementalNotes ? (
                <CaretUp size={24} color={darkMode ? '#FFFFFF' : '#000000'} />
              ) : (
                <CaretDown size={24} color={darkMode ? '#FFFFFF' : '#000000'} />
              )}
            </TouchableOpacity>
          );
        }
        // Default paragraph rendering
        return (
          <Text
            key={index}
            style={[
              styles.p, // font-nokia-bold, colour, justify, etc.
              {flexWrap: 'wrap'}, // allow the text itself to wrap
            ]}>
            {defaultRenderer(node.children, node)}
          </Text>
        );
      }

      // Handle verse links (a tags) - render as inline Text with specific styles
      if (node.name === 'a') {
        const {class: className, verse: verseReference} = node.attribs;
        const linkStyle = [tw`font-nokia-bold text-accent-6 underline`];
        if (className === 'verse' && verseReference) {
          const onPress = () => handleVerseClick(verseReference); // handleVerseClick needs to be stable or in deps
          return (
            <Text key={index} style={linkStyle} onPress={onPress}>
              {defaultRenderer(node.children, node)}{' '}
            </Text>
          );
        }
        return (
          <Text key={index} style={linkStyle}>
            {defaultRenderer(node.children, node)}
          </Text>
        );
      }

      // Handle blockquote handling
      if (node.name === 'blockquote') {
        const childrenWithStyles = node.children.map((child, childIndex) => {
          if (child.type === 'text') {
            return (
              <Text
                key={childIndex}
                style={[
                  tw`font-nokia-bold text-lg text-justify`,
                  darkMode ? tw`text-primary-1` : tw`text-secondary-6`,
                  {flexWrap: 'wrap'},
                ]}>
                {child.data}
              </Text>
            );
          } else {
            return defaultRenderer([child], parent);
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

      // Keep table handling
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

      // Keep supplemental notes div handling
      if (
        node.name === 'div' &&
        node.attribs?.class === 'ss-donation-appeal-text'
      ) {
        return showSupplementalNotes ? (
          <View key={index} style={tw`mt-2`}>
            {defaultRenderer(node.children, node)}
          </View>
        ) : null;
      }

      // Note section handling
      if (node.name === 'code') {
        const codeContent = (node.children ?? [])
          .map(child => child.data || '')
          .join('');

        const noteId = `${weekId}-${check}-${index}-${codeContent.substring(
          0,
          20,
        )}`;
        const noteText = notes[noteId] || '';

        const screenWidth = Dimensions.get('window').width;
        const containerWidth = screenWidth - 32;

        return (
          <View
            key={noteId}
            style={[
              tw`mb-1`,
              {width: containerWidth, maxWidth: containerWidth},
            ]}>
            <View
              style={[
                tw`rounded-lg p-2`,
                {
                  backgroundColor: darkMode ? '#333' : '#f5f5f5',
                  width: '100%',
                  maxWidth: '100%',
                },
              ]}>
              <View style={{width: '100%', maxWidth: '100%'}}>
                <Text
                  style={[
                    tw`font-nokia-bold`,
                    {
                      color: '#EA9215',
                      width: '100%',
                    },
                  ]}
                  numberOfLines={undefined}
                  ellipsizeMode="clip">
                  {codeContent}
                </Text>
              </View>
            </View>
            <View style={{margin: 0, padding: 0}}>
              <Text
                style={{
                  margin: 0,
                  padding: 0,
                  textDecorationLine: 'underline',
                  color: darkMode ? '#fff' : '#222',
                  fontFamily: 'NokiaPureText-Bold',
                }}>
                {noteText || ''}
              </Text>
              <TouchableOpacity
                style={{
                  margin: 0,
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  backgroundColor: '#EA9215',
                  borderRadius: 8,
                  marginTop: 4,
                  alignSelf: 'flex-start',
                }}
                onPress={() => setActiveNoteId(noteId)}>
                <Text
                  style={{
                    margin: 0,
                    padding: 0,
                    color: '#fff',
                    fontFamily: 'NokiaPureText-Bold',
                  }}>
                  {noteText ? 'Edit Note' : 'Add Note'}
                </Text>
              </TouchableOpacity>
            </View>
            <NoteModal
              isVisible={activeNoteId === noteId}
              onClose={() => setActiveNoteId(null)}
              onSave={text => handleSaveNote(noteId, text)}
              initialText={noteText}
              darkMode={darkMode}
            />
          </View>
        );
      }

      return undefined;
    },
    [
      darkMode,
      handleVerseClick,
      handleToggleSupplementalNotes,
      showSupplementalNotes,
      styles,
      weekId,
      check,
      notes,
      setActiveNoteId,
      handleSaveNote,
      activeNoteId,
    ],
  );

  const handleBackButtonPress = () => {
    navigation.goBack();
  };
  const gradientColor = '#000000';
  const dateStyle = 'font-nokia-bold text-lg text-primary-6';
  const modifiedContent = selectedVerseContent.replace(/<h2>/g, '<br><h2>');

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

  if (!InVerseWeek || !InVerseWeek.content) {
    return (
      <SafeAreaView style={darkMode ? tw`bg-secondary-9 h-100%` : null}>
        <Text style={tw`font-nokia-bold text-lg text-accent-6 text-center`}>
          Content not available
        </Text>
      </SafeAreaView>
    );
  }

  const {content} = InVerseWeek;
  const sanitizedContent = content.replace(/\n/g, '');

  const parseCustomDate = dateString => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const formatDate = startDate => {
    try {
      const start = format(parseCustomDate(startDate), 'MMM dd');
      return `${start}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

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
            source={{uri: InVerseQuarter.lesson.cover}}
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
              {language === 'en' ? (
                <Text style={tw`font-nokia-bold text-lg text-primary-6 py-1`}>
                  {daysOfWeekEng[check % 7]}, &nbsp;
                  <Text style={tw`text-accent-6`}>
                    {formatDate(InVerseWeek.date)}
                  </Text>
                </Text>
              ) : (
                <Text style={tw`font-nokia-bold text-lg text-primary-6 py-1`}>
                  {daysOfWeek[check % 7]}፣ &nbsp;
                  <DateConverter
                    gregorianDate={InVerseWeek.date}
                    style={tw`text-2xl`}
                    textStyle={dateStyle}
                  />
                </Text>
              )}
              <Text
                style={tw`flex flex-col font-nokia-bold text-3xl text-primary-1`}>
                {InVerseWeek.title}
              </Text>
            </View>
          </ImageBackground>
          <View style={tw`flex flex-col gap-4 px-4 mt-4`}>
            <View style={{width: '100%'}}>
              <HTMLView
                value={sanitizedContent}
                renderNode={renderNode}
                stylesheet={styles}
                addLineBreaks={false}
                onLinkPress={() => {}}
                onLinkLongPress={() => {}}
                textComponentProps={{
                  selectable: true,
                  style: [
                    tw`font-nokia-bold`,
                    darkMode ? tw`text-primary-1` : tw`text-secondary-6`,
                    {flexWrap: 'wrap'},
                  ],
                }}
              />
            </View>
            <View style={tw`flex flex-row justify-between`}>
              {check !== '01' && (
                <TouchableOpacity style={tw`mb-2`} onPress={onPrevious}>
                  <Text
                    style={tw`text-accent-6 font-nokia-bold text-xl border border-accent-6 px-4 py-1 rounded-4`}>
                    ተመለስ
                  </Text>
                </TouchableOpacity>
              )}
              {check !== '07' && (
                <TouchableOpacity
                  style={[tw`mb-2`, check === '01' && tw`self-end`]}
                  onPress={onNext}>
                  <Text
                    style={tw`text-accent-6 font-nokia-bold text-xl border border-accent-6 px-4 py-1 rounded-4`}>
                    ቀጥል
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
                value={`<div>${modifiedContent}</div>`}
                stylesheet={styles}
                addLineBreaks={true}
              />
            </ScrollView>
            <TouchableOpacity
              style={tw`bg-accent-6 mt-4 rounded-lg p-2`}
              onPress={onCloseModal}>
              <Text style={tw`font-nokia-bold text-primary-1 text-center`}>
                ዝጋ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InVerseWeek;
