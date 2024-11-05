import 'package:flutter/material.dart';

import '../models/group_training_user.dart';
import '../models/gym.dart';
import '../models/individual_training.dart';
import '../models/membership.dart';
import '../models/purchase.dart';
import '../models/steps_info.dart';
import '../models/trainer.dart';
import '../models/user.dart';
import '../models/weights_info.dart';

class Signinprovider with ChangeNotifier {
  late User user;

  // void startSignIn(String _email, String _password){
  //   user = new User(
  //     id: "ID",
  //     email: _email,
  //     password: _password,
  //     firstName: '',
  //     lastName: '',
  //     middleName: '',
  //     createdAt: DateTime.now(),
  //     phoneNumber: '',
  //     height: null,
  //     dateOfBirth: null,
  //     trainerId: null,
  //     gymId: null,
  //     membership: null,
  //     gym: null,
  //     trainer: null,
  //     groupTrainingUsers: null,
  //     individualTrainings: null,
  //     purchases: null,
  //     mealsPerDay: null,
  //     weights: null,
  //     steps: null,
  //   );
  // }

  void removeUserFromProvider() {
  }

  // void updateUser({
  //   String? email,
  //   String? password,
  //   String? firstName,
  //   String? lastName,
  //   String? middleName,
  //   String? phoneNumber,
  //   int? height,
  //   DateTime? dateOfBirth,
  //   String? trainerId,
  //   int? gymId,
  //   Membership? membership,
  //   Gym? gym,
  //   Trainer? trainer,
  //   List<GroupTrainingUser>? groupTrainingUsers,
  //   List<IndividualTraining>? individualTrainings,
  //   List<Purchase>? purchases,
  //   List<MealsPerDay>? mealsPerDay,
  //   List<WeightsInfo>? weights,
  //   List<StepsInfo>? steps,
  // }) {
  //   if (user != null) {
  //     user = User(
  //       id: user.id,
  //       email: email ?? user!.email,
  //       password: password ?? user!.password,
  //       firstName: firstName ?? user!.firstName,
  //       lastName: lastName ?? user!.lastName,
  //       middleName: middleName ?? user!.middleName,
  //       createdAt: user!.createdAt,
  //       phoneNumber: phoneNumber ?? user!.phoneNumber!,
  //       height: height ?? user!.height,
  //       dateOfBirth: dateOfBirth ?? user!.dateOfBirth,
  //       gymId: gymId ?? user!.gymId,
  //       trainerId: trainerId ?? user!.trainerId,
  //       membership: membership ?? user!.membership,
  //       gym: gym ?? user!.gym,
  //       trainer: trainer ?? user!.trainer,
  //       groupTrainingUsers: groupTrainingUsers ?? user!.groupTrainingUsers,
  //       individualTrainings: individualTrainings ?? user!.individualTrainings,
  //       purchases: purchases ?? user!.purchases,
  //       mealsPerDay: mealsPerDay ?? user!.mealsPerDay,
  //       weights: weights ?? user!.weights,
  //       steps: steps ?? user!.steps,
  //     );
  //     notifyListeners(); // Оповіщення про зміну
  //   }
  // }
}