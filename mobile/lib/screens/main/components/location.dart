import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sagip/config/theme.dart';
import 'dart:async';

class LocationSection extends StatelessWidget {
  LocationSection({
    @required this.getCurrentLocation,
    @required this.confirmLogout,

    @required this.isGettingLocation,
    @required this.location,
  });

  bool isGettingLocation;
  LocationData location;

  VoidCallback getCurrentLocation;
  VoidCallback confirmLogout;

  @override
  Widget build(BuildContext context) {
    Widget _longitude = Padding(
      padding: EdgeInsets.only(top: mediumSpacing),
      child: Column(
        children: <Widget> [
          Text(
            this.location?.latitude.toString() ?? "",
            style: heroText.merge(invertedText)
          ),
          Text('LATITUDE', style: normalText.merge(invertedText)),
        ]
      )
    );

    Widget _latitude = Padding(
      padding: EdgeInsets.only(bottom: mediumSpacing),
      child: Column(
        children: <Widget> [
          Text(
            this.location?.longitude.toString() ?? "",
            style: heroText.merge(invertedText)
          ),
          Text('LONGITUDE', style: normalText.merge(invertedText)),
        ]
      )
    );

    Widget _header = Padding(
      padding: EdgeInsets.symmetric(horizontal: mediumSpacing),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          IconButton(
            icon: Icon(Icons.supervised_user_circle, color: whiteColor, size: mediumSpacing),
            tooltip: 'My Circle',
            onPressed: () { Navigator.pushNamed(context, '/circle'); }
          ),
          IconButton(
            icon: Icon(Icons.exit_to_app, color: whiteColor, size: mediumSpacing),
            tooltip: 'Log Out',
            onPressed: () async {
              await this.confirmLogout();
            }
          )
        ]
      )
    );

    return Column(
      children: <Widget> [
        _header,
        Expanded(
          child: this.isGettingLocation
          ? Center(child: CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(whiteColor),
          ))
          : Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget> [
                _latitude,
                _longitude,
              ]
            )
          ),
        FlatButton(
          onPressed: () { this.getCurrentLocation(); },
          child: Text('Reset Location', style: tinyText.merge(invertedText))
        ),
      ]
    );
  }
}
