import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/individual_training.dart';
import '../models/user.dart';
import 'package:http/http.dart' as http;
import '../providers/AuthProvider.dart';
import 'ApiService.dart';

class ExerciseService{

  Future<bool> addExercises(String name, String description) async {
    final payload = {
      'name': name,
      'description': description,
    };

    final response = await http.post(
      Uri.parse('https://fittrackapidev.onrender.com/api/Exercises'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(payload),
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 201) {
      return true;
    } else {
      print('Failed to add exercises. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }

  static Future<List<Map<String, dynamic>>> getAllExercises() async {
    try {
      final response = await http.get(
        Uri.parse('https://fittrackapidev.onrender.com/api/Exercises'),
        headers: {
          'Content-Type': 'application/json',
        },
      ).timeout(const Duration(seconds: 60));

      print('Status code for getAllExercises request: ${response.statusCode}');
      print('Response body for getAllExercises request: ${response.body}');

      if (response.statusCode == 200) {
        List<dynamic> exercisesJson = json.decode(response.body);
        return exercisesJson.map((exercise) => exercise as Map<String, dynamic>).toList();
      } else {
        throw Exception('Failed to load exercises: ${response.statusCode}');
      }
    } catch (e) {
      print("Error fetching exercises: $e");
      return [];
    }
  }

  static Future<bool> addSet(double weight, int reps, String exerciseId) async {
    final setPayload = {
      'weight': weight,
      'reps': reps,
      'exerciseId': exerciseId,
    };

    final response = await http.post(
      Uri.parse('https://yourapi.com/sets'),  // Replace with your actual API endpoint
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(setPayload),
    );

    if (response.statusCode == 201) {
      return true; // Successfully added set
    } else {
      print('Failed to add set. Status code: ${response.statusCode}');
      return false;
    }
  }

  // Method to add the exercise to the individual training
  static Future<bool> addExerciseToTraining(String exerciseId, String? trainingId) async {
    if (trainingId == null || trainingId.isEmpty) {
      // Create a new training session if trainingId is null or empty
      trainingId = await createTrainingSession();
      if (trainingId == null) {
        print('Failed to create a new training session.');
        return false;
      }
    }

    // If trainingId exists, add the exercise to the existing training
    final exercisePayload = {
      'exerciseId': exerciseId,
      'trainingId': trainingId,
    };

    final response = await http.post(
      Uri.parse('https://yourapi.com/trainings/$trainingId/exercises'), // Replace with your actual API endpoint
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(exercisePayload),
    );

    if (response.statusCode == 201) {
      print('Exercise added to training successfully.');
      return true; // Successfully added exercise to training
    } else {
      print('Failed to add exercise to training. Status code: ${response.statusCode}');
      return false;
    }
  }

  // Method to create a new training session
  static Future<String?> createTrainingSession() async {
    final trainingPayload = {
      'description': 'New Training Session', // Add any other required fields
      // Add other necessary fields for creating a training session
    };

    final response = await http.post(
      Uri.parse('https://yourapi.com/trainings'), // Replace with your actual API endpoint for creating training
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(trainingPayload),
    );

    if (response.statusCode == 201) {
      final responseData = json.decode(response.body);
      final String trainingId = responseData['id'].toString(); // Extract the ID of the new training session
      print('New training session created with ID: $trainingId');
      return trainingId; // Return the new training ID
    } else {
      print('Failed to create training session. Status code: ${response.statusCode}');
      return null;
    }
  }
}