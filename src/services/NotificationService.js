import notifee from '@notifee/react-native';

export async function onCreateNotification() {
  await notifee.requestPermission();

  // Schedule the daily notification
  const date = new Date(Date.now());
  date.setHours(8, 0, 0); // 8 AM

  await notifee.createTriggerNotification(
    {
      title: 'Verse of the Day',
      body: '“For I know the plans I have for you,” declares the Lord. (Jeremiah 29:11)',
      android: {
        channelId: 'daily-verse',
      },
      ios: {
        sound: 'default',
      },
    },
    {
      type: notifee.TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: notifee.RepeatFrequency.DAILY,
    },
  );
}
