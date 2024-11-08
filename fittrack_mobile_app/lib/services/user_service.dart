import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/user.dart';
import 'package:http/http.dart' as http;
import '../providers/AuthProvider.dart';
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

  static Future<Map<String, dynamic>> loginUser({required String email, required String password}) async {
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
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 200) {
      final emailEncoded = Uri.encodeComponent(email);
      final userResponse = await http.get(
        Uri.parse('https://fittrackapidev.onrender.com/api/Users/get-by-email/$emailEncoded'),
        headers: {
          'Content-Type': 'application/json',
        },
      ).timeout(const Duration(seconds: 60));

      print('Status code for get-by-email request: ${userResponse.statusCode}');
      print('Response body for get-by-email request: ${userResponse.body}');

      if (userResponse.statusCode == 200) {
        if (userResponse.body.isNotEmpty) {
          final responseData = json.decode(userResponse.body);
          print('Отриманий JSON: $responseData');

          if (responseData.containsKey('id') && responseData.containsKey('email') && responseData.containsKey('firstName') && responseData.containsKey('lastName')) {
            return {'status': 200, 'user': responseData};
          } else {
            throw Exception('Missing required user fields in JSON');
          }
        } else {
          return {'status': 500, 'message': 'Порожня відповідь від сервера'};
        }
      } else {
        return {'status': userResponse.statusCode, 'message': 'Помилка під час входу'};
      }
    } else if (response.statusCode == 404) {
      return {'status': 404, 'message': 'Користувач не знайдений'};
    } else if (response.statusCode == 400) {
      return {'status': 400, 'message': 'Введіть пошту в коректному форматі'};
    } else {
      return {'status': response.statusCode, 'message': 'Помилка під час входу'};
    }
  }

  static Future<Map<String, dynamic>?> getUserByEmail(String email) async {
    final emailEncoded = Uri.encodeComponent(email);
    final userResponse = await http.get(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/Users/get-by-email/$emailEncoded'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    print('Status code for get-by-email request: ${userResponse.statusCode}');
    print('Response body for get-by-email request: ${userResponse.body}');

    if (userResponse.statusCode == 200) {
      if (userResponse.body.isNotEmpty) {
        final responseData = json.decode(userResponse.body);
        print('Отриманий JSON: $responseData');

        if (responseData.containsKey('id') &&
            responseData.containsKey('email') &&
            responseData.containsKey('firstName') &&
            responseData.containsKey('lastName')) {
          return responseData; // Повертаємо карту з даними користувача
        } else {
          throw Exception('Missing required user fields in JSON');
        }
      } else {
        return null; // Повертаємо null, якщо відповідь порожня
      }
    } else {
      throw Exception('Failed to load user data: ${userResponse.statusCode}');
    }
  }

  static Future<bool> deleteUser(String id) async {
    final userResponse = await http.delete(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/Users/$id'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    print('Status code for get-by-email request: ${userResponse.statusCode}');
    print('Response body for get-by-email request: ${userResponse.body}');

    if (userResponse.statusCode == 204) {
      return true;
    }
    else {
      throw Exception('Failed to load user data: ${userResponse.statusCode}');
    }
  }

  static Future<bool> updateBasicIngo(String id, String firstName, String lastName, String middleName, int height) async {
    final payload = {
      'firstName': firstName,
      'lastName': lastName,
      'middleName': middleName.isNotEmpty ? middleName : null,
      'height': height,
    };

    final response = await http.put(
      Uri.parse('https://fittrackapidev.onrender.com/api/Users/update-basic-info/$id'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(payload),
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 204) {
      return true;
    }
    else {
      print('Failed to register user. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }

  static Future<bool> updateEmail(String id, String email) async {
    final payload = {
      email,
    };

    final response = await http.put(
      Uri.parse('https://fittrackapidev.onrender.com/api/Account/update-email/$id'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(email),
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 204) {
      return true;
    }
    else {
      print('Failed to register user. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }

  static Future<bool> updatePhone(String id, String phoneNumber) async {
    final payload = {
      phoneNumber,
    };

    final response = await http.put(
      Uri.parse('https://fittrackapidev.onrender.com/api/Account/update-phone/$id'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(phoneNumber),
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 204) {
      return true;
    }
    else {
      print('Failed to register user. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }

  static Future<bool> signInWithGoogle(String token) async{
    final response = await http.post(
      Uri.parse('https://fittrackapidev.onrender.com/api/Account/login-google'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(token),
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 204) {
      return true;
    }
    else {
      print('Failed to register with google user. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }

  static Future<bool> updatePassword(String id, String password) async {
    final payload = {
      password,
    };

    final response = await http.put(
      Uri.parse('https://fittrackapidev.onrender.com/api/Account/update-password/$id'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(password),
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 204) {
      return true;
    }
    else {
      print('Failed to register user. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
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
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 201) {
      final payload = {
        'userEmail': email,
        'role': "User",
      };

      final response = await http.post(
        Uri.parse('https://fittrackapidev.onrender.com/api/Account/assign-role'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode(payload),
      ).timeout(const Duration(seconds: 60));

      if (response.statusCode == 200) { return 200; }
      else {
        print('Failed to register user. Status code: ${response.statusCode}');
        print('Response body: ${response.body}');
        return response.statusCode; // Registration failed
      }

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

  static Future<Map<String, dynamic>> getMembershipByUserId(String userId) async {
    final userResponse = await http.get(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/Memberships/get-membership-by-userId/$userId'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    if (userResponse.statusCode == 200) {
      final responseData = json.decode(userResponse.body);

      final membershipInfo = {
        'id': responseData['id'],
        'membershipName': responseData['membershipName'],
        'durationInMonths': responseData['durationInMonths'],
        'sessions': responseData['sessions'],
      };

      return membershipInfo;
    } else {
      throw Exception('Failed to load trainer: ${userResponse.statusCode}');
    }
  }

  static Future<bool> updateAdditionalInfo(String userId, Map<String, dynamic> additionalInfo) async {
    final url = Uri.parse('https://fittrackapidev.onrender.com/api/Users/update-additional-info/$userId');

    final response = await http.patch(
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode([additionalInfo]),
    );

    if (response.statusCode == 200 || response.statusCode == 204) {
      return true;
    } else {
      print('Failed to update info. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }



}
