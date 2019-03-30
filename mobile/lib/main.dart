import 'package:flutter/material.dart';

import './screens/main/main.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final appName = 'sagip.ph';

    return MaterialApp(
      home: new Main(),

      title: appName,
      theme: ThemeData(
        primaryColor: const Color(0xff001d25),
      )
    );
  }
}
