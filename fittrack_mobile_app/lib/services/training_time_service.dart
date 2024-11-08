import 'dart:convert';
import 'dart:ffi';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/user.dart';
import 'package:http/http.dart' as http;
import '../providers/AuthProvider.dart';
import 'ApiService.dart';

class TrainingTimeService {

  // Get total training time in Duration for the week
  static Future<Duration> getTrainingTimeByWeek(String userId) async {
    // Get the current date
    final now = DateTime.now();

    // Format the current date as "yyyy-MM-dd"
    final date = DateFormat('yyyy-MM-dd').format(DateTime.now().toUtc());

    // Calculate the start of the week (Monday)
    final startOfWeek = DateFormat('yyyy-MM-dd').format(now.subtract(Duration(days: now.weekday - 1)).toUtc());

    // Calculate the end of the week (Sunday)
    final endOfWeek = DateFormat('yyyy-MM-dd').format(now.add(Duration(days: 7 - now.weekday)).toUtc());

    try {
      final userResponse = await http.get(
        Uri.parse(
            'https://fittrackapidev.onrender.com/api/TrainingTime/get-by-userId-and-period/$userId/$startOfWeek/$endOfWeek'),
        headers: {
          'Content-Type': 'application/json',
        },
      ).timeout(const Duration(seconds: 60));

      print('Status code for get-training-time request: ${userResponse.statusCode}');
      print('Response body for get-training-time request: ${userResponse.body}');

      if (userResponse.statusCode == 200) {
        // Parse the response to extract the total seconds
        final int totalTrainingTimeInSeconds = int.parse(userResponse.body);

        // Convert total seconds into a Duration
        return Duration(seconds: totalTrainingTimeInSeconds);
      } else {
        throw Exception('Failed to load training time: ${userResponse.statusCode}');
      }
    } catch (e) {
      print('Error: $e');
      return Duration.zero; // Return zero duration in case of error
    }
  }


  // Add training time in seconds to the API
  static Future<bool> addTrainingTime(String userId, Duration time) async {
    final date = DateFormat('yyyy-MM-dd').format(DateTime.now().toUtc());

    final totalSeconds = time.inSeconds; // Convert Duration to seconds

    final payload = {
      'userId': userId,
      'durationInSeconds': totalSeconds, // Store the time in seconds
      "date": date,
    };

    final response = await http.post(
      Uri.parse('https://fittrackapidev.onrender.com/api/TrainingTime'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(payload),
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 200) {
      return true;
    } else {
      print('Failed to add training time. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }
}
