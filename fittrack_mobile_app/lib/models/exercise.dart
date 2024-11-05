import 'set.dart';


class Exercise {
  final int id;
  final String? name;
  final String? description;
  final List<Set>? sets;

  Exercise({
    required this.id,
    this.name,
    this.description,
    this.sets,
  });

  // Factory constructor to create an Exercise instance from a JSON object
  factory Exercise.fromJson(Map<String, dynamic> json) {
    return Exercise(
      id: json['id'] as int,
      name: json['name'] as String?,
      description: json['description'] as String?,
      sets: (json['sets'] as List<dynamic>?)
          ?.map((set) => Set.fromJson(set as Map<String, dynamic>))
          .toList(),
    );
  }

  // Method to convert an Exercise instance into a JSON object
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'sets': sets?.map((set) => set.toJson()).toList(),
    };
  }
}
