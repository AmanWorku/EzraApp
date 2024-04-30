/**
 * @format
 */

import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import ErrorBoundary from './src/components/ErrorBoundary';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

LogBox.ignoreLogs(['ViewPropTypes will be removed', 'Carousel.propTypes']);

const AppWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{flex: 1}}>
        <App />
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

AppRegistry.registerComponent(appName, () => AppWithErrorBoundary);
