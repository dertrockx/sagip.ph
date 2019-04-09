import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:sagip/config/theme.dart';

import './components/location.dart';
import './components/action.dart';
import './distress.dart';

class _MainState extends State<Main> {
  bool _isGettingLocation = true;

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

  void reportDistress() {
    final Distress report = Distress(
      intent: 'DISTRESS',
      nature: this._nature,
      long: this._location.longitude,
      lat: this._location.latitude,
    );

    debugPrint(report.encode());
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
                reportDistress: this.reportDistress,
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
