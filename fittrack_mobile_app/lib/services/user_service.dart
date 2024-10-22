import 'dart:convert';

import '../models/User.dart';

class UserService {
  Future<User>? getUser() async {
    User user = User.full(
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Дмитро',
      lastName: 'Степанюк',
      middleName: "Дмитрович",
      createdAt: DateTime.now(),
      phoneNumber: '123-456-7890',
      height: 180,
      dateOfBirth: DateTime(1990, 1, 1),
      weight: 73.5,
    );

    return user;
  }
}