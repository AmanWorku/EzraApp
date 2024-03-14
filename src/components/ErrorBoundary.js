import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false, error: null};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true, error};
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({hasError: false});
    // Call the refetch function passed down as a prop
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  handleGoHome = () => {
    const navigation = useNavigation();
    navigation.navigate('Home'); // Assuming 'Home' is the name of your home route
  };

  render() {
    const {hasError, error} = this.state;

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>An error occurred: {error ? error.toString() : null}</Text>
          <Button title="Retry" onPress={this.handleRetry} />
          <Button title="Go to Home" onPress={this.handleGoHome} />
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
