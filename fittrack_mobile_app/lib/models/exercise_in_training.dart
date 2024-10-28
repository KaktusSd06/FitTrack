import 'exercise.dart';

class ExerciseInTraining {
  final int id;
  final int trainingId;
  final int exerciseId;
  final Exercise exercise;
  final TrainingType trainingType;

  ExerciseInTraining({
    required this.id,
    required this.trainingId,
    required this.exerciseId,
    required this.exercise,
    required this.trainingType,
  });


  factory ExerciseInTraining.fromJson(Map<String, dynamic> json) {
    return ExerciseInTraining(
      id: json['id'],
      trainingId: json['trainingId'],
      exerciseId: json['exerciseId'],
      exercise: Exercise.fromJson(json['exercise']),
      trainingType: TrainingType.values[json['trainingType']],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'trainingId': trainingId,
      'exerciseId': exerciseId,
      'exercise': exercise.toJson(),
      'trainingType': trainingType.index,
    };
  }
}


enum TrainingType {
  individual, // Індивідуальне
  forProgram, // Для програми
}