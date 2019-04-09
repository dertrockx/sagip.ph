import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:sms/sms.dart';
import 'package:sagip/config/theme.dart';
import 'package:sagip/config/constants.dart';

import './components/location.dart';
import './components/action.dart';
import './distress.dart';

class _MainState extends State<Main> {
  bool _isGettingLocation = true;
  bool _isSendingDistress = false;
  bool _sendingDistressHasFailed = false;

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
      debugPrint(e.toString());
    }
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
                : 'Please confirm that you\'re sending this distress notification.'
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

  void reportDistress() {
    final Distress report = Distress(
      intent: 'DISTRESS',
      nature: this._nature,
      long: this._location.longitude,
      lat: this._location.latitude,
    );

    debugPrint(report.encode());

    SmsSender sender = SmsSender();
    SmsMessage message = SmsMessage(APP_SHORT_CODE, report.encode());

    message.onStateChanged.listen((state) {
      switch (state) {
        case SmsMessageState.Sending:
          debugPrint('Sending...');
          setState(() {
            this._isSendingDistress = true;
            this._sendingDistressHasFailed = false;
          });

          Navigator.of(context).pop();
          this.confirmSend();
          break;

        case SmsMessageState.Sent:
          debugPrint('Message sent!');
          setState(() {
            this._nature = null;
            this._isSendingDistress = false;
          });
          Navigator.of(context).pop();
          break;

        default:
          debugPrint('An error occured');
          setState(() {
            this._isSendingDistress = false;
            this._sendingDistressHasFailed = true;
          });
          
          Navigator.of(context).pop();
          this.confirmSend();
      }
    });

    sender.sendSms(message);
  }

  @override
  void initState() {
    super.initState();
    this.getCurrentLocation();
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
                confirmSend: this.confirmSend,
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
