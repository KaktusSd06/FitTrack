import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/user.dart';
import 'package:http/http.dart' as http;
import '../providers/AuthProvider.dart';
import 'ApiService.dart';

class MealsService {

  Future<bool> addMeal(String name, double calories, String userId) async {
    final payload = {
      'name': name,
      'calories': calories,
      "userId": userId,
    };

    final response = await http.post(
      Uri.parse('https://fittrackapidev.onrender.com/api/Meals'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(payload),
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 201) {
      return true;
    } else {
      print('Failed to add meal. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }

  static Future<List<Map<String, dynamic>>> getMealsByUserIdForDate(String userId) async {
    final formattedDate = DateFormat('yyyy-MM-dd').format(DateTime.now().toUtc());

    final userResponse = await http.get(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/Meals/get-by-userId-and-day/$userId/$formattedDate'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    print('Status code for get-meals request: ${userResponse.statusCode}');
    print('Response body for get-meals request: ${userResponse.body}');

    if (userResponse.statusCode == 200) {
      final responseData = json.decode(userResponse.body);
      if (responseData is List) {
        // Assuming responseData is a list of meals
        return List<Map<String, dynamic>>.from(responseData);
      } else {
        throw Exception('Invalid response format');
      }
    } else {
      throw Exception('Failed to load meals: ${userResponse.statusCode}');
    }
  }

  static Future<double> getCaloriesByUserIdForDateToDate(String userId, DateTime startDate, DateTime endDate) async {
    final formattedstartDate = DateFormat('yyyy-MM-dd').format(startDate.toUtc());
    final formattedendDate = DateFormat('yyyy-MM-dd').format(endDate.toUtc());

    final userResponse = await http.get(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/Meals/get-calories-by-userId-and-period/$userId/$formattedstartDate/$formattedendDate'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    print('Status code for get-calories request: ${userResponse.statusCode}');
    print('Response body for get-calories request: ${userResponse.body}');

    if (userResponse.statusCode == 200) {
      final responseData = json.decode(userResponse.body);

      // Check if the response is a list and not empty
      if (responseData is List && responseData.isNotEmpty) {
        // Access the first item in the list and retrieve the calories
        double calories = responseData.first['calories'];
        return calories; // Return the calorie count
      } else {
        return 0.0; // Return 0 if no data found
      }
    }
    else if (userResponse.statusCode == 404)
      return 0.0;
    else {
      throw Exception('Failed to load calories: ${userResponse.statusCode}');
    }
  }

  static Future<double> getCaloriesByUserIdForDate(String userId) async {
    final formattedDate = DateFormat('yyyy-MM-dd').format(DateTime.now().toUtc());

    final userResponse = await http.get(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/Meals/get-calories-by-userId-and-period/$userId/$formattedDate/$formattedDate'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    print('Status code for get-calories request: ${userResponse.statusCode}');
    print('Response body for get-calories request: ${userResponse.body}');

    if (userResponse.statusCode == 200) {
      final responseData = json.decode(userResponse.body);

      // Check if the response is a list and not empty
      if (responseData is List && responseData.isNotEmpty) {
        // Access the first item in the list and retrieve the calories
        double calories = responseData.first['calories'];
        return calories; // Return the calorie count
      } else {
        return 0.0; // Return 0 if no data found
      }
    } else {
      throw Exception('Failed to load calories: ${userResponse.statusCode}');
    }
  }

  Future<bool> deleteMealById(int mealId) async {
    final userResponse = await http.delete(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/Meals/$mealId'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    print('Status code for get-by-email request: ${userResponse.statusCode}');
    print('Response body for get-by-email request: ${userResponse.body}');

    if (userResponse.statusCode == 204) {
      return true;
    } else {
      throw Exception('Failed to load user data: ${userResponse.statusCode}');
    }
  }
}
