import 'person.dart';
import 'gym.dart';

class Admin extends Person {
  int gymId;
  Gym gym;

  Admin({
    required String id,
    required String email,
    required String password,
    required String firstName,
    required String lastName,
    required String middleName,
    DateTime? createdAt,
    required String phoneNumber,
    required this.gymId,
    required this.gym,
  }) : super(
    id: id,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    createdAt: createdAt,
    phoneNumber: phoneNumber,
  );

  factory Admin.fromJson(Map<String, dynamic> json) {
    return Admin(
      id: json['id'],
      email: json['email'],
      password: json['password'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      middleName: json['middleName'],
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : null,
      phoneNumber: json['phoneNumber'],
      gymId: json['gymId'],
      gym: Gym.fromJson(json['gym']),
    );
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
      'gymId': gymId,
      'gym': gym.toJson(),
    };
  }
}
