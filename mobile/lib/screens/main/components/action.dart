import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

import 'package:sagip/components/buttons/primary.dart';

import './conditions.dart';

class ActionSection extends StatelessWidget {
  ActionSection({
    this.isDisabled = true,
    this.nature,

    this.changeDistressNature,
    this.reportDistress,
    this.confirmSend
  });

  bool isDisabled;
  String nature;
  void Function(String) changeDistressNature;
  VoidCallback reportDistress;
  Future<void> Function() confirmSend;

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
          onPressed: !this.isDisabled
            ? () { this.confirmSend(); }
            : null,
          child: Text('SEND DISTRESS', style: normalText)
        )
      ],
    );
  }
}
