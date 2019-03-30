import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

import 'package:sagip/components/buttons/primary.dart';

import './conditions.dart';

class Action extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget> [
        Padding(
          padding: EdgeInsets.only(bottom: mediumSpacing),
          child: Conditions()
        ),
        PrimaryButton(
          fluid: true,
          onPressed: () {},
          child: Text('SEND DISTRESS', style: normalText)
        )
      ],
    );
  }
}
