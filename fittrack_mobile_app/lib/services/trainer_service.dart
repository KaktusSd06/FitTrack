import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/individual_training.dart';
import '../models/user.dart';
import 'package:http/http.dart' as http;
import '../providers/AuthProvider.dart';
import 'ApiService.dart';

class TrainerService {
  static Future<String> getTrainerSurnameAndNameById(String trainerId) async {
    final userResponse = await http.get(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/Trainers/get-by-id/$trainerId'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    if (userResponse.statusCode == 200) {
      final responseData = json.decode(userResponse.body);
      final surname = responseData['lastName'];
      final name = responseData['firstName'];
      return "$surname $name";
    } else {
      throw Exception('Failed to load trainer: ${userResponse.statusCode}');
    }
  }

  static Future<List<Map<String, String>>> getTrainersInfoByGymId(int gymId) async {
    final response = await http.get(
      Uri.parse('https://fittrackapidev.onrender.com/api/Gyms/get-trainers/$gymId'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 200) {
      final List<dynamic> responseData = json.decode(response.body);
      List<Map<String, String>> trainersInfo = [];

      for (var trainer in responseData) {
        final String id = trainer["id"];
        final String surname = trainer['lastName'];
        final String firstName = trainer['firstName'];
        final String phoneNumber = trainer['phoneNumber'] ?? "No phone number";
        final String email = trainer['email'] ?? "No email";

        trainersInfo.add({
          'Id': id,
          'Surname': surname,
          'First Name': firstName,
          'Phone': phoneNumber,
          'Email': email,
        });
      }

      return trainersInfo;
    } else {
      throw Exception('Failed to load trainers: ${response.statusCode}');
    }
  }

  static Future<Map<String, dynamic>> getTrainerInfoById(String trainerId) async {
    final userResponse = await http.get(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/Trainers/get-by-id/$trainerId'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    if (userResponse.statusCode == 200) {
      final responseData = json.decode(userResponse.body);

      final trainerInfo = {
        'id': responseData['id'],
        'firstName': responseData['firstName'],
        'lastName': responseData['lastName'],
        'email': responseData['email'],
        'phone': responseData['phone'],
      };

      return trainerInfo;
    } else {
      throw Exception('Failed to load trainer: ${userResponse.statusCode}');
    }
  }
}
