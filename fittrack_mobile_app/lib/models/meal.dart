import 'meals_per_day.dart';

class Meal {
  final int id;
  final String name;
  final double calories;

  final List<MealsPerDay>? mealsPerDay;

  Meal({
    required this.id,
    required this.name,
    required this.calories,
    this.mealsPerDay,
  });

  factory Meal.fromJson(Map<String, dynamic> json) {
    return Meal(
      id: json['id'],
      name: json['name'],
      calories: json['calories'].toDouble(),
      mealsPerDay: json['mealsPerDay'] != null
          ? (json['mealsPerDay'] as List)
          .map((e) => MealsPerDay.fromJson(e))
          .toList()
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'calories': calories,
      'mealsPerDay': mealsPerDay?.map((e) => e.toJson()).toList(),
    };
  }
}
