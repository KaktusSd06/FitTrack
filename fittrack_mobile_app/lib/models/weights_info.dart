import 'user.dart';

class WeightsInfo {
  final int id;
  final int userId;
  final double weight;
  final DateTime date;
  final User user;

  WeightsInfo({
    required this.id,
    required this.userId,
    required this.weight,
    required this.date,
    required this.user,
  });

  factory WeightsInfo.fromJson(Map<String, dynamic> json) {
    return WeightsInfo(
      id: json['id'],
      userId: json['userId'],
      weight: json['weight'].toDouble(),
      date: DateTime.parse(json['date']),
      user: User.fromJson(json['user']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'weight': weight,
      'date': date.toIso8601String(),
      'user': user.toJson(),
    };
  }
}
