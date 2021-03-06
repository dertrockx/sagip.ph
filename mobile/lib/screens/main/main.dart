import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:sms/sms.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sagip/config/theme.dart';
import 'package:sagip/config/constants.dart';
import 'dart:async';

import './components/location.dart';
import './components/action.dart';
import './distress.dart';

class _MainState extends State<Main> {
  bool _isGettingLocation = true;
  bool _isSendingDistress = false;
  bool _sendingDistressHasFailed = false;

  final descriptionController = TextEditingController();

  LocationData _location;
  String _nature;

  void getCurrentLocation() async {
    var loc = Location();

    try {
      setState(() {
        _isGettingLocation = true;
      });

      var userLocation = await loc.getLocation();

      setState(() {
        _location = userLocation;
        _isGettingLocation = false;
      });
    } catch (e) {
      Fluttertoast.showToast(msg: 'Failure to get user location');
      debugPrint(e.toString());
    }
  }

  Future<void> setDistressDateTime() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    DateTime now = DateTime.now();

    await preferences.setString('distress_datetime', now.toString());
  }

  Future<DateTime> getDistressDateTime() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    String datetime = preferences.getString('distress_datetime') ?? '';

    if (datetime.length == 0) {
      return DateTime.now().subtract(Duration(hours: 1));
    }

    return DateTime.parse(datetime).add(Duration(hours: 5));
  }

  void changeDistressNature(String value) {
    setState(() {
      _nature = value;
    });
  }

  Future<void> confirmSend() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Confirm distress'),
          content: SingleChildScrollView(
            child: this._isSendingDistress
              ? Center(child: CircularProgressIndicator())
              : Text(this._sendingDistressHasFailed
                ? 'Sending distress failed. Retry?'
                : 'Please confirm that you\'re sending this distress notification.\n\nYou will not be able to send another distress within the next 5 hours after this.'
              )
          ),
          actions: <Widget>[
            FlatButton(
              child: Text('Close'),
              onPressed: this._isSendingDistress
                ? null
                : () { Navigator.of(context).pop(); }
            ),
            FlatButton(
              child: Text(this._sendingDistressHasFailed
                ? 'Retry'
                : 'Confirm'
              ),
              onPressed: this._isSendingDistress
                ? null
                : () { this.reportDistress(); }
            ),
          ]
        );
      }
    );
  }

  Future<void> getDescription() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Distress Description'),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Text('You can accompany your distress with further description. This will be shown for further details on your experience.'),
                TextField(
                  maxLength: 200,
                  maxLines: 3,
                  autofocus: true,
                  keyboardType: TextInputType.multiline,
                  textCapitalization: TextCapitalization.sentences,
                  decoration: InputDecoration(
                    hintText: '(Optional)',
                  ),
                  controller: this.descriptionController,
                )
              ]
            )
          ),
          actions: <Widget>[
            FlatButton(
              child: Text('Close'),
              onPressed: () { Navigator.of(context).pop(); }
            ),
            FlatButton(
              child: Text('Proceed'),
              onPressed: () {
                Navigator.of(context).pop();
                this.confirmSend();
              }
            ),
          ]
        );
      }
    );
  }

  void reportDistress() {
    final Distress report = Distress(
      intent: 'DISTRESS',
      nature: this._nature,
      long: this._location.longitude,
      lat: this._location.latitude,
      description: this.descriptionController.text,
    );

    debugPrint(report.encode());

    SmsSender sender = SmsSender();
    SmsMessage message = SmsMessage(APP_SHORT_CODE, report.encode());

    message.onStateChanged.listen((state) {
      switch (state) {
        case SmsMessageState.Sending:
          setState(() {
            this._isSendingDistress = true;
            this._sendingDistressHasFailed = false;
          });

          Navigator.of(context).pop();
          this.confirmSend();
          break;

        case SmsMessageState.Sent:
          setState(() {
            this._nature = null;
            this._isSendingDistress = false;
          });
          Navigator.of(context).pop();
          Fluttertoast.showToast(msg: 'Distress notification sent');
          this.setDistressDateTime();
          this.descriptionController.text = '';
          break;

        default:
          setState(() {
            this._isSendingDistress = false;
            this._sendingDistressHasFailed = true;
          });

          Navigator.of(context).pop();
          Fluttertoast.showToast(msg: 'Failure to send distress');
          this.confirmSend();
      }
    });

    sender.sendSms(message);
  }

  Future<void> confirmLogout() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Logout'),
          content: SingleChildScrollView(child: Text('Are you sure that you want to log out?')),
          actions: <Widget>[
            FlatButton(
              child: Text('Cancel'),
              onPressed: () { Navigator.of(context).pop(); }
            ),
            FlatButton(
              child: Text('Log Out'),
              onPressed: () async {
                Navigator.of(context).pop();
                await this.logout();
              }
            ),
          ]
        );
      }
    );
  }

  Future<void> logout() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    preferences.clear();

    Navigator.of(context).pushNamedAndRemoveUntil('/splash', (Route<dynamic> route) => false);
  }

  @override
  void initState() {
    super.initState();
    this.getCurrentLocation();
  }

  @override
  void dispose() {
    this.descriptionController.dispose();
    super.dispose();
  }

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
                  location: this._location,

                  getCurrentLocation: this.getCurrentLocation,
                  confirmLogout: this.confirmLogout,
                )
              ),
              padding: EdgeInsets.symmetric(vertical: baseSpacing)
            )
          ),
          Expanded(
            flex: 3,
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: baseSpacing, vertical: mediumSpacing),
              child: ActionSection(
                isDisabled: this._location == null || this._isGettingLocation || this._nature == null,
                nature: this._nature,

                changeDistressNature: this.changeDistressNature,
                confirmSend: () async {
                  DateTime sent = await getDistressDateTime();

                  if (sent.isBefore(DateTime.now())) {
                    this.getDescription();
                  } else {
                    Fluttertoast.showToast(msg: 'Sending distress notifications within 5 hours after your first distress are rejected.');
                  }
                },
              )
            )
          ),
        ]
      )
    );
  }
}

class Main extends StatefulWidget {
  @override
  _MainState createState() => _MainState();
}
