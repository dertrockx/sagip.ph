import 'package:flutter/material.dart';
import 'package:sagip/config/theme.dart';

class Conditions extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final _disasters = <String> ['Extreme Flooding', 'Earthquake', 'Fire'];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget> [
        Text('CONDITION', style: normalText.merge(primaryText)),
        DropdownButton<String>(
          isExpanded: true,
          style: mediumText,
          onChanged: (String d) {},
          hint: Text('Select Condition'),
          items: _disasters.map<DropdownMenuItem<String>>((String d) {
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
