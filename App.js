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
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import {navigationRef} from './src/navigation/NavigationRef';

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
  const createChannel = async () => {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH, // Ensure the importance is set to HIGH
      visibility: AndroidVisibility.PUBLIC, // Ensure the visibility is set to PUBLIC
      sound: 'default', // Optional: Set a custom sound
    });
  };

  const navigateToScreen = screen => {
    if (screen) {
      // Example of navigation
      navigationRef.current?.navigate(screen);
    }
  };

  const [isCheckingLoginStatus, setIsCheckingLoginStatus] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Signup');

  useEffect(() => {
    // Request permissions
    const requestPermissions = async () => {
      const authStatus = await messaging().requestPermission();
      console.log('Authorization status:', authStatus);
    };

    requestPermissions();

    // Handle foreground notifications
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);

      // Display a notification popup for foreground messages
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: 'default', // Ensure the channel is created
          importance: AndroidImportance.HIGH, // Ensure the importance is set to HIGH
          visibility: AndroidVisibility.PUBLIC, // Ensure the visibility is set to PUBLIC
          pressAction: {
            id: 'default', // Define an action
          },
        },
      });
    });

    // Handle notification when app is opened from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          navigateToScreen(remoteMessage.data.screen); // Handle screen navigation
        }
      });

    // Handle notification when app is opened from background state
    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
          );
          navigateToScreen(remoteMessage.data.screen); // Handle screen navigation
        }
      });

    // Set background message handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message:', remoteMessage);

      // Use notifee to display a notification
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: 'default', // Ensure the channel is created
          importance: AndroidImportance.HIGH, // Ensure the importance is set to HIGH
          visibility: AndroidVisibility.PUBLIC, // Ensure the visibility is set to PUBLIC
          pressAction: {
            id: 'default', // Define an action
          },
        },
      });
    });

    // Create notification channel for Android
    createChannel();

    // Cleanup subscriptions
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
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

  useEffect(() => {
    // Set background event handler for notifee
    notifee.onBackgroundEvent(async ({type, detail}) => {
      console.log('Background event:', type, detail);
      // Handle background event
    });
  }, []);

  if (isCheckingLoginStatus) {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
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

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
