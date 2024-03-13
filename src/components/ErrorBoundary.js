import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    // Callback function to retry fetching the data
    this.setState({hasError: false}); // Reset the error state
    this.props.retryFetch(); // Call the retry function passed as props
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI if an error occurs
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>An error occurred. Please try again later.</Text>
          <Button title="Retry" onPress={this.handleRetry} />
        </View>
      );
    }

    // If there's no error, render the children components as usual
    return this.props.children;
  }
}

export default ErrorBoundary;
