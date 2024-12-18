import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
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
import {onCreateNotification} from './src/services/NotificationService';
import messaging from '@react-native-firebase/messaging';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TOPIC = 'Daily Devotion';

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

  useEffect(() => {
    onCreateNotification();
  }, []);

  const tabBarStyle = {
    backgroundColor: darkMode ? '#293239' : '#F3F3F3',
  };

  if (userError) {
    // console.log(userError);
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
  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {}
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status (authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  const [isCheckingLoginStatus, setIsCheckingLoginStatus] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Signup');

  useEffect(() => {
    checkApplicationPermission();
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(fcmToken => {
          console.log('FCM Token >', fcmToken);
        });
    } else {
      console.log('Not Authorization status');
    }

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log(
            'getInitial Notification:' +
              'Notification caused app to open from quit state',
          );
          console.log(remoteMessage);
          alert(
            'getInitial Notification: Notification caused app to' +
              'open from quit state',
          );
        }
      });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'onNotificationOpenedApp፡' +
            'Notification caused app to open from background state',
        );
        console.log(remoteMessage);
        console.log(
          'onNotificationOpenedApp: Notification caused app to' +
            'open from background state',
        );
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      alert('A new FCM message arrived!');
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging()
      .subscribeToTopic(TOPIC)
      .then(() => {
        console.log('Topic: $(TOPIC) Suscribed');
      });
    return () => unsubscribe;
    // messaging().unsubscribeFromTopic (TOPIC);
  }, []);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          // Dispatch the login action with user data
          store.dispatch(login(JSON.parse(storedUser)));
          setInitialRoute('MainTab'); // User is authenticated
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
            initialRouteName={initialRoute}
            screenOptions={{
              lazy: true,
            }}>
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
