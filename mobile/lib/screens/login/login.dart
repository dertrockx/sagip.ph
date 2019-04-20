import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:io';
import 'dart:convert';
// import 'package:fluttertoast/fluttertoast.dart';
import 'package:sagip/config/theme.dart';

import 'package:sagip/components/buttons/primary.dart';

class _Login extends State<Login> {
  final mobileNumberController = TextEditingController();
  final confirmationController = TextEditingController();

  int userId;

  Future<void> login() async {
    this._openLoader();
    final data = { 'phoneNumber': this.mobileNumberController.text };

    try {
      final res = await http.post(
        'https://api.sagip.ph/v1/login',
        headers: { HttpHeaders.contentTypeHeader: 'application/json' },
        body: json.encode(data)
      );

      Navigator.of(context).pop();

      if (res.statusCode != 200) {
        throw Exception('Failure to login');
      }

      this._openConfirmation();

      Map<String, dynamic> payload = json.decode(res.body);
      setState(() {
        this.userId = payload['user']['id'];
      });
    } catch (e) {
      // Fluttertoast.showToast(msg: 'Failure to login');
      debugPrint(e.toString());
    }
  }

  Future<void> sendConfirmationCode() async {
    Navigator.of(context).pop();
    this._openLoader();

    final data = { 'code': this.confirmationController.text, 'intent': 'LOGIN' };

    try {
      final res = await http.post(
        'https://api.sagip.ph/v1/confirm/$userId',
        headers: { HttpHeaders.contentTypeHeader: 'application/json' },
        body: json.encode(data)
      );

      if (res.statusCode != 200) {
        throw Exception('Failure to login');
      }

      Navigator.of(context).pop();

      // Persist authentication
      SharedPreferences preferences = await SharedPreferences.getInstance();
      await preferences.setString('auth', res.body);
      Navigator.of(context).pushNamedAndRemoveUntil('/dashboard', (Route<dynamic> route) => false);
    } catch (e) {
      // Fluttertoast.showToast(msg: 'Failure to login');
      debugPrint(e.toString());
    }
  }

  Future<void> _openLoader() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Logging In'),
          content: SingleChildScrollView(
            child: Center(child: CircularProgressIndicator())
          )
        );
      }
    );
  }

  Future<void> _openConfirmation() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Enter Confirmation Code'),
          content: SingleChildScrollView(
            child: TextField(
              maxLength: 6,
              autofocus: true,
              textAlign: TextAlign.center,
              style: largeText,
              decoration: InputDecoration(
                counterText: '',
              ),
              textCapitalization: TextCapitalization.characters,
              controller: this.confirmationController,
            )
          ),
          actions: <Widget>[
            FlatButton(
              child: Text('Back'),
              onPressed: () { Navigator.of(context).pop(); }
            ),
            FlatButton(
              child: Text('Submit'),
              onPressed: this.sendConfirmationCode
            ),
          ]
        );
      }
    );
  }

  @override
  void dispose() {
    this.mobileNumberController.dispose();
    this.confirmationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    Widget _input = Padding(
      padding: EdgeInsets.symmetric(vertical: mediumSpacing),
      child: TextField(
        maxLength: 10,
        autofocus: true,
        keyboardType: TextInputType.number,
        textAlign: TextAlign.center,
        style: largeText.merge(invertedText),
        decoration: InputDecoration(
          counterText: '',
        ),
        controller: this.mobileNumberController
      )
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
