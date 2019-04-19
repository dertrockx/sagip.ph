import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:io';
import 'dart:convert';
import 'package:sagip/config/theme.dart';

import 'package:sagip/components/buttons/primary.dart';

class _Login extends State<Login> {
  final mobileNumberController = TextEditingController();

  Future<Map<String, dynamic>> login() async {
    this._openLoader();

    final data = { 'phoneNumber': this.mobileNumberController.text };
    final res = await http.post(
      'https://api.sagip.ph/v1/login',
      headers: { HttpHeaders.contentTypeHeader: 'application/json' },
      body: json.encode(data)
    );

    Navigator.of(context).pop();

    debugPrint(res.body);
    return json.decode(res.body);
  }

  Future<void> _openLoader() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Logging in'),
          content: SingleChildScrollView(
            child: Center(child: CircularProgressIndicator())
          )
        );
      }
    );
  }

  @override
  void dispose() {
    this.mobileNumberController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Widget _input = TextField(
      maxLength: 11,
      autofocus: true,
      keyboardType: TextInputType.number,
      textAlign: TextAlign.center,
      style: largeText.merge(invertedText),
      controller: this.mobileNumberController
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
                onPressed: this.login,
                // onPressed: () => (
                //   Navigator.of(context).pushNamedAndRemoveUntil(
                //     '/dashboard',
                //     (Route<dynamic> route) => false
                //   )
                // ),
                child: Text('Login', style: mediumText),
              ),
            ]
          )
        )
      )
    );
  }
}

class Login extends StatefulWidget {
  @override
  _Login createState() => _Login();
}
