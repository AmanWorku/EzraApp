import {
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  useColorScheme,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  List,
  User,
  BookOpenText,
  ArrowSquareUpRight,
} from 'phosphor-react-native';
import tw from './../../tailwind';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={tw`flex mx-auto w-[92%]`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex flex-row justify-between my-4 text-secondary-6`}>
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
              <Text style={tw`text-primary-1 font-nokia-bold text-sm`}>
                Open
              </Text>
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
        <View style={tw`border border-accent-6 mt-4 rounded-4 p-2`}>
          {/* <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={tw`mt-4`}>
          <View style={tw`flex flex-row items-center gap-4`}>
            <View style={tw`border border-accent-6 rounded-4 px-4 py-4`}>
              <Text style={tw`font-nokia-bold text-lg text-secondary-6`}>
                የአማርኛ ትምህርት መጽሐፍ ቅዱስ
              </Text>
              <Text style={tw`font-nokia-light text-lg text-secondary-6`}>
                በአማርኛ ትምህርት መጽሐፍ ቅዱስ ለመጻፍ የሚያስችል መልክ ነው።
              </Text>
            </View>
            <View style={tw`border border-accent-6 rounded-4 px-4 py-4`}>
              <Text style={tw`font-nokia-bold text-lg text-secondary-6`}>
                የአማርኛ ትምህርት መጽሐፍ ቅዱስ
              </Text>
              <Text style={tw`font-nokia-light text-lg text-secondary-6`}>
                በአማርኛ ትምህርት መጽሐፍ ቅዱስ ለመጻፍ የሚያስችል መልክ ነው።
              </Text>
            </View>
          </View>
        </ScrollView> */}
          <View style={tw`h-48`}>
            <Image
              source={require('./../assets/bible.png')}
              style={tw`w-full h-full rounded-3`}
            />
          </View>
          <Text style={tw`font-nokia-bold text-accent-6 text-xl mt-2`}>
            የአጠናን ዘዴዎች
          </Text>
          <Text style={tw`font-nokia-bold text-secondary-6 text-2xl`}>
            ፍሬያማ የመጽሃፍ ቅዱስ አጠናን ዘዴዎች
          </Text>
          <TouchableOpacity
            style={tw`bg-accent-6 px-4 py-2 rounded-full w-36 mt-2`}>
            <Text
              style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
              ኮርሱን ክፈት
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`border-b border-primary-7 mt-4 mb-2`}></View>
        <View style={tw`flex flex-row justify-between items-center`}>
          <Text style={tw`font-nokia-bold text-secondary-4 text-lg`}>
            Study this week's SSL
          </Text>
          <TouchableOpacity
            style={tw`border border-accent-6 px-4 py-1 rounded-4`}>
            <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
              All SSLs
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={tw`flex flex-row border border-accent-6 mt-4 rounded-4 p-2 gap-2`}>
          <View style={tw`h-32 w-32`}>
            <Image
              source={require('./../assets/bible.png')}
              style={tw`w-full h-full rounded-3`}
            />
          </View>
          <View style={tw`w-full`}>
            <Text
              style={tw`font-nokia-bold text-accent-6 text-sm leading-tight`}>
              የአጠናን ዘዴዎች
            </Text>
            <Text
              style={tw`font-nokia-bold text-secondary-6 text-lg leading-tight`}>
              ፍሬያማ የመጽሃፍ ቅዱስ አጠናን
            </Text>
            <Text
              style={tw`font-nokia-bold text-secondary-6 text-lg leading-tight`}>
              ዘዴዎች
            </Text>
            <View style={tw`border-b border-accent-6 mt-1 w-[63%]`}></View>
            <Text style={tw`font-nokia-bold text-secondary-5 text-xs`}>
              ጥቅምት 01 - ጥቅምት 07
            </Text>
            <TouchableOpacity
              style={tw`bg-accent-6 px-4 py-1 rounded-full w-36 mt-1`}>
              <Text
                style={tw`text-primary-1 font-nokia-bold text-sm text-center`}>
                ኮርሱን ክፈት
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`border-b border-primary-7 mt-4 mb-2`}></View>
        <View style={tw`flex flex-row justify-between items-center`}>
          <Text style={tw`font-nokia-bold text-secondary-4 text-lg`}>
            Discover Devotionals
          </Text>
          <TouchableOpacity
            style={tw`border border-accent-6 px-4 py-1 rounded-4`}>
            <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
              All Devotionals
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex flex-row flex-wrap h-88 gap-4 mt-2`}>
          <View
            style={tw`w-[45%] h-[45%] flex flex-col gap-8 rounded-2 overflow-hidden`}>
            <ImageBackground
              source={require('./../assets/bible.png')}
              style={tw`overflow-hidden p-2`}>
              <ArrowSquareUpRight
                size={32}
                weight="fill"
                style={tw`text-secondary-1 self-end`}
              />
              <Text style={tw`font-nokia-bold mt-22 text-primary-1 text-lg`}>
                ታህሳስ 18
              </Text>
            </ImageBackground>
          </View>
          <View
            style={tw`w-[45%] h-[45%] flex flex-col gap-8 rounded-2 overflow-hidden`}>
            <ImageBackground
              source={require('./../assets/day22.png')}
              style={tw`overflow-hidden p-2`}>
              <ArrowSquareUpRight
                size={32}
                weight="fill"
                style={tw`text-secondary-1 self-end`}
              />
              <Text style={tw`font-nokia-bold mt-22 text-primary-1 text-lg`}>
                ታህሳስ 18
              </Text>
            </ImageBackground>
          </View>
          <View
            style={tw`w-[45%] h-[45%] flex flex-col gap-8 rounded-2 overflow-hidden`}>
            <ImageBackground
              source={require('./../assets/day4.jpeg')}
              style={tw`overflow-hidden p-2`}>
              <View>
                <ArrowSquareUpRight
                  size={32}
                  weight="fill"
                  style={tw`text-secondary-1 self-end`}
                />
                <Text style={tw`font-nokia-bold mt-22 text-primary-1 text-lg`}>
                  ታህሳስ 18
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View
            style={tw`w-[45%] h-[45%] flex flex-col gap-8 rounded-2 overflow-hidden`}>
            <ImageBackground
              source={require('./../assets/day1.jpeg')}
              style={tw`overflow-hidden p-2`}>
              <View>
                <ArrowSquareUpRight
                  size={32}
                  weight="fill"
                  style={tw`text-secondary-1 self-end`}
                />
                <Text style={tw`font-nokia-bold mt-22 text-primary-1 text-lg`}>
                  ታህሳስ 18
                </Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 255, 255, 0.5)', // Change this to the color and opacity you want
  },
});

export default Home;