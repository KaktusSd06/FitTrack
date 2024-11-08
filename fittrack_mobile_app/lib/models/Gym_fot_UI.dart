class GymForUI {
  final int id;
  final String name;
  final String address;

  GymForUI({required this.id, required this.name, required this.address});

  factory GymForUI.fromJson(Map<String, dynamic> json) {
    return GymForUI(
      id: json['id'],  // Ensure the ID is a string
      name: json['name'].toString(),  // Ensure name is a string
      address: json['address'].toString(),  // Ensure address is a string
    );
  }
}
