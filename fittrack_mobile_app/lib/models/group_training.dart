// group_training.dart
import 'trainer.dart';
import 'gym.dart';
import 'group_training_user.dart';

class GroupTraining {
  final int id;
  final int gymId;
  final int trainerId;
  final Trainer trainer;
  final Gym gym;
  final List<GroupTrainingUser>? groupTrainingUsers;

  GroupTraining({
    required this.id,
    required this.gymId,
    required this.trainerId,
    required this.trainer,
    required this.gym,
    this.groupTrainingUsers,
  });

  factory GroupTraining.fromJson(Map<String, dynamic> json) {
    return GroupTraining(
      id: json['id'],
      gymId: json['gymId'],
      trainerId: json['trainerId'],
      trainer: Trainer.fromJson(json['trainer']),
      gym: Gym.fromJson(json['gym']),
      groupTrainingUsers: (json['groupTrainingUsers'] as List?)
          ?.map((i) => GroupTrainingUser.fromJson(i))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'gymId': gymId,
      'trainerId': trainerId,
      'trainer': trainer.toJson(),
      'gym': gym.toJson(),
      'groupTrainingUsers': groupTrainingUsers?.map((i) => i.toJson()).toList(),
    };
  }
}
