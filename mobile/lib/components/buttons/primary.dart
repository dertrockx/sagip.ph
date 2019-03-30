import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

class PrimaryButton extends StatelessWidget {
  PrimaryButton({
    @required this.child,
    this.onPressed = null,

    this.fluid = false,
  });

  final Widget child;
  final VoidCallback onPressed;

  final bool fluid;

  @override
  Widget build(BuildContext context) {
    Widget _button = FlatButton(
      onPressed: this.onPressed,

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

    return (this.fluid
      ? SizedBox(width: double.infinity, child: _button)
      : _button
    );
  }
}
