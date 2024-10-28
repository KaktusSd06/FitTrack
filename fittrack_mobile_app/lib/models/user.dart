import 'person.dart';
import 'membership.dart';
import 'gym.dart';
import 'trainer.dart';
import 'group_training_user.dart';
import 'individual_training.dart';
import 'purchase.dart';
import 'meals_per_day.dart';
import 'weights_info.dart';
import 'steps_info.dart';

class User extends Person {
  final int? height;
  final DateTime? dateOfBirth;
  final int? trainerId;
  final int? gymId;

  final Membership? membership;
  final Gym? gym;
  final Trainer? trainer;

  final List<GroupTrainingUser>? groupTrainingUsers;
  final List<IndividualTraining>? individualTrainings;

  final List<Purchase>? purchases;
  final List<MealsPerDay>? mealsPerDay;

  final List<WeightsInfo>? weights;
  final List<StepsInfo>? steps;

  User({
    required String id,
    required String email,
    required String password,
    required String firstName,
    required String lastName,
    String? middleName,
    DateTime? createdAt,
    String? phoneNumber,
    this.height,
    this.dateOfBirth,
    this.trainerId,
    this.gymId,
    this.membership,
    this.gym,
    this.trainer,
    this.groupTrainingUsers,
    this.individualTrainings,
    this.purchases,
    this.mealsPerDay,
    this.weights,
    this.steps,
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

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      password: json['password'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      middleName: json['middleName'],
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : null,
      phoneNumber: json['phoneNumber'],
      height: json['height'],
      dateOfBirth: json['dateOfBirth'] != null ? DateTime.parse(json['dateOfBirth']) : null,
      trainerId: json['trainerId'],
      gymId: json['gymId'],
      membership: json['membership'] != null ? Membership.fromJson(json['membership']) : null,
      gym: json['gym'] != null ? Gym.fromJson(json['gym']) : null,
      trainer: json['trainer'] != null ? Trainer.fromJson(json['trainer']) : null,
      groupTrainingUsers: json['groupTrainingUsers'] != null
          ? (json['groupTrainingUsers'] as List)
          .map((e) => GroupTrainingUser.fromJson(e))
          .toList()
          : null,
      individualTrainings: json['individualTrainings'] != null
          ? (json['individualTrainings'] as List)
          .map((e) => IndividualTraining.fromJson(e))
          .toList()
          : null,
      purchases: json['purchases'] != null
          ? (json['purchases'] as List)
          .map((e) => Purchase.fromJson(e))
          .toList()
          : null,
      mealsPerDay: json['mealsPerDay'] != null
          ? (json['mealsPerDay'] as List)
          .map((e) => MealsPerDay.fromJson(e))
          .toList()
          : null,
      weights: json['weights'] != null
          ? (json['weights'] as List)
          .map((e) => WeightsInfo.fromJson(e))
          .toList()
          : null,
      steps: json['steps'] != null
          ? (json['steps'] as List)
          .map((e) => StepsInfo.fromJson(e))
          .toList()
          : null,
    );
  }

  @override
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
      'height': height,
      'dateOfBirth': dateOfBirth?.toIso8601String(),
      'trainerId': trainerId,
      'gymId': gymId,
      'membership': membership?.toJson(),
      'gym': gym?.toJson(),
      'trainer': trainer?.toJson(),
      'groupTrainingUsers': groupTrainingUsers?.map((e) => e.toJson()).toList(),
      'individualTrainings': individualTrainings?.map((e) => e.toJson()).toList(),
      'purchases': purchases?.map((e) => e.toJson()).toList(),
      'mealsPerDay': mealsPerDay?.map((e) => e.toJson()).toList(),
      'weights': weights?.map((e) => e.toJson()).toList(),
      'steps': steps?.map((e) => e.toJson()).toList(),
    };
  }
}
