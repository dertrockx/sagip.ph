import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

import 'package:sagip/components/buttons/primary.dart';

class Splash extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Widget _top = Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget> [
        FlutterLogo(size: 124.0),
        Padding(
          padding: EdgeInsets.symmetric(vertical: baseSpacing),
          child: Text('sagip.ph', style: heroText),
        ),
        Text('Connecting people during disasters', style: mediumText),
      ]
    );

    Widget _buttons = Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget> [
        PrimaryButton(
          expanded: true,
          onPressed: () {},
          child: Text('Get Started', style: mediumText)
        ),
        Padding(
          padding: EdgeInsets.only(top: smallSpacing),
          child: FlatButton(
            onPressed: () {},
            child: Text('Login', style: normalText.merge(primaryText))
          )
        ),
      ]
    );

    return Material(
      child: Column(
        children: <Widget> [
          Expanded(
            flex: 3,
            child: Container(
              width: double.infinity,
              child: SafeArea(child: _top)
            )
          ),
          Expanded(
            flex: 1,
            child: Padding(
              padding: EdgeInsets.all(mediumSpacing),
              child: _buttons
            )
          )
        ]
      )
    );
  }
}
