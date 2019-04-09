import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

import 'package:sagip/components/buttons/primary.dart';

import './conditions.dart';

class ActionSection extends StatelessWidget {
  ActionSection({
    this.hasLocation = false,
    this.nature,

    this.changeDistressNature,
  });

  bool hasLocation;
  String nature;
  void Function(String) changeDistressNature;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget> [
        Padding(
          padding: EdgeInsets.only(bottom: mediumSpacing),
          child: ConditionsSection(
            nature: this.nature,
            changeDistressNature: this.changeDistressNature,
          )
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
