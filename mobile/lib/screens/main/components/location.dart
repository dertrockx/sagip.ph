import 'package:flutter/material.dart';

class Location extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget> [
        Expanded(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget> [
              Padding(
                padding: EdgeInsets.only(bottom: 18.0),
                child: Column(
                  children: <Widget> [
                    Text(
                      '121.24123',
                      style: TextStyle(fontSize: 48.0, color: Colors.white, fontWeight: FontWeight.bold)
                    ),
                    Text('LONGITUDE', style: TextStyle(color: Colors.white)),
                  ]
                )
              ),
              Padding(
                padding: EdgeInsets.only(top: 18.0),
                child: Column(
                  children: <Widget> [
                    Text(
                      '12.24123',
                      style: TextStyle(fontSize: 48.0, color: Colors.white, fontWeight: FontWeight.bold)
                    ),
                    Text('LATITUDE', style: TextStyle(color: Colors.white)),
                  ]
                )
              ),
            ]
          )
        ),
        Text('Hello', style: TextStyle(color: Colors.white)),
      ]
    );
  }
}
