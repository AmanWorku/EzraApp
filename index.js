/**
 * @format
 */

import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import ErrorBoundary from './src/components/ErrorBoundary'; // Import the ErrorBoundary component
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

// Ignore specific logs
LogBox.ignoreLogs(['ViewPropTypes will be removed', 'Carousel.propTypes']);

const AppWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
};

AppRegistry.registerComponent(appName, () => AppWithErrorBoundary);
