#import <UserNotifications/UNUserNotificationCenter.h>
#import <RCTAppDelegate.h>
#import <React/RCTBridgeDelegate.h>

@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate, RCTBridgeDelegate>

@end
