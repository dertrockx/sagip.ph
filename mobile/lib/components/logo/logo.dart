import 'package:flutter/material.dart';

class Logo extends StatelessWidget {
  Logo({
    this.variant = 'light', // 'dark' or 'light'
    this.dimensions = 124.0,
  });

  String variant;
  double dimensions;

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      'assets/logo/${this.variant == 'light' ? 'logo-light.png' : 'logo-dark.png'}',
      height: this.dimensions,
      width: this.dimensions,
    );
  }
}
