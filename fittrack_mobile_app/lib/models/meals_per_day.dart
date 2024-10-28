import 'user.dart';
import 'meal.dart';

class MealsPerDay {
  final int id;
  final int mealId;
  final int userId;
  final DateTime dateOfConsumption;
  final Meal meal;
  final User user;

  MealsPerDay({
    required this.id,
    required this.mealId,
    required this.userId,
    required this.dateOfConsumption,
    required this.meal,
    required this.user,
  });

  factory MealsPerDay.fromJson(Map<String, dynamic> json) {
    return MealsPerDay(
      id: json['id'],
      mealId: json['mealId'],
      userId: json['userId'],
      dateOfConsumption: DateTime.parse(json['dateOfConsumption']),
      meal: Meal.fromJson(json['meal']),
      user: User.fromJson(json['user']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'mealId': mealId,
      'userId': userId,
      'dateOfConsumption': dateOfConsumption.toIso8601String(),
      'meal': meal.toJson(),
      'user': user.toJson(),
    };
  }
}
