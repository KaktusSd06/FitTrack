import 'purchase.dart';

class Good {
  final int id;
  final String name;
  final String description;
  final String image;
  final double cost;
  final List<Purchase>? purchases;

  Good({
    required this.id,
    required this.name,
    required this.description,
    required this.image,
    required this.cost,
    this.purchases,
  });

  factory Good.fromJson(Map<String, dynamic> json) {
    return Good(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      image: json['image'],
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
      'image': image,
      'cost': cost,
      'purchases': purchases?.map((purchase) => purchase.toJson()).toList(),
    };
  }
}
