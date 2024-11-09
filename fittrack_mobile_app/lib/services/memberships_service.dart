import 'dart:convert';
import 'package:http/http.dart' as http;

class MembershipsService {
  static Future<List<Map<String, dynamic>>> getMembershipsByGymId(int gymId) async {
    final response = await http.get(
      Uri.parse('https://fittrackapidev.onrender.com/api/Gyms/get-memberships/$gymId'),
      headers: {
        'Content-Type': 'application/json',
      },
    ).timeout(const Duration(seconds: 60));

    print('Status code for get-services request: ${response.statusCode}');
    print('Response body for get-services request: ${response.body}');

    if (response.statusCode == 200) {
      final responseData = json.decode(response.body);
      if (responseData is List) {
        return responseData.map((service) {
          // Ensure cost, sessions, and durationInMonths are treated as integers or fallback to 0 if null
          final cost = _toInt(service['cost']);
          final sessions = _toInt(service['sessions']);
          final durationInMonths = _toInt(service['durationInMonths']);

          return {
            'id': service['id'],
            'membershipName': service['membershipName'] ?? 'Відсутній',
            'sessions': sessions,
            'durationInMonths': durationInMonths,
            'cost': cost,
          };
        }).toList();
      } else {
        throw Exception('Invalid response format');
      }
    } else {
      throw Exception('Failed to load services: ${response.statusCode}');
    }


  }

  // Helper method to convert dynamic values to integer, with a fallback to 0
  static int _toInt(dynamic value) {
    if (value == null) return 0;
    if (value is int) return value;
    if (value is double) return value.toInt();
    return 0;
  }

  static Future<bool> byMembership(int membershipId, String userId, int duration, int session) async {
    DateTime currentDate = DateTime.now().toUtc();
    int daysToAdd = duration * 30;

    DateTime expirationDate = (session == 0)
        ? currentDate.add(Duration(days: daysToAdd))
        : currentDate.add(Duration(days: 30));

    final payload = {
      'sessionsReminded': session == 0 ? null : session,
      'expirationDate': expirationDate.toIso8601String().split('T')[0],
      'userId': userId,
      'membershipId': membershipId,
    };

    final response = await http.post(
      Uri.parse('https://fittrackapidev.onrender.com/api/UserMemberships'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode(payload),
    ).timeout(const Duration(seconds: 60));

    if (response.statusCode == 201) {
      return true;
    } else {
      print('Failed to add membership. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      return false;
    }
  }
}
