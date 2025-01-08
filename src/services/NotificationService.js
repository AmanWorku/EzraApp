import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

export function configureNotification() {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('Notification received:', notification);
      notification.finish(PushNotification.FetchResult.NoData);
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: 'default', // Must match `channelId` used in notifications
      channelName: 'Default Channel',
      channelDescription: 'A default channel for notifications',
      soundName: 'default',
      importance: PushNotification.Importance.HIGH, // Ensures heads-up notifications
      vibrate: true,
    },
    created => console.log(`Channel created: ${created}`),
  );

  // Handle foreground messages
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground notification:', remoteMessage);

    PushNotification.localNotification({
      channelId: 'default',
      title: remoteMessage.notification?.title || 'Notification',
      message: remoteMessage.notification?.body || 'You have a new message.',
      bigPictureUrl: remoteMessage.notification?.android?.imageUrl, // Optional
      largeIconUrl: remoteMessage.notification?.android?.imageUrl, // Optional
      priority: 'high', // High priority for heads-up display
      importance: 'high', // High importance for visibility
    });
  });
}
