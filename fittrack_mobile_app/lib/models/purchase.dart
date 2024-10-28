import 'user.dart';

class Purchase {
  final int id;
  final int itemId;
  final int userId;
  final DateTime date;
  final int quantity;
  final ItemType itemType;
  final User user;

  Purchase({
    required this.id,
    required this.itemId,
    required this.userId,
    required this.date,
    required this.quantity,
    required this.itemType,
    required this.user,
  });

  factory Purchase.fromJson(Map<String, dynamic> json) {
    return Purchase(
      id: json['id'],
      itemId: json['itemId'],
      userId: json['userId'],
      date: DateTime.parse(json['date']),
      quantity: json['quantity'],
      itemType: ItemType.values[json['itemType']],
      user: User.fromJson(json['user']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'itemId': itemId,
      'userId': userId,
      'date': date.toIso8601String(),
      'quantity': quantity,
      'itemType': itemType.index,
      'user': user.toJson(),
    };
  }
}

enum ItemType {
  Good,
  Service,
}
