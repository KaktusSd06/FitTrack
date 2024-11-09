import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/user.dart';
import 'package:http/http.dart' as http;
import '../providers/AuthProvider.dart';
import 'ApiService.dart';

class ServicesService {
  static Future<List<Map<String, dynamic>>> getServicesByGymId(int gymId) async {
    final response = await http.get(
      Uri.parse('https://fittrackapidev.onrender.com/api/Gyms/get-services/$gymId'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    print('Status code for get-services request: ${response.statusCode}');
    print('Response body for get-services request: ${response.body}');

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      if (responseData is List) {
        return responseData.map((service) => {
          'id': service['id'],
          'name': service['name'],
          'description': service['description'],
          'cost': service['cost'],
        }).toList();
      } else {
        throw Exception('Invalid response format');
      }
    } else {
      throw Exception('Failed to load services: ${response.statusCode}');
    }
  }
}