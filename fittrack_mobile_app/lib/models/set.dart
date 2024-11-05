import 'exercise.dart';
import 'individual_training.dart';

class Set {
  final int id;
  final double weight;
  final int reps;
  final int exerciseId;
  final Exercise? exercise;
  final int individualTrainingId;
  final IndividualTraining? individualTraining;

  Set({
    required this.id,
    required this.weight,
    required this.reps,
    required this.exerciseId,
    this.exercise,
    required this.individualTrainingId,
    this.individualTraining,
  });



  // Factory constructor to create a Set instance from a JSON object
  factory Set.fromJson(Map<String, dynamic> json) {
    return Set(
      id: json['id'] as int,
      weight: json['weight'] as double,
      reps: json['reps'] as int,
      exerciseId: json['exerciseId'] as int,
      exercise: json['exercise'] != null ? Exercise.fromJson(json['exercise']) : null,
      individualTrainingId: json['individualTrainingId'] as int,
      individualTraining: json['individualTraining'] != null
          ? IndividualTraining.fromJson(json['individualTraining'])
          : null,
    );
  }

  // Method to convert a Set instance into a JSON object
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'weight': weight,
      'reps': reps,
      'exerciseId': exerciseId,
      'exercise': exercise?.toJson(),
      'individualTrainingId': individualTrainingId,
      'individualTraining': individualTraining?.toJson(),
    };
  }
}
