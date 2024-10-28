import 'package:flutter/material.dart';

import '../models/user.dart';

class AuthProvider with ChangeNotifier {
  late User user;
  bool _isAuthenticated = false; // Статус авторизації

  bool get isAuthenticated => _isAuthenticated;

  void login() {
    _isAuthenticated = true;
    notifyListeners();
  }

  void logout() {
    _isAuthenticated = false;
    notifyListeners();
  }

  // void startSignIn(String _email, String _password){
  //   user = new User(
  //     id: DateTime.now().millisecondsSinceEpoch,
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
}
