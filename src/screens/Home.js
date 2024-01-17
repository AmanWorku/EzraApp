import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {List, User, BookOpenText} from 'phosphor-react-native';
import tw from './../../tailwind';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
      <View
        style={tw`flex flex-row justify-between h-screen my-4 text-secondary-6`}>
        <List size={32} weight="bold" style={tw`text-secondary-6`} />
        <Text style={tw`font-nokia-bold text-xl text-secondary-6`}>Home</Text>
        <User size={32} weight="bold" style={tw`text-secondary-6`} />
      </View>
      <View>
        <TextInput
          placeholder="Search anything..."
          style={tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold`}
        />
      </View>
      <View
        style={tw`border-2 border-accent-6 mt-6 rounded-4 bg-primary-6 shadow-md`}>
        <View
          style={tw`flex flex-row w-[100%] px-4 py-4 justify-between items-center`}>
          <BookOpenText size={32} weight="bold" style={tw`text-accent-6`} />
          <Text style={tw`text-secondary-6 font-nokia-bold text-sm`}>
            የዕለቱ ጥቅስ
          </Text>
          <TouchableOpacity style={tw`bg-accent-6 px-4 py-1 rounded-full`}>
            <Text style={tw`text-primary-1 font-nokia-bold text-sm`}>Open</Text>
          </TouchableOpacity>
        </View>
        <View style={`border-b-4 border-red-600`}></View>
        <View>
          <Text></Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
