import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

import 'package:sagip/components/buttons/primary.dart';

class Action extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget> [
        PrimaryButton(
          fluid: true,
          onPressed: () {},
          child: Text('SEND DISTRESS', style: normalText)
        )
      ],
    );
  }
}
