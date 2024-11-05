class SetForTraining {
  final int id;
  final double weight;
  final int reps;
  final int exerciseId;
  final String exerciseName;
  final String? description;
  final int individualTrainingId;

  SetForTraining({
    required this.id,
    required this.weight,
    required this.reps,
    required this.exerciseId,
    required this.exerciseName,
    this.description,
    required this.individualTrainingId,
  });

  factory SetForTraining.fromMap(Map<String, dynamic> map) {
    return SetForTraining(
      id: map['id'],
      weight: (map['weight'] as num).toDouble(), // Converts int or double to double
      reps: map['reps'],
      exerciseId: map['exerciseId'],
      exerciseName: map['exercise']['name'] ?? "Відсутня",
      description: map['exercise']['description'],
      individualTrainingId: map['individualTrainingId'],
    );
  }
}
