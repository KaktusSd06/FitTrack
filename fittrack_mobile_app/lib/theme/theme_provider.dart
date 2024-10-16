import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'theme.dart'; // Імпортуйте ваш файл тем

class ThemeProvider with ChangeNotifier {
  ThemeData _themeData = lightMode;

  ThemeData get themeData => _themeData;

  ThemeProvider() {
    _loadTheme(); // Завантажуємо тему при ініціалізації
  }

  set themeData(ThemeData themeData) {
    _themeData = themeData;
    notifyListeners();
  }

  // Завантаження теми з shared preferences
  Future<void> _loadTheme() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bool isDarkMode = prefs.getBool('isDarkMode') ?? false; // За замовчуванням світла тема
    _themeData = isDarkMode ? darkMode : lightMode;
    notifyListeners(); // Оновлюємо слухачів
  }

  // Збереження теми в shared preferences
  Future<void> _saveThemePreference(bool isDarkMode) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setBool('isDarkMode', isDarkMode);
  }

  void toggleTheme() {
    if (_themeData == lightMode) {
      _themeData = darkMode;
      _saveThemePreference(true); // Зберігаємо, що тема темна
    } else {
      _themeData = lightMode;
      _saveThemePreference(false); // Зберігаємо, що тема світла
    }
    notifyListeners();
  }
}
