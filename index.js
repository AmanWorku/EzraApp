/**
 * @format
 */

import React from 'react';
import {AppRegistry, LogBox, Platform} from 'react-native';
import App from './App';
import ErrorBoundary from './src/components/ErrorBoundary';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

LogBox.ignoreLogs(['ViewPropTypes will be removed', 'Carousel.propTypes']);

const AppWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
};

AppRegistry.registerComponent(appName, () => AppWithErrorBoundary);

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN: ', token);
  },
  onNotification: function (notification) {
    console.log('Notification: ', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  channelId: '1',

  permissions: {
    alert: 'true',
    badge: 'true',
    sound: 'true',
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});
