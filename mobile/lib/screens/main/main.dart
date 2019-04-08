import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:sagip/config/theme.dart';

import './components/location.dart';
import './components/action.dart';

class _MainState extends State<Main> {
  bool _isGettingLocation = true;
  LocationData _location;

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
                  getCurrentLocation: this.getCurrentLocation,
                  location: this._location,
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
                hasLocation: this._location != null && !this._isGettingLocation,
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
