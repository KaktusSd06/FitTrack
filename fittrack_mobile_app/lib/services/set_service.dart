import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/individual_training.dart';
import '../models/user.dart';
import 'package:http/http.dart' as http;
import '../providers/AuthProvider.dart';
import 'ApiService.dart';

class  SetService{

  static Future<bool> deleteSet(int setId) async{
    final userResponse = await http.delete(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/Sets/$setId'),
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

  static Future<List<Map<String, dynamic>>> getSetByTraining(
      String userId, DateTime date) async {
    final formattedDate = date.toUtc().toIso8601String();


    final trainingResponse = await http.get(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/IndividualTrainings/get-by-userId-and-period/$userId/$formattedDate/$formattedDate'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    print('Status code for raining request: ${trainingResponse.statusCode}');
    print('Response body for get-meals request: ${trainingResponse.body}');

    if (trainingResponse.statusCode == 200) {
      print("Result training )");
      final trainingData = json.decode(trainingResponse.body);

      if (trainingData != null && trainingData.isNotEmpty) {
        final trainingId = trainingData[0]['id'];

        final setsResponse = await http.get(
          Uri.parse(
              'https://fittrackapidev.onrender.com/api/Sets/get-by-individual-training-Id/$trainingId'),
          headers: {
            'Content-Type': 'application/json',
          },
        ).timeout(const Duration(seconds: 60));

        if (setsResponse.statusCode == 200) {
          print('Status code for set request: ${setsResponse.statusCode}');
          print('Response body for set request: ${setsResponse.body}');

          final setsData = json.decode(setsResponse.body) as List<dynamic>;

          List<Map<String, dynamic>> setsWithExercises = [];
          for (var set in setsData) {
            final exerciseId = set['exerciseId'];
            final exerciseResponse = await http.get(
              Uri.parse(
                  'https://fittrackapidev.onrender.com/api/Exercises/$exerciseId'),
              headers: {
                'Content-Type': 'application/json',
              },
            );

            if (exerciseResponse.statusCode == 200) {

              final exerciseData = json.decode(exerciseResponse.body);
              set['exercise'] = exerciseData;
            } else {
              set['exercise'] = {'name': 'Невідомо', 'description': ''};
            }
            setsWithExercises.add(set as Map<String, dynamic>);
          }

          return setsWithExercises;
        } else {
          throw Exception('Failed to load sets for training ID: $trainingId');
        }
      } else {
        throw Exception('No training data found for the specified date and user.');
      }
    } else {
      throw Exception('Failed to load training data.');
    }
  }
}