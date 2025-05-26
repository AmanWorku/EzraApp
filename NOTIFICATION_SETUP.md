# EzraApp Local Notification System

## Overview
This document describes the local notification system implemented for daily verse notifications in EzraApp.

## Features
- ✅ Daily verse notifications with customizable time
- ✅ Automatic scheduling based on current devotion
- ✅ Permission handling for Android 13+ and iOS
- ✅ Test notification functionality
- ✅ Notification settings UI
- ✅ App navigation when notification is tapped
- ✅ Rich notifications with title, verse, and chapter
- ✅ Weekly devotion reminders

## Components

### 1. NotificationService (`src/services/NotificationService.js`)
Main service class that handles all notification operations:
- **Configuration**: Sets up notification channels and permissions
- **Scheduling**: Schedules daily and weekly notifications
- **Permission Management**: Handles Android 13+ and iOS permissions
- **Settings Management**: Saves/loads notification preferences

### 2. NotificationSettings Screen (`src/screens/Settings/NotificationSettings.js`)
User interface for managing notification preferences:
- Toggle daily notifications on/off
- Set notification time
- Test notification functionality
- View current settings

### 3. App Integration (`App.js`)
Handles notification actions and navigation:
- Configures notification tap handling
- Navigates to devotional screen when notification is tapped

### 4. Devotion Screen Integration (`src/screens/Devotion.js`)
Automatically schedules notifications when devotions are loaded:
- Schedules notification for current day's devotion
- Respects user's notification settings

## Usage

### For Users
1. **Enable Notifications**:
   - Go to Settings → Notification Settings
   - Toggle "Daily Verse Notifications" on
   - Grant permission when prompted

2. **Set Notification Time**:
   - Tap on "Notification Time" 
   - Select your preferred time
   - Notifications will be scheduled automatically

3. **Test Notifications**:
   - Use "Send Test Notification" button to see how notifications appear
   - Check notification panel to verify appearance

### For Developers

#### Scheduling a Notification
```javascript
import NotificationService from '../services/NotificationService';

// Schedule daily verse notification
const devotion = {
  id: 'devotion-1',
  title: 'Daily Verse Title',
  verse: 'Scripture text here',
  chapter: 'Book Chapter:Verse'
};

const time = { hour: 8, minute: 0 }; // 8:00 AM
await NotificationService.scheduleDailyVerseNotification(devotion, time);
```

#### Getting Notification Settings
```javascript
const settings = await NotificationService.getDailyNotificationSettings();
console.log(settings.enabled); // true/false
console.log(settings.time);    // {hour: 8, minute: 0}
```

#### Sending Test Notification
```javascript
NotificationService.showTestNotification(devotion);
```

## Technical Details

### Android Setup
- **Notification Icons**: Uses `ic_notification.png` and `ic_launcher.png`
- **Channels**: Creates "daily-verse" and "general" channels
- **Permissions**: Handles `POST_NOTIFICATIONS` permission for Android 13+

### iOS Setup
- **Permissions**: Requests alert, badge, and sound permissions
- **Background**: Notifications work when app is backgrounded

### Notification Data Structure
```javascript
{
  channelId: 'daily-verse',
  title: '📖 Daily Verse - EzraApp',
  message: 'Title\n\n"Verse text"',
  bigText: 'Title\n\n"Verse text"\n\nChapter',
  userInfo: {
    type: 'daily-verse',
    devotionId: 'id',
    devotionTitle: 'title',
    devotionVerse: 'verse',
    devotionChapter: 'chapter'
  },
  actions: ['View', 'Dismiss'],
  repeatType: 'day'
}
```

## File Structure
```
src/
├── services/
│   └── NotificationService.js          # Main notification service
├── screens/
│   ├── Settings/
│   │   └── NotificationSettings.js     # Settings UI
│   └── Devotion.js                     # Auto-scheduling integration
└── App.js                              # Notification action handling

android/app/src/main/res/
├── drawable-hdpi/ic_notification.png   # Notification icons
├── drawable-mdpi/ic_notification.png
├── drawable-xhdpi/ic_notification.png
├── drawable-xxhdpi/ic_notification.png
└── drawable-xxxhdpi/ic_notification.png
```

## Dependencies
- `react-native-push-notification`: Local notification handling
- `@react-native-async-storage/async-storage`: Settings persistence
- `react-native-modal-datetime-picker`: Time picker UI
- `react-native-permissions`: Permission handling

## Testing
1. **Enable notifications** in settings
2. **Set a time** 1-2 minutes in the future
3. **Use test notification** to verify immediately
4. **Wait for scheduled time** to test automatic notifications
5. **Tap notification** to verify app navigation

## Troubleshooting

### Notifications Not Appearing
1. Check device notification settings for the app
2. Verify notification permissions are granted
3. Check if Do Not Disturb is enabled
4. Test with immediate notification first

### Permission Issues
- **Android**: Ensure `POST_NOTIFICATIONS` permission is granted
- **iOS**: Check notification permissions in device settings

### Time Zone Issues
- Notifications use device local time
- Scheduling accounts for current time zone

## Future Enhancements
- [ ] Firebase remote notifications integration
- [ ] Notification history
- [ ] Multiple daily notifications
- [ ] Custom notification sounds
- [ ] Notification categories/topics 