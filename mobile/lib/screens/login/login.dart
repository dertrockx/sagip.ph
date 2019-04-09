import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

import 'package:sagip/components/buttons/primary.dart';

class Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Widget _input = TextField(
      maxLength: 11,
      autofocus: true,
      keyboardType: TextInputType.number,
      textAlign: TextAlign.center,
      style: largeText.merge(invertedText),
    );

    return Material(
      color: primaryColor,
      child: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: xlargeSpacing, horizontal: baseSpacing),
          child: Column(
            children: <Widget> [
              FlutterLogo(size: 72.0),
              Padding(
                padding: EdgeInsets.symmetric(vertical: mediumSpacing),
                child: Text('Login with your mobile', style: mediumText.merge(invertedText))
              ),
              _input,
              PrimaryButton(
                color: whiteColor,
                textColor: primaryColor,
                onPressed: () => Navigator.pushNamed(context, '/dashboard'),
                child: Text('Login', style: mediumText),
              ),
            ]
          )
        )
      )
    );
  }
}
