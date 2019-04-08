import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

import 'package:sagip/components/buttons/primary.dart';

import './conditions.dart';

class ActionSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget> [
        Padding(
          padding: EdgeInsets.only(bottom: mediumSpacing),
          child: ConditionsSection()
        ),
        PrimaryButton(
          expanded: true,
          onPressed: () { },
          child: Text('SEND DISTRESS', style: normalText)
        )
      ],
    );
  }
}
