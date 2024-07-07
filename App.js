import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import ToastComponent from './src/components/ToastComponent';
import {store, persistor} from './src/redux/store';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {
  House,
  Student,
  Cross,
  CalendarCheck,
  GearSix,
} from 'phosphor-react-native';
import CourseStack from './src/navigation/CourseStack';
import HomeStack from './src/navigation/HomeStack';
import DevotionalStack from './src/navigation/DevotionalStack';
import SSLStack from './src/navigation/SSLStack';
import {useGetCurrentUserQuery} from './src/redux/api-slices/apiSlice';
import {login} from './src/redux/authSlice';
import {Login, Signup, Welcome, Setting, SSL} from './src/screens';
import SettingsStack from './src/navigation/SettingsStack';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const dispatch = useDispatch();

  const {data: userData, error: userError} = useGetCurrentUserQuery();
  //save user data to redux
  useEffect(() => {
    if (userData) {
      dispatch(login(userData)); // Dispatch the login action
    }
  }, [dispatch, userData]);

  const tabBarStyle = {
    backgroundColor: darkMode ? '#293239' : '#F3F3F3',
  };

  if (userError) {
    console.log(userError);
  }

  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(darkMode ? '#293239' : '#F1F1F1', true);
  }
  StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content', true);
  changeNavigationBarColor(darkMode ? '#293239' : '#F1F1F1', !darkMode, true);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconComponent;
          if (route.name === 'Home') {
            iconComponent = <House size={size} color={color} weight="fill" />;
          } else if (route.name === 'Course') {
            iconComponent = <Student size={size} color={color} weight="fill" />;
          } else if (route.name === 'SSL') {
            iconComponent = <Cross size={size} color={color} weight="fill" />;
          } else if (route.name === 'Devotional') {
            iconComponent = (
              <CalendarCheck size={size} color={color} weight="fill" />
            );
          } else if (route.name === 'Setting') {
            iconComponent = <GearSix size={size} color={color} weight="fill" />;
          }
          return iconComponent;
        },
        headerShown: false,
        tabBarActiveTintColor: '#EA9215',
        tabBarInactiveTintColor: darkMode ? '#D3D3D3' : '#3A4750',
        tabBarStyle: tabBarStyle,
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Course" component={CourseStack} />
      <Tab.Screen name="SSL" component={SSLStack} />
      <Tab.Screen name="Devotional" component={DevotionalStack} />
      <Tab.Screen name="Setting" component={SettingsStack} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isCheckingLoginStatus, setIsCheckingLoginStatus] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to get user details', error);
      }
      setIsCheckingLoginStatus(false);
    };

    checkLoginStatus();
  }, []);

  if (isCheckingLoginStatus) {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isAuthenticated ? 'MainTab' : 'Signup'}>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MainTab"
              component={MainTabNavigator}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
      <ToastComponent ref={ref => Toast.setRef(ref)} />
    </Provider>
  );
};

export default App;
