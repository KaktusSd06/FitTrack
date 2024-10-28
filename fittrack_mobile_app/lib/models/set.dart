import 'exercise.dart';

class Set {
  final int id;
  final int exerciseId;
  final double weight;
  final int reps;
  final Exercise exercise;

  Set({
    required this.id,
    required this.exerciseId,
    required this.weight,
    required this.reps,
    required this.exercise,
  });

  factory Set.fromJson(Map<String, dynamic> json) {
    return Set(
      id: json['id'],
      exerciseId: json['exerciseId'],
      weight: json['weight'].toDouble(),
      reps: json['reps'],
      exercise: Exercise.fromJson(json['exercise']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'exerciseId': exerciseId,
      'weight': weight,
      'reps': reps,
      'exercise': exercise.toJson(),
    };
  }
}
