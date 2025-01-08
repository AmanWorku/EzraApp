import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

export function configureNotification() {
  // Create a notification channel
  PushNotification.createChannel(
    {
      channelId: 'default', // (required)
      channelName: 'Default Channel', // (required)
      channelDescription: 'A default channel', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  // Handle foreground notifications
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);

    // Display the notification
    PushNotification.localNotification({
      channelId: 'default',
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      bigPictureUrl: remoteMessage.notification.android?.imageUrl,
      largeIconUrl: remoteMessage.notification.android?.imageUrl,
      priority: 'high',
      importance: 'high',
      visibility: 'public',
    });
  });

  // Handle background and quit state notifications
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    // Display the notification
    PushNotification.localNotification({
      channelId: 'default',
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
      bigPictureUrl: remoteMessage.notification.android?.imageUrl,
      largeIconUrl: remoteMessage.notification.android?.imageUrl,
      priority: 'high',
      importance: 'high',
      visibility: 'public',
    });
  });
}
