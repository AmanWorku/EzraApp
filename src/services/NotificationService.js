import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export async function onCreateNotification() {
  await notifee.requestPermission();

  // Create a notification channel
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    sound: 'default',
  });

  // Handle foreground notifications
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);

    // Prevent duplicate notifications
    if (remoteMessage.notification) {
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
          pressAction: {
            id: 'default',
          },
          largeIcon: remoteMessage.notification.android?.imageUrl,
          style: remoteMessage.notification.android?.imageUrl
            ? {
                type: notifee.AndroidStyle.BIGPICTURE,
                picture: remoteMessage.notification.android?.imageUrl,
              }
            : undefined,
        },
      });
    }
  });

  // Handle background and quit state notifications
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    // Prevent duplicate notifications
    if (remoteMessage.notification) {
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
          pressAction: {
            id: 'default',
          },
          largeIcon: remoteMessage.notification.android?.imageUrl,
          style: remoteMessage.notification.android?.imageUrl
            ? {
                type: notifee.AndroidStyle.BIGPICTURE,
                picture: remoteMessage.notification.android?.imageUrl,
              }
            : undefined,
        },
      });
    }
  });
}
