import 'user.dart';
import 'trainer.dart';
import 'set.dart';

class IndividualTraining {
  final int id;
  final String? description;
  final DateTime date;
  final String? userId;
  final User? user;
  final String? trainerId;
  final Trainer? trainer;
  final List<Set>? sets;

  IndividualTraining({
    required this.id,
    this.description,
    required this.date,
    this.userId,
    this.user,
    this.trainerId,
    this.trainer,
    this.sets,
  });

  // Factory constructor to create an IndividualTraining instance from a JSON object
  factory IndividualTraining.fromJson(Map<String, dynamic> json) {
    return IndividualTraining(
      id: json['id'] as int,
      description: json['description'] as String?,
      date: DateTime.parse(json['date'] as String),
      userId: json['userId'] as String?,
      user: json['user'] != null ? User.fromJson(json['user']) : null,
      trainerId: json['trainerId'] as String?,
      trainer: json['trainer'] != null ? Trainer.fromJson(json['trainer']) : null,
      sets: (json['sets'] as List<dynamic>?)
          ?.map((set) => Set.fromJson(set as Map<String, dynamic>))
          .toList(),
    );
  }

  // Method to convert an IndividualTraining instance into a JSON object
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'description': description,
      'date': date.toIso8601String(),
      'userId': userId,
      'user': user?.toJson(),
      'trainerId': trainerId,
      'trainer': trainer?.toJson(),
      'sets': sets?.map((set) => set.toJson()).toList(),
    };
  }
}
