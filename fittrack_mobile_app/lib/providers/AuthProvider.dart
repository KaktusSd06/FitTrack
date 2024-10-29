import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';
import 'dart:convert';

class AuthProvider with ChangeNotifier {
  User? user;
  bool _isAuthenticated = false;

  bool get isAuthenticated => _isAuthenticated;

  AuthProvider() {
    _loadUserData(); // Load user data on initialization
  }

  Future<void> _loadUserData() async {
    final prefs = await SharedPreferences.getInstance();
    final String? userData = prefs.getString('user');
    if (userData != null) {
      user = User.fromJson(jsonDecode(userData)); // Convert JSON string to Map
      _isAuthenticated = true;
      notifyListeners();
    }
  }

  Future<void> loginWithUserData(User userData) async {
    user = userData;
    _isAuthenticated = true;
    notifyListeners();
    await _saveUserData(userData); // Save user data
  }

  Future<void> _saveUserData(User userData) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user', jsonEncode(userData.toJson())); // Convert to JSON string
  }

  Future<void> logout() async {
    user = null;
    _isAuthenticated = false;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('user'); // Remove user data
    notifyListeners();
  }
}
