package io.flutter.plugins;

import io.flutter.plugin.common.PluginRegistry;
import com.github.droibit.flutter.plugins.customtabs.CustomTabsPlugin;
import io.github.ponnamkarthik.toast.fluttertoast.FluttertoastPlugin;
import com.lyokone.location.LocationPlugin;
import io.flutter.plugins.sharedpreferences.SharedPreferencesPlugin;
import com.babariviere.sms.SmsPlugin;
import io.flutter.plugins.urllauncher.UrlLauncherPlugin;

/**
 * Generated file. Do not edit.
 */
public final class GeneratedPluginRegistrant {
  public static void registerWith(PluginRegistry registry) {
    if (alreadyRegisteredWith(registry)) {
      return;
    }
    CustomTabsPlugin.registerWith(registry.registrarFor("com.github.droibit.flutter.plugins.customtabs.CustomTabsPlugin"));
    FluttertoastPlugin.registerWith(registry.registrarFor("io.github.ponnamkarthik.toast.fluttertoast.FluttertoastPlugin"));
    LocationPlugin.registerWith(registry.registrarFor("com.lyokone.location.LocationPlugin"));
    SharedPreferencesPlugin.registerWith(registry.registrarFor("io.flutter.plugins.sharedpreferences.SharedPreferencesPlugin"));
    SmsPlugin.registerWith(registry.registrarFor("com.babariviere.sms.SmsPlugin"));
    UrlLauncherPlugin.registerWith(registry.registrarFor("io.flutter.plugins.urllauncher.UrlLauncherPlugin"));
  }

  private static boolean alreadyRegisteredWith(PluginRegistry registry) {
    final String key = GeneratedPluginRegistrant.class.getCanonicalName();
    if (registry.hasPlugin(key)) {
      return true;
    }
    registry.registrarFor(key);
    return false;
  }
}
