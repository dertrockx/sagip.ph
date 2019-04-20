import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

class _PhoneNumberDialog extends State<PhoneNumberDialog> {
  bool _submitEnabled = false;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Enter Friend\'s Mobile'),
      content: SingleChildScrollView(
        child: ListBody(
          children: <Widget>[
            Text('Enter your friend\'s 10-digit mobile number (e.g. 917XXXXXXX).'),
            TextField(
              maxLength: 10,
              autofocus: true,
              textAlign: TextAlign.center,
              style: largeText,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                counterText: '',
              ),
              controller: widget.friendNumberController,
              onChanged: (String text) {
                if (text.length == 10) setState(() { _submitEnabled = true; });
                else setState(() { _submitEnabled = false; });
              }
            ),
          ],
        ),
      ),
      actions: <Widget>[
        FlatButton(
          child: Text('Cancel'),
          onPressed: () { Navigator.of(context).pop(); }
        ),
        FlatButton(
          child: Text('Add to Circle'),
          onPressed: this._submitEnabled ? () {
            Navigator.of(context).pop();
            widget.addFriend();
          } : null,
        ),
      ]
    );
  }
}

class PhoneNumberDialog extends StatefulWidget {
  PhoneNumberDialog({
    this.friendNumberController,
    this.addFriend,
  });

  TextEditingController friendNumberController;
  VoidCallback addFriend;

  @override
  _PhoneNumberDialog createState() => _PhoneNumberDialog();
}
