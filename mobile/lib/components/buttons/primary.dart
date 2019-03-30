import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

class PrimaryButton extends StatelessWidget {
  PrimaryButton({
    @required this.child,
  });

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return FlatButton(
      onPressed: null,

      color: primaryColor,
      disabledColor: disabledBgColor,
      textColor: whiteColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(30.0)
      ),
      padding: EdgeInsets.symmetric(
        vertical: baseSpacing,
        horizontal: mediumSpacing
      ),

      child: this.child
    );
  }
}
