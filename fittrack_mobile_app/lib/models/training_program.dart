import 'trainer.dart';
import 'training_in_program.dart';

class TrainingProgram {
  final int id;
  final String name;
  final String description;
  final int trainerId;
  final bool isPublic;
  final Trainer trainer; // Assuming Trainer is defined elsewhere
  final List<TrainingInProgram>? trainingsInProgram; // Assuming TrainingInProgram is defined elsewhere

  TrainingProgram({
    required this.id,
    required this.name,
    required this.description,
    required this.trainerId,
    required this.isPublic,
    required this.trainer,
    this.trainingsInProgram,
  });

  factory TrainingProgram.fromJson(Map<String, dynamic> json) {
    return TrainingProgram(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      trainerId: json['trainerId'],
      isPublic: json['isPublic'],
      trainer: Trainer.fromJson(json['trainer']), // Assuming Trainer has a fromJson method
      trainingsInProgram: (json['trainingsInProgram'] as List<dynamic>?)
          ?.map((e) => TrainingInProgram.fromJson(e))
          .toList(), // Assuming TrainingInProgram has a fromJson method
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'trainerId': trainerId,
      'isPublic': isPublic,
      'trainer': trainer.toJson(), // Assuming Trainer has a toJson method
      'trainingsInProgram': trainingsInProgram?.map((e) => e.toJson()).toList(), // Assuming TrainingInProgram has a toJson method
    };
  }
}
