import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

import './components/location.dart';
import './components/action.dart';

class Main extends StatelessWidget {
  bool _isGettingLocation = true;

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Expanded(
            flex: 5,
            child: Container(
              color: primaryColor,
              child: SafeArea(
                child: LocationSection(
                  isGettingLocation: this._isGettingLocation,
                )
              ),
              padding: EdgeInsets.symmetric(vertical: baseSpacing)
            )
          ),
          Expanded(
            flex: 3,
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: baseSpacing, vertical: mediumSpacing),
              child: ActionSection()
            )
          ),
        ]
      )
    );
  }
}
