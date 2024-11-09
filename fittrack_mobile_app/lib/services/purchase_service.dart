import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/individual_training.dart';
import '../models/user.dart';
import 'package:http/http.dart' as http;
import '../providers/AuthProvider.dart';
import 'ApiService.dart';

class  PurchaseService{
  static Future<bool> addPurchase(int itemId, int itemType, String userId) async {
    final formattedDate = DateTime.now().toUtc().toString();
    final payload = {
      'itemType': itemType,
      'userId': userId,
      'date': formattedDate,
      'quantity': 1,
      'goodId': itemType == 0 ? itemType : null,
      'serviceId': itemType == 1 ? itemType : null,
    };

    final response = await http.post(
      Uri.parse('https://fittrackapidev.onrender.com/api/Purchases'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(payload),
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 201) {
      return true;
    } else {
      print('Failed to add purchases. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }
}