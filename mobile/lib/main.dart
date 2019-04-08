import 'package:flutter/material.dart';

import './screens/main/main.dart';
import './screens/splash/splash.dart';
import './screens/login/login.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final appName = 'sagip.ph';

    return MaterialApp(
      initialRoute: '/dashboard',
      routes: {
        '/': (context) => Splash(),
        '/login': (context) => Login(),
        '/dashboard': (context) => Main(),
      },

      title: appName,
    );
  }
}
