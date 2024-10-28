import 'purchase.dart';

class Service {
  final int id;
  final String name;
  final String description;
  final double cost;
  final List<Purchase>? purchases;

  Service({
    required this.id,
    required this.name,
    required this.description,
    required this.cost,
    this.purchases,
  });

  factory Service.fromJson(Map<String, dynamic> json) {
    return Service(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      cost: json['cost'].toDouble(),
      purchases: json['purchases'] != null
          ? (json['purchases'] as List)
          .map((purchaseJson) => Purchase.fromJson(purchaseJson))
          .toList()
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'cost': cost,
      'purchases': purchases?.map((purchase) => purchase.toJson()).toList(),
    };
  }
}
