import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sagip/config/theme.dart';
import 'dart:convert';
import 'dart:async';
import 'dart:io';

class _CircleScreen extends State<CircleScreen> {
  int userId;

  Future<int> _getUserId() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    String auth = preferences.getString('auth');

    Map<String, dynamic> userAuth = json.decode(auth);
    return userAuth['id'];
  }

  _fetchCircle() async {
    int userId = await this._getUserId();

    try {
      final res = await http.get('https://api.sagip.ph/v1/friend/${userId}');
      Map<String, dynamic> payload = json.decode(res.body);

      if (res.statusCode != 200) {
        throw Exception('Failure to retrieve circle');
      }

      return payload['circle'];
    } catch (e) {
      Fluttertoast.showToast(msg: 'Failure to retrieve circle');
      debugPrint(e.toString());
      return [];
    }
  }

  Widget _buildPage(List circle) {
    return ListView(
      shrinkWrap: true,
      primary: false,
      children: circle.map((friend) {
        return ListTile(
          title: Text(friend['name']),
          subtitle: Text(friend['phoneNumber']),
          onTap: () { this.confirmRemove(friend['id'], friend['name']); }
        );
      }).toList()
    );
  }

  Future<void> removeFriend(int id) async {
    int userId = await this._getUserId();
    final data = { 'friendId': id };

    try {
      Fluttertoast.showToast(msg: 'Removing friend from circle');
      final res = await http.put(
        'https://api.sagip.ph/v1/friend/${userId}',
        headers: { HttpHeaders.contentTypeHeader: 'application/json' },
        body: json.encode(data)
      );

      if (res.statusCode != 200) {
        throw Exception('Failure to remove friend from circle');
      }

      Fluttertoast.showToast(msg: 'Successfully removed friend from circle');
    } catch (e) {
      Fluttertoast.showToast(msg: 'Failure to remove friend from circle');
      debugPrint(e.toString());
    }
  }

  Future<void> confirmRemove(int id, String name) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Remove Friend From Circle'),
          content: SingleChildScrollView(
            child: Text('This will remove $name from your circle.')
          ),
          actions: <Widget>[
            FlatButton(
              child: Text('Cancel'),
              onPressed: () { Navigator.of(context).pop(); }
            ),
            FlatButton(
              child: Text('Remove'),
              onPressed: () {
                Navigator.of(context).pop();
                this.removeFriend(id);
                setState(() {});
              }
            ),
          ]
        );
      }
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Circle'),
        backgroundColor: primaryColor,
      ),
      body: FutureBuilder(
        future: this._fetchCircle(),
        builder: (context, snapshot) {
          switch (snapshot.connectionState) {
            case ConnectionState.waiting:
              return Center(child: CircularProgressIndicator());
            case ConnectionState.done:
              if (!snapshot.hasError) {
                if (snapshot.data.length == 0) {
                  return Center(child: Text('No friends in circle yet', style: normalText));
                }

                return this._buildPage(snapshot.data);
              }
          }
        }
      )
    );
  }
}

class CircleScreen extends StatefulWidget {
  @override
  _CircleScreen createState() => _CircleScreen();
}
