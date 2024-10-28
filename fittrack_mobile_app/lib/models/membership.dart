import 'user.dart';
import 'gym.dart';

class Membership {
  int id;
  int userId;
  int gymId;
  int sessionsRemind;
  DateTime expirationDate;
  double cost;
  User user;
  Gym gym;

  Membership({
    required this.id,
    required this.userId,
    required this.gymId,
    required this.sessionsRemind,
    required this.expirationDate,
    required this.cost,
    required this.user,
    required this.gym,
  });

  factory Membership.fromJson(Map<String, dynamic> json) {
    return Membership(
      id: json['id'],
      userId: json['userId'],
      gymId: json['gymId'],
      sessionsRemind: json['sessionsRemind'],
      expirationDate: DateTime.parse(json['expirationDate']),
      cost: json['cost'].toDouble(),
      user: User.fromJson(json['user']),
      gym: Gym.fromJson(json['gym']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'gymId': gymId,
      'sessionsRemind': sessionsRemind,
      'expirationDate': expirationDate.toIso8601String(),
      'cost': cost,
      'user': user.toJson(),
      'gym': gym.toJson(),
    };
  }
}
