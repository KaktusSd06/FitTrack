import 'set.dart';
import 'exercise_in_training.dart';

class Exercise {
  final int id;
  final String name;
  final String image;
  final String description;
  final List<Set>? sets; // Використовуйте List для колекцій
  final List<ExerciseInTraining>? exercisesInTraining;

  Exercise({
    required this.id,
    required this.name,
    required this.image,
    required this.description,
    this.sets,
    this.exercisesInTraining,
  });

  // Конструктор для створення об'єкта з JSON
  factory Exercise.fromJson(Map<String, dynamic> json) {
    var setsFromJson = json['sets'] as List?;
    var exercisesInTrainingFromJson = json['exercisesInTraining'] as List?;

    return Exercise(
      id: json['id'],
      name: json['name'],
      image: json['image'],
      description: json['description'],
      sets: setsFromJson != null
          ? List<Set>.from(setsFromJson.map((x) => Set.fromJson(x)))
          : null,
      exercisesInTraining: exercisesInTrainingFromJson != null
          ? List<ExerciseInTraining>.from(
          exercisesInTrainingFromJson.map((x) => ExerciseInTraining.fromJson(x)))
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'image': image,
      'description': description,
      'sets': sets != null ? List<dynamic>.from(sets!.map((x) => x.toJson())) : null,
      'exercisesInTraining': exercisesInTraining != null
          ? List<dynamic>.from(exercisesInTraining!.map((x) => x.toJson()))
          : null,
    };
  }
}
