import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

import 'package:sagip/components/buttons/primary.dart';

import './conditions.dart';

class ActionSection extends StatelessWidget {
  ActionSection({
    this.hasLocation = false,
  });

  bool hasLocation;

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
          onPressed: this.hasLocation
            ? () { }
            : null,
          child: Text('SEND DISTRESS', style: normalText)
        )
      ],
    );
  }
}
