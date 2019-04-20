import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sagip/config/theme.dart';
import 'dart:io';
import 'dart:convert';

import 'package:sagip/components/buttons/primary.dart';
import './confirmation.dart';

class _Login extends State<Login> {
  final mobileNumberController = TextEditingController();
  final confirmationController = TextEditingController();

  int userId;
  bool _loginEnabled = false;
  bool _confirmationEnabled = false;

  Future<void> login() async {
    this._openLoader();
    final data = { 'phoneNumber': this.mobileNumberController.text };

    try {
      final res = await http.post(
        'https://api.sagip.ph/v1/login',
        headers: { HttpHeaders.contentTypeHeader: 'application/json' },
        body: json.encode(data)
      );
      Map<String, dynamic> payload = json.decode(res.body);

      if (res.statusCode != 200) {
        String exception = payload['error'] ?? 'Failure to login';

        Fluttertoast.showToast(msg: exception);
        throw Exception(exception);
      }

      Navigator.of(context).pop();
      this._openConfirmation();

      setState(() {
        this.userId = payload['user']['id'];
      });
    } catch (e) {
      Navigator.of(context).pop();
      Fluttertoast.showToast(msg: 'Failure to login');
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
      Map<String, dynamic> payload = json.decode(res.body);

      Navigator.of(context).pop();

      if (res.statusCode != 200) {
        String exception = payload['error'] ?? 'Incorrect confirmation code';

        Fluttertoast.showToast(msg: exception);
        this._openConfirmation();
        throw Exception(exception);
      }

      // Persist authentication
      SharedPreferences preferences = await SharedPreferences.getInstance();
      await preferences.setString('auth', res.body);
      Navigator.of(context).pushNamedAndRemoveUntil('/dashboard', (Route<dynamic> route) => false);
    } catch (e) {
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
        return ConfirmationDialog(
          confirmationController: this.confirmationController,
          sendConfirmationCode: this.sendConfirmationCode
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
        controller: this.mobileNumberController,
        onChanged: (String text) {
          if (text.length == 10) setState(() { _loginEnabled = true; });
          else setState(() { _loginEnabled = false; });
        }
      )
    );

    return Material(
      color: primaryColor,
      child: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: xlargeSpacing, horizontal: largeSpacing),
          child: Column(
            children: <Widget> [
              FlutterLogo(size: 72.0),
              Padding(
                padding: EdgeInsets.symmetric(vertical: mediumSpacing),
                child: Text('Login with your mobile', style: mediumText.merge(invertedText))
              ),
              Text(
                'Use your 10-digit mobile number to login (e.g. 917XXXXXXX). You will receive a confirmation code after this.',
                style: invertedText,
                textAlign: TextAlign.center,
              ),
              _input,
              PrimaryButton(
                color: whiteColor,
                textColor: primaryColor,
                onPressed: this._loginEnabled ? this.login : null,
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
