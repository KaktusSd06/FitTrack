abstract class Person {
  final String id;
  final String email;
  final String? password;
  final String firstName;
  final String lastName;
  final String? middleName;
  final DateTime? createdAt;
  final String? phoneNumber;

  Person({
    required this.id,
    required this.email,
    required this.password,
    required this.firstName,
    required this.lastName,
    this.middleName,
    this.createdAt,
    this.phoneNumber,
  });

  factory Person.fromJson(Map<String, dynamic> json) {
    throw UnimplementedError("This is an abstract class and cannot be instantiated directly.");
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'password': password,
      'firstName': firstName,
      'lastName': lastName,
      'middleName': middleName,
      'createdAt': createdAt?.toIso8601String(),
      'phoneNumber': phoneNumber,
    };
  }
}
