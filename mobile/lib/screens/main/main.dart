import 'package:flutter/material.dart';

import './components/location.dart';

class Main extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Material(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Expanded(
            flex: 5,
            child: Container(
              color: Theme.of(context).primaryColor,
              child: SafeArea(
                child: Location()
              ),
              padding: const EdgeInsets.symmetric(vertical: 24.0)
            )
          ),
          Expanded(
            flex: 3,
            child: Text('Hello din!')
          ),
        ]
      )
    );
  }
}
