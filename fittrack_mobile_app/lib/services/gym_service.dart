import 'dart:convert';
import 'package:http/http.dart' as http;

class GymService {
  static Future<List<Map<String, dynamic>>?> getGyms() async {
    try {
      final response = await http.get(
        Uri.parse('https://fittrackapidev.onrender.com/api/Gyms'),
        headers: {'Content-Type': 'application/json'},
      ).timeout(const Duration(seconds: 60));

      if (response.statusCode == 200) {

        final List<dynamic> gymsData = jsonDecode(response.body);

        final List<Map<String, dynamic>> filteredGyms = gymsData.map((gym) {
          return {
            'id': gym['id'],
            'name': gym['name'],
            'address': gym['address'],
          };
        }).toList();



        return filteredGyms;
      } else {
        throw Exception('Failed to load gyms data: ${response.statusCode}');
      }
    } catch (e) {
      print('Error: $e');
      return null;
    }
  }

  static Future<Map<String, dynamic>?> getGymByUserId(String userId) async {
    final response = await http.get(
      Uri.parse(
          'https://fittrackapidev.onrender.com/api/Gyms/get-by-userId/$userId'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 200) {
      print('Successfully retrieved gyms. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');

      final dynamic gymsData = jsonDecode(response.body);  // Decoding the JSON data

      // Assuming gymsData is a single gym map
      return {
        'id': gymsData['id'],
        'name': gymsData['name'],
        'address': gymsData['address'],
      };

    } else {
      return null;
    }
  }
}
