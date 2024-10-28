import 'training.dart';
import 'user.dart';
import 'trainer.dart';

class IndividualTraining extends Training {
  final int userId;
  final int? trainerId;
  final User user;
  final Trainer? trainer;

  IndividualTraining({
    required int id,
    required String description,
    required DateTime date,
    required this.userId,
    this.trainerId,
    required this.user,
    this.trainer,
  }) : super(id: id, description: description, date: date);

  factory IndividualTraining.fromJson(Map<String, dynamic> json) {
    return IndividualTraining(
      id: json['id'],
      description: json['description'],
      date: DateTime.parse(json['date']), // Include date parsing
      userId: json['userId'],
      trainerId: json['trainerId'],
      user: User.fromJson(json['user']),
      trainer: json['trainer'] != null ? Trainer.fromJson(json['trainer']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'description': description,
      'date': date.toIso8601String(), // Include date serialization
      'userId': userId,
      'trainerId': trainerId,
      'user': user.toJson(),
      'trainer': trainer?.toJson(),
    };
  }
}
