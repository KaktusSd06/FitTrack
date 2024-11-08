import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;

class WeightService {
  static Future<double?> getUserWeightById(String userId) async {
    try {
      final response = await http.get(
        Uri.parse(
            'https://fittrackapidev.onrender.com/api/WeightsInfo/get-by-userId/$userId'),
        headers: {'Content-Type': 'application/json'},
      ).timeout(const Duration(seconds: 60));

      if (response.statusCode == 200) {
        final List<dynamic> weightData = jsonDecode(response.body);

        // Check if there is weight data
        if (weightData.isNotEmpty) {
          // Sort data by date in descending order
          weightData.sort((a, b) {
            DateTime dateA = DateTime.parse(a['date']);
            DateTime dateB = DateTime.parse(b['date']);
            return dateB.compareTo(dateA); // Sort from latest to oldest
          });

          // Retrieve the latest weight and ensure it is converted to double
          var latestWeight = weightData[0]['weight'];
          return latestWeight is int ? latestWeight.toDouble() : latestWeight as double;
        } else {
          throw Exception('No weight data available');
        }
      } else {
        throw Exception('Failed to load weight data: ${response.statusCode}');
      }
    } catch (e) {
      print('Error: $e');
      return null; // Return null if an error occurs
    }
  }


  static Future<bool> addWeightInfo(String userId, double weight) async {
    final date = DateTime.now().toUtc().toIso8601String();

    final payload = {
      'userId': userId,
      'weight': weight.toDouble(),
      "date": date,
    };

    final response = await http.post(
      Uri.parse('https://fittrackapidev.onrender.com/api/WeightsInfo'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(payload),
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 201) {
      return true;
    } else {
      print('Failed to add weight. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }

  static Future<double> getWeightByUserIdForDateToDate(String userId, DateTime startDate, DateTime endDate) async {
    final formattedstartDate = DateFormat('yyyy-MM-dd').format(startDate.toUtc());
    final formattedendDate = DateFormat('yyyy-MM-dd').format(endDate.toUtc());


    final userResponse = await http.get(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/WeightsInfo/get-by-userId-and-period/$userId/$formattedstartDate/$formattedendDate'),
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
        // double calories = responseData.first['weight'];
        // return calories; // Return the calorie count

        var latestWeight = responseData.first['weight'];
        return latestWeight is int ? latestWeight.toDouble() : latestWeight as double;
      } else {
        return 0; // Return 0 if no data found
      }
    }
    else if(userResponse.statusCode == 404)
      return 0;
    else {
      throw Exception('Failed to load calories: ${userResponse.statusCode}');
    }
  }
}

