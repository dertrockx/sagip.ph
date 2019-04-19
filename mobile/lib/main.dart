import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:async';

import './screens/main/main.dart';
import './screens/splash/splash.dart';
import './screens/login/login.dart';

void main() async {
  Widget _defaultHome = Splash();

  SharedPreferences preferences = await SharedPreferences.getInstance();
  String auth = preferences.getString('auth') ?? '';

  debugPrint(auth);

  if (auth.length != 0) {
    _defaultHome = Main();
  }

  runApp(App(defaultHome: _defaultHome));
}

class App extends StatelessWidget {
  App({ @required this.defaultHome });

  final Widget defaultHome;

  @override
  Widget build(BuildContext context) {
    final appName = 'sagip.ph';

    return MaterialApp(
      initialRoute: '/',
      routes: {
        '/': (context) => Splash(),
        '/login': (context) => Login(),
        '/dashboard': (context) => Main(),
      },

      title: appName,
    );
  }
}
