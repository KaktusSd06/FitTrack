import 'gym.dart';
import 'training_program.dart';
import 'individual_training.dart';
import 'group_training.dart';
import 'person.dart';
import 'user.dart';

class Trainer extends Person {
  final int? gymId;
  final Gym? gym;
  final List<User>? users;
  final List<IndividualTraining>? individualTrainings;
  final List<GroupTraining>? groupTrainings;
  final List<TrainingProgram>? trainingPrograms;

  Trainer({
    required String id,
    required String email,
    required String password,
    required String firstName,
    required String lastName,
    required String middleName,
    DateTime? createdAt,
    required String phoneNumber,
    this.gymId,
    this.gym,
    this.users,
    this.individualTrainings,
    this.groupTrainings,
    this.trainingPrograms,
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

  factory Trainer.fromJson(Map<String, dynamic> json) {
    return Trainer(
      id: json['id'],
      email: json['email'],
      password: json['password'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      middleName: json['middleName'],
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : null,
      phoneNumber: json['phoneNumber'],
      gymId: json['gymId'],
      gym: json['gym'] != null ? Gym.fromJson(json['gym']) : null,
      users: (json['users'] as List<dynamic>?)?.map((e) => User.fromJson(e)).toList(),
      individualTrainings: (json['individualTrainings'] as List<dynamic>?)
          ?.map((e) => IndividualTraining.fromJson(e))
          .toList(),
      groupTrainings: (json['groupTrainings'] as List<dynamic>?)
          ?.map((e) => GroupTraining.fromJson(e))
          .toList(),
      trainingPrograms: (json['trainingPrograms'] as List<dynamic>?)
          ?.map((e) => TrainingProgram.fromJson(e))
          .toList(),
    );
  }

  // Метод для конвертації об'єкта в JSON
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
      'gym': gym?.toJson(),
      'users': users?.map((e) => e.toJson()).toList(),
      'individualTrainings': individualTrainings?.map((e) => e.toJson()).toList(),
      'groupTrainings': groupTrainings?.map((e) => e.toJson()).toList(),
      'trainingPrograms': trainingPrograms?.map((e) => e.toJson()).toList(),
    };
  }
}
