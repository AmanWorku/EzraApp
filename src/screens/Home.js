import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {styled} from 'nativewind';
import {Horse, Heart, Cube} from 'phosphor-react-native';
const StyledView = styled(View);
const StyledText = styled(Text);

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const Box = ({className = '', ...props}) => (
    <StyledText
      className={`flex text-center h-14 w-14 justify-center items-center text-white bg-fuchsia-500 rounded ${className}`}
      {...props}
    />
  );
  return (
    <SafeAreaView className="flex mx-auto w-[92%]">
      <StyledView className="flex flex-row justify-between h-screen my-4">
        <Horse />
        <Heart color="#AE2983" weight="fill" size={32} />
        <Cube color="teal" weight="duotone" />
      </StyledView>
    </SafeAreaView>
  );
};

export default Home;
