import 'dart:convert';

class Distress {
  final String intent;
  final String nature;
  final double long;
  final double lat;
  final String description;
  
  Distress({
    this.intent,
    this.nature,
    this.long,
    this.lat,
    this.description = '',
  });

  Map<String, dynamic> _toJson() => {
    'intent': intent,
    'data': {
      'nature': nature,
      'long': long,
      'lat': lat,
      'description': description
    }
  };

  String encode() {
    Map<String, dynamic> obj = this._toJson();

    // @TODO: Encrypt string

    return json.encode(obj);
  }
}
