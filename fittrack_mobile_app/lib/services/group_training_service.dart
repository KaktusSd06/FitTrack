import 'dart:convert';
import 'package:fittrack_mobile_app/services/trainer_service.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

import '../models/group_training_UI.dart';

class GroupTrainingService {
  static Future<List<GroupTrainingUI>> getTodayTrainings(int gymId) async {
    final today = DateFormat('yyyy-MM-dd').format(DateTime.now().toUtc());
    List<GroupTrainingUI> groupTrainings = [];

    final response = await http.get(
      Uri.parse(
        'https://fittrackapidev.onrender.com/api/GroupTrainings/get-by-gymId-and-period/$gymId/$today/$today',
      ),
      headers: {
        'accept': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);

      for (var item in data) {
        String trainer = await TrainerService.getTrainerSurnameAndNameById(item["trainerId"]) as String;

        DateTime dateTime = DateTime.parse(item["date"]);
        String formattedTime = DateFormat('HH:mm').format(dateTime);

        final groupTraining = GroupTrainingUI(
          id: item["id"],
          date: formattedTime,
          description: item["description"],
          durationInMinutes: item["durationInMinutes"],
          contactPhone: item["contactPhone"],
          gymId: item["gymId"],
          trainer: trainer,
        );
        groupTrainings.add(groupTraining);
      }

      return groupTrainings;
    } else {
      print('Failed to retrieve trainings. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return [];
    }
  }

  static Future<List<GroupTrainingUI>> getTrainingForDate(int gymId, DateTime date) async {
    final formattedDate = DateFormat('yyyy-MM-dd').format((date.add(Duration(hours: 2))).toUtc());
    List<GroupTrainingUI> groupTrainings = [];

    final response = await http.get(
      Uri.parse(
        'https://fittrackapidev.onrender.com/api/GroupTrainings/get-by-gymId-and-period/$gymId/$formattedDate/$formattedDate',
      ),
      headers: {
        'accept': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = jsonDecode(response.body);

      for (var item in data) {
        // Ensure the trainer data is fetched asynchronously
        String trainer = await TrainerService.getTrainerSurnameAndNameById(item["trainerId"]) as String;

        DateTime dateTime = DateTime.parse(item["date"]);
        String formattedTime = DateFormat('HH:mm').format(dateTime);

        final groupTraining = GroupTrainingUI(
          id: item["id"],
          date: formattedTime,
          description: item["description"],
          durationInMinutes: item["durationInMinutes"],
          contactPhone: item["contactPhone"],
          gymId: item["gymId"],
          trainer: trainer,
        );
        groupTrainings.add(groupTraining);
      }

      return groupTrainings;
    } else {
      print('Failed to retrieve trainings. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return [];
    }
  }

}