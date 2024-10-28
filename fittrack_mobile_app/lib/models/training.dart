class Training {
  final int id;
  final String description;
  final DateTime date;

  Training({
    required this.id,
    required this.description,
    required this.date,
  });

  factory Training.fromJson(Map<String, dynamic> json) {
    return Training(
      id: json['id'],
      description: json['description'],
      date: DateTime.parse(json['date']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'description': description,
      'date': date.toIso8601String(),
    };
  }
}
