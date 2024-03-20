import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import tw from './../../../tailwind';
import {useSelector} from 'react-redux';
import {ArrowSquareLeft} from 'phosphor-react-native';

const AppInfo = ({navigation}) => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const styles = StyleSheet.create({
    container: tw`flex-1 items-center px-4M w-90% mx-auto pb-8`,
    title: tw`font-nokia-bold text-2xl text-accent-6 my-2 border-b border-accent-6`,
    text: tw`font-nokia-bold text-secondary-6 text-md text-justify leading-tight my-2`,
    subtitle: tw`font-nokia-bold text-accent-6 text-lg text-justify border-b border-accent-6 pb-2`,
  });
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView
        style={[
          tw`flex-1 items-center px-4 bg-primary-1`,
          darkMode && tw`bg-secondary-9`,
        ]}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`self-start`}>
            <ArrowSquareLeft weight="fill" color="#EA9215" />
          </TouchableOpacity>
          <Text style={[styles.title, darkMode && tw`text-accent-6`]}>
            Ezra Seminary
          </Text>
          <Text style={[styles.text, darkMode && tw`text-primary-1`]}>
            Welcome to Ezra Seminary, your comprehensive platform for deepening
            your understanding of biblical teachings, accessing daily
            devotionals, and enriching your spiritual journey. Dive into a world
            of insightful biblical courses, thought-provoking devotionals, and
            interactive Sabbath School lessons, all designed to nourish your
            soul and strengthen your faith.
          </Text>
          <Text style={[styles.subtitle, darkMode && tw`text-accent-6`]}>
            Biblical Courses
          </Text>
          <Text style={[styles.text, darkMode && tw`text-primary-1`]}>
            Explore a diverse range of biblical courses tailored to deepen your
            understanding of scripture. From Old Testament studies to New
            Testament theology, our curated selection of courses offers in-depth
            insights into the Word of God.
          </Text>
          <Text style={[styles.subtitle, darkMode && tw`text-accent-6`]}>
            Daily Devotionals
          </Text>
          <Text style={[styles.text, darkMode && tw`text-primary-1`]}>
            Start your day with inspiration and reflection through our daily
            devotionals. Each day brings a new perspective, guiding you through
            moments of prayer, meditation, and spiritual growth.
          </Text>
          <Text style={[styles.subtitle, darkMode && tw`text-accent-6`]}>
            Sabbath School Lessons
          </Text>
          <Text style={[styles.text, darkMode && tw`text-primary-1`]}>
            Join a vibrant community of learners as we journey through quarterly
            Sabbath School lessons. Engage in interactive discussions, study
            guides, and multimedia resources, all designed to enhance your
            Sabbath School experience.
          </Text>
          <Text style={[styles.subtitle, darkMode && tw`text-accent-6`]}>
            Offline Access
          </Text>
          <Text style={[styles.text, darkMode && tw`text-primary-1`]}>
            Access your favorite content anytime, anywhere, with offline access
            to downloaded courses and devotionals. Whether you're on-the-go or
            offline, your spiritual resources are always within reach.
          </Text>
          <View
            style={[
              tw`border-b`,
              darkMode ? tw`border-primary-1` : tw`border-primary-7`,
              tw`mt-4 mb-4`,
            ]}
          />
          <Text style={[styles.text, darkMode && tw`text-primary-1`]}>
            Download Ezra Seminary today and embark on a transformative journey
            of spiritual enrichment and enlightenment. Let the timeless wisdom
            of scripture guide you as you discover the depths of God's love and
            grace.
          </Text>
          <Text
            style={[
              tw`font-nokia-bold text-accent-6 text-md text-center mt-4`,
              darkMode && tw`text-primary-1`,
            ]}>
            Ezra Seminary
          </Text>
          <Text
            style={[
              tw`font-nokia-bold text-accent-5 text-xs text-center`,
              darkMode && tw`text-primary-3`,
            ]}>
            Version 1.0.0
          </Text>
          <TouchableOpacity
            style={tw`border border-accent-6 rounded-full mt-4 px-4 py-1`}
            onPress={() => navigation.goBack()}>
            <Text
              style={[
                tw`font-nokia-bold text-accent-6 text-md text-center `,
                darkMode && tw`text-primary-1`,
              ]}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AppInfo;
