import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {List} from 'phosphor-react-native';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView className="flex mx-auto w-[92%]">
      <View className="flex flex-row justify-between h-screen my-4">
        <List size={32} weight="bold" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
