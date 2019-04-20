//
//  Generated file. Do not edit.
//

#import "GeneratedPluginRegistrant.h"
#import <flutter_custom_tabs/CustomTabsPlugin.h>
#import <fluttertoast/FluttertoastPlugin.h>
#import <location/LocationPlugin.h>
#import <shared_preferences/SharedPreferencesPlugin.h>
#import <sms/SmsPlugin.h>
#import <url_launcher/UrlLauncherPlugin.h>

@implementation GeneratedPluginRegistrant

+ (void)registerWithRegistry:(NSObject<FlutterPluginRegistry>*)registry {
  [GDBCustomTabsPlugin registerWithRegistrar:[registry registrarForPlugin:@"GDBCustomTabsPlugin"]];
  [FluttertoastPlugin registerWithRegistrar:[registry registrarForPlugin:@"FluttertoastPlugin"]];
  [LocationPlugin registerWithRegistrar:[registry registrarForPlugin:@"LocationPlugin"]];
  [FLTSharedPreferencesPlugin registerWithRegistrar:[registry registrarForPlugin:@"FLTSharedPreferencesPlugin"]];
  [SmsPlugin registerWithRegistrar:[registry registrarForPlugin:@"SmsPlugin"]];
  [FLTUrlLauncherPlugin registerWithRegistrar:[registry registrarForPlugin:@"FLTUrlLauncherPlugin"]];
}

@end
