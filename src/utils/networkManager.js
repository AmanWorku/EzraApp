import NetInfo from '@react-native-community/netinfo';

class NetworkManager {
  constructor() {
    this.listeners = new Set();
    this.isOnline = true;
    this.wasConnected = true;
    this.startMonitoring();
  }

  startMonitoring() {
    // Initial check
    NetInfo.fetch().then(state => {
      this.isOnline = state.isConnected;
      this.wasConnected = state.isConnected;
      this.notifyListeners();
    });

    // Subscribe to network state updates
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.wasConnected = this.isOnline;
      this.isOnline = state.isConnected;
      this.notifyListeners();
    });
  }

  addListener(callback) {
    this.listeners.add(callback);
    // Immediately notify the new listener of current state
    callback({
      isOnline: this.isOnline,
      wasConnected: this.wasConnected,
      isNowConnected: this.isOnline && !this.wasConnected,
    });

    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  notifyListeners() {
    const networkState = {
      isOnline: this.isOnline,
      wasConnected: this.wasConnected,
      isNowConnected: this.isOnline && !this.wasConnected,
    };

    this.listeners.forEach(listener => {
      try {
        listener(networkState);
      } catch (error) {
        console.error('Error in network state listener:', error);
      }
    });
  }

  cleanup() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.listeners.clear();
  }
}

// Create a singleton instance
const networkManager = new NetworkManager();

export default networkManager;
