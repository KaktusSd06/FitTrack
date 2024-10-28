import 'dart:convert';
import 'package:intl/intl.dart';

import '../models/user.dart';
import 'package:http/http.dart' as http;
import 'ApiService.dart';

class UserService {
  static final String baseUrl = "https://fittrackapirepo.onrender.com";

  Future<List<dynamic>> fetchUsers() async {
    final response = await http.get(Uri.parse('$baseUrl/api/Account/register'));

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load users');
    }
  }

  static Future<int> loginUser({required String email, required String password}) async{

    final payload = {
      'email': email,
      'password': password,
    };

    final response = await http.post(
      Uri.parse('https://fittrackapidev.onrender.com/api/Account/login'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(payload),
    );
    if (response.statusCode == 200) {
      return 200;
    }
    else {
      print('Failed to login user. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return response.statusCode;
    }
  }

  static Future<int> registerUser({
    required String email,
    required String password,
    required String confirmedPassword,
    required String firstName,
    required String lastName,
    required String middleName,
    required DateTime dateOfBirth,
    required String phoneNumber,
  }) async {
    final formattedDate = DateFormat('yyyy-MM-dd').format(dateOfBirth.toUtc());


    final payload = {
      'email': email,
      'phoneNumber': phoneNumber,
      'password': password,
      'confirmedPassword': confirmedPassword,
      'firstName': firstName,
      'lastName': lastName,
      'middleName': middleName.isNotEmpty ? middleName : null,
      'birthDate': formattedDate, // Use formatted date string
    };

    final response = await http.post(
      Uri.parse('https://fittrackapidev.onrender.com/api/Users'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(payload),
    );

    if (response.statusCode == 200) {
      return 200;
    }
    else {
      print('Failed to register user. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return response.statusCode; // Registration failed
    }
  }

  User getUser() {
    String jsonString = '''{
      "id": 1,
      "email": "test@example.com",
      "password": "password123",
      "firstName": "Дмитро",
      "lastName": "Степанюк",
      "middleName": "Дмитрович",
      "createdAt": "${DateTime.now().toIso8601String()}",
      "phoneNumber": "123-456-7890",
      "height": 180,
      "birthDate": {
        "year": 2006,
        "month": 1,
        "day": 1,
        "dayOfWeek": 7
      }
    }''';

    User user = User(
      id: "1",
      email: "test@example.com",
      password: "password123",
      firstName: "Дмитро",
      lastName: "Степанюк",
      middleName: "Дмитрович",
      createdAt: DateTime.now(),
      phoneNumber: "123-456-7890",
      height: 180,
      dateOfBirth: DateTime(2006, 1, 1),
    );

    return user;
  }
}
