import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

class Location extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Widget _longitude = Padding(
      padding: EdgeInsets.only(top: mediumSpacing),
      child: Column(
        children: <Widget> [
          Text(
            '12.24123',
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
            '121.24123',
            style: heroText.merge(invertedText)
          ),
          Text('LONGITUDE', style: normalText.merge(invertedText)),
        ]
      )
    );

    return Column(
      children: <Widget> [
        Expanded(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget> [
              _latitude,
              _longitude,
            ]
          )
        ),
        FlatButton(
          onPressed: () {},
          child: Text('Reset Location', style: tinyText.merge(invertedText))
        ),
      ]
    );
  }
}
