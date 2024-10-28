import 'user.dart';
import 'group_training.dart';

class GroupTrainingUser {
  int id;
  int trainingId;
  int userId;
  User user;
  GroupTraining groupTraining;

  GroupTrainingUser({
    required this.id,
    required this.trainingId,
    required this.userId,
    required this.user,
    required this.groupTraining,
  });

  factory GroupTrainingUser.fromJson(Map<String, dynamic> json) {
    return GroupTrainingUser(
      id: json['id'],
      trainingId: json['trainingId'],
      userId: json['userId'],
      user: User.fromJson(json['user']),
      groupTraining: GroupTraining.fromJson(json['groupTraining']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'trainingId': trainingId,
      'userId': userId,
      'user': user.toJson(),
      'groupTraining': groupTraining.toJson(),
    };
  }
}
