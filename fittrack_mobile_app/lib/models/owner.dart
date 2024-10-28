import 'person.dart';
import 'gym.dart';

class Owner extends Person {
  List<Gym>? gyms;

  Owner({
    required String id,
    required String email,
    required String password,
    required String firstName,
    required String lastName,
    required String middleName,
    DateTime? createdAt,
    required String phoneNumber,
    this.gyms,
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

  factory Owner.fromJson(Map<String, dynamic> json) {
    return Owner(
      id: json['id'],
      email: json['email'],
      password: json['password'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      middleName: json['middleName'],
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : null,
      phoneNumber: json['phoneNumber'],
      gyms: json['gyms'] != null
          ? List<Gym>.from(json['gyms'].map((gym) => Gym.fromJson(gym)))
          : null,
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
      'gyms': gyms?.map((gym) => gym.toJson()).toList(),
    };
  }
}
