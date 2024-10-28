import 'user.dart';

class StepsInfo {
  final int id;
  final int userId;
  final int steps;
  final DateTime date;
  final User user;

  StepsInfo({
    required this.id,
    required this.userId,
    required this.steps,
    required this.date,
    required this.user,
  });

  factory StepsInfo.fromJson(Map<String, dynamic> json) {
    return StepsInfo(
      id: json['id'],
      userId: json['userId'],
      steps: json['steps'],
      date: DateTime.parse(json['date']),
      user: User.fromJson(json['user']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'steps': steps,
      'date': date.toIso8601String(),
      'user': user.toJson(),
    };
  }
}
