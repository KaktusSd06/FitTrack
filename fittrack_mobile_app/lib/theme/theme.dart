import 'package:flutter/material.dart';
import '../styles/colors.dart';


ThemeData lightMode = ThemeData(
  brightness: Brightness.light,
  colorScheme: const ColorScheme.light(
    primary: AppColors.fulvous,
    onPrimary: AppColors.white,
    secondary: AppColors.white,
    onSecondary: AppColors.white,
    surface: AppColors.white,
    onSurface: AppColors.jet,
    primaryContainer: AppColors.black,
  ),
);

ThemeData darkMode = ThemeData(
  brightness: Brightness.dark,
  colorScheme: const ColorScheme.dark(
    primary: AppColors.fulvous,
    onPrimary: AppColors.white,
    secondary: AppColors.fulvous,
    onSecondary: AppColors.black,
    surface: AppColors.black,
    onSurface: AppColors.isabelline,
    primaryContainer: AppColors.white,
  ),
);

