import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

class PrimaryButton extends StatelessWidget {
  PrimaryButton({
    @required this.child,
    this.onPressed = null,

    this.expanded = false,
    this.color = primaryColor,
    this.textColor = whiteColor,
  });

  final Widget child;
  final VoidCallback onPressed;
  final Color color;
  final Color textColor;

  final bool expanded;

  @override
  Widget build(BuildContext context) {
    Widget _button = FlatButton(
      onPressed: this.onPressed,

      color: this.color,
      disabledColor: disabledBgColor,
      textColor: this.textColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(30.0)
      ),
      padding: EdgeInsets.symmetric(
        vertical: baseSpacing,
        horizontal: xlargeSpacing
      ),

      child: this.child
    );

    return (this.expanded
      ? SizedBox(width: double.infinity, child: _button)
      : _button
    );
  }
}
