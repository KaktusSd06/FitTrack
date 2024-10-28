import 'training_program.dart';
import 'training.dart';

class TrainingInProgram extends Training {
  final int trainingProgramId;
  final TrainingProgram trainingProgram;

  TrainingInProgram({
    required int id,
    required String description,
    required DateTime date,
    required this.trainingProgramId,
    required this.trainingProgram,
  }) : super(id: id, description: description, date: date);

  factory TrainingInProgram.fromJson(Map<String, dynamic> json) {
    return TrainingInProgram(
      id: json['id'],
      description: json['description'],
      date: DateTime.parse(json['date']),
      trainingProgramId: json['trainingProgramId'],
      trainingProgram: TrainingProgram.fromJson(json['trainingProgram']),
    );
  }

  @override
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'description': description,
      'date': date.toIso8601String(),
      'trainingProgramId': trainingProgramId,
      'trainingProgram': trainingProgram.toJson(),
    };
  }
}
