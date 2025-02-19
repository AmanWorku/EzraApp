import React, {useState, useEffect} from 'react';
import {View, Text, Button, Modal, TouchableOpacity} from 'react-native';
import {ArrowCircleRight} from 'phosphor-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from './../../../tailwind';

const NotificationSettings = () => {
  const [notificationTime, setNotificationTime] = useState({
    hour: 6,
    minute: 0,
  }); // Default to 6:00 AM
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('time');

  useEffect(() => {
    // Load saved notification time from AsyncStorage
    const loadNotificationTime = async () => {
      const savedTime = await AsyncStorage.getItem('notificationTime');
      if (savedTime) {
        const [hour, minute] = savedTime.split(':').map(Number);
        setNotificationTime({hour, minute});
      }
    };
    loadNotificationTime();
  }, []);

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || new Date();
      // Set the time based on the selected date
      setNotificationTime({
        hour: currentDate.getHours(),
        minute: currentDate.getMinutes(),
      });
    }
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  const confirmTime = async () => {
    await AsyncStorage.setItem(
      'notificationTime',
      `${notificationTime.hour}:${notificationTime.minute}`,
    );
    setShowPicker(false); // Close the picker
  };

  // Function to format time in 12-hour format
  const formatTime = (hour, minute) => {
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    const ampm = hour >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    return `${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${ampm}`;
  };

  return (
    <TouchableOpacity
      onPress={showTimePicker}
      style={tw`flex-row justify-between`}>
      <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
        Notification Time:{' '}
        {formatTime(notificationTime.hour, notificationTime.minute)}
      </Text>
      <ArrowCircleRight
        size={24}
        weight="fill"
        color={'#EA9215'}
        style={tw`mr-2`}
      />

      {showPicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
              <DateTimePicker
                value={
                  new Date(
                    0,
                    0,
                    0,
                    notificationTime.hour,
                    notificationTime.minute,
                  )
                }
                mode={mode}
                is24Hour={false} // Set to false for 12-hour format
                onChange={onChange}
              />
              <Button title="OK" onPress={confirmTime} />
              <Button title="Cancel" onPress={() => setShowPicker(false)} />
            </View>
          </View>
        </Modal>
      )}
    </TouchableOpacity>
  );
};

export default NotificationSettings;
