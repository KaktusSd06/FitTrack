class Meal {
  final int? id; // Зроблено nullable, оскільки може бути null
  final String? name; // Назва страви, nullable
  final double? calories; // Калорійність, nullable
  final DateTime? dateOfConsumption; // Дата споживання, nullable
  final String? userId; // ID користувача, nullable
  final User? user; // Зв'язок з класом User, nullable

  Meal({
    this.id,
    this.name,
    this.calories,
    this.dateOfConsumption,
    this.userId,
    this.user,
  });

  // Метод для створення Meal з JSON
  factory Meal.fromJson(Map<String, dynamic> json) {
    return Meal(
      id: json['id'] as int?,
      name: json['name'] as String?,
      calories: (json['calories'] as num?)?.toDouble(), // Конвертація в double
      dateOfConsumption: json['dateOfConsumption'] != null
          ? DateTime.parse(json['dateOfConsumption'])
          : null,
      userId: json['userId'] as String?,
      user: json['user'] != null ? User.fromJson(json['user']) : null, // Залежить від реалізації класу User
    );
  }

  // Метод для перетворення Meal в JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'calories': calories,
      'dateOfConsumption': dateOfConsumption?.toIso8601String(),
      'userId': userId,
      'user': user?.toJson(), // Залежить від реалізації класу User
    };
  }
}

class User {
  // Реалізація класу User повинна бути тут
  // Наприклад, якщо User має id і name:
  final String id;
  final String name;

  User({
    required this.id,
    required this.name,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      name: json['name'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
    };
  }
}
