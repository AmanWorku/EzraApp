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
        style={tw`border-2 border-accent-6 mt-6 rounded-4 bg-primary-6 shadow-lg px-4 py-4`}>
        <View style={tw`flex flex-row w-[100%] justify-between items-center`}>
          <View style={tw`flex flex-row items-center gap-2`}>
            <BookOpenText size={32} weight="bold" style={tw`text-accent-6`} />
            <Text style={tw`text-secondary-6 font-nokia-bold text-lg`}>
              የዕለቱ ጥቅስ
            </Text>
          </View>
          <TouchableOpacity style={tw`bg-accent-6 px-4 py-1 rounded-full`}>
            <Text style={tw`text-primary-1 font-nokia-bold text-sm`}>Open</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`border-b border-accent-6 mt-2 mb-1`}></View>
        <View>
          <Text style={tw`font-nokia-bold text-lg text-secondary-6`}>
            “የሌላውን ሕይወት መቤዠት የሚችል ሰው፣ ወይም ለእግዚአብሔር ወጆ የሚከፍልለት ማንም የለም። የነፍስ ቤዛ
            ውድ ነውና፤”
          </Text>
          <Text style={tw`font-nokia-light text-lg text-secondary-6`}>
            መዝሙር 49:7፣8
          </Text>
        </View>
      </View>
      <View style={tw`border-b border-primary-7 mt-4 mb-2`}></View>
      <View style={tw`flex flex-row justify-between items-center`}>
        <Text style={tw`font-nokia-bold text-secondary-4 text-lg`}>
          Continue Studying
        </Text>
        <TouchableOpacity
          style={tw`border border-accent-6 px-4 py-1 rounded-4`}>
          <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
            All Courses
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
