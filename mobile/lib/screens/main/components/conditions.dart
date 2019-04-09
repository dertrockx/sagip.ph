import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';
import 'package:sagip/config/constants.dart';

class ConditionsSection extends StatelessWidget {
  ConditionsSection({
    this.nature,
    this.changeDistressNature,
  });

  String nature;
  void Function(String) changeDistressNature;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget> [
        Text('CONDITION', style: normalText.merge(primaryText)),
        DropdownButton<String>(
          isExpanded: true,
          style: mediumText,
          onChanged: this.changeDistressNature,
          value: this.nature,
          hint: Text('Select Condition'),
          items: DISASTER_LIST.map<DropdownMenuItem<String>>((String d) {
            return DropdownMenuItem<String>(
              value: d,
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: baseSpacing),
                child: Text(d, style: mediumText.merge(defaultText))
              )
            );
          }).toList(),
        )
      ]
    );
  }
}
