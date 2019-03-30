import 'package:flutter/material.dart';

import './screens/main/main.dart';
import './screens/splash/splash.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final appName = 'sagip.ph';

    return MaterialApp(
      home: new Splash(),

      title: appName,
    );
  }
}
