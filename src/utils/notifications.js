import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to schedule a notification
export const scheduleVerseOfTheDayNotification = async verse => {
  const savedTime = await AsyncStorage.getItem('notificationTime');
  const [hour, minute] = savedTime ? savedTime.split(':').map(Number) : [6, 0]; // Default to 6:00 AM
  console.log('Saved Time Check: ' + savedTime);
  const now = new Date();
  const notificationDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0,
  );

  // If the scheduled time is in the past, schedule for the next day
  if (notificationDate <= now) {
    notificationDate.setDate(notificationDate.getDate() + 1);
  }

  PushNotification.localNotificationSchedule({
    channelId: '1', // Ensure this matches the channel ID you set in PushNotification.configure
    message: verse, // The verse of the day
    date: notificationDate, // Schedule for the specific time
    allowWhileIdle: true, // Allow notification even when the device is idle
  });

  console.log('Notification scheduled for:', notificationDate);
};
