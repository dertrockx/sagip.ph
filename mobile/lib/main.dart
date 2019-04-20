import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:async';

import './screens/main/main.dart';
import './screens/splash/splash.dart';
import './screens/login/login.dart';

String _auth = '';

void main() async {
  SharedPreferences preferences = await SharedPreferences.getInstance();
  _auth = preferences.getString('auth') ?? '';

  debugPrint(_auth);
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final appName = 'sagip.ph';

    return MaterialApp(
      initialRoute: '/',
      onGenerateRoute: (RouteSettings settings) {
        switch (settings.name) {
          case '/':
            return MaterialPageRoute(builder: (_) {
              return _auth.length == 0 ? Splash() : Main();
            });
          case '/login':
            return MaterialPageRoute(builder: (_) => Login());
          case '/dashboard':
            return MaterialPageRoute(builder: (_) => Main());
        }
      },

      title: appName,
    );
  }
}
