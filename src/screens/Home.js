import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {List, User} from 'phosphor-react-native';
import tw from './../../tailwind';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
      <View style={tw`flex flex-row justify-between h-screen my-4`}>
        <List size={32} weight="bold" style={tw`text-secondary-6`} />
        <Text style={tw`font-nokia-bold text-xl text-accent-6`}>Home</Text>
        <User size={32} weight="bold" style={tw`text-secondary-6`} />
      </View>
      <View>
        <TextInput
          placeholder="Search Anything"
          style={tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold`}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
