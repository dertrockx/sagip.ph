import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

class _ConfirmationDialog extends State<ConfirmationDialog> {
  bool _confirmationEnabled = false;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Enter Confirmation Code'),
      content: SingleChildScrollView(
        child: TextField(
          maxLength: 6,
          autofocus: true,
          textAlign: TextAlign.center,
          style: largeText,
          decoration: InputDecoration(
            counterText: '',
          ),
          textCapitalization: TextCapitalization.characters,
          controller: widget.confirmationController,
          onChanged: (String text) {
            if (text.length == 6) setState(() { _confirmationEnabled = true; });
            else setState(() { _confirmationEnabled = false; });
          }
        )
      ),
      actions: <Widget>[
        FlatButton(
          child: Text('Back'),
          onPressed: () { Navigator.of(context).pop(); }
        ),
        FlatButton(
          child: Text('Submit'),
          onPressed: this._confirmationEnabled ? widget.sendConfirmationCode : null
        ),
      ]
    );
  }
}

class ConfirmationDialog extends StatefulWidget {
  ConfirmationDialog({
    this.confirmationController,
    this.sendConfirmationCode,
  });

  TextEditingController confirmationController;
  VoidCallback sendConfirmationCode;

  @override
  _ConfirmationDialog createState() => _ConfirmationDialog();
}
