class Distress {
  final String intent;
  final DistressData data;
  final String nature;
  final double long;
  final double lat;
  final String description;
  

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
    Map<String, dynamic> json = this._toJson();

    // @TODO: Encrypt string

    return jsonEncode(json);
  }
}
