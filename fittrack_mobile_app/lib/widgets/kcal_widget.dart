import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:provider/provider.dart';
import '../providers/AuthProvider.dart';
import '../services/meals_service.dart'; // Import the MealsService to fetch data
import '../screens/Meals/kcal_page.dart';

class KcalWidget extends StatelessWidget {
  final bool isClickable;
  final int? calories; // Make it nullable to show 'Loading...' if null

  KcalWidget({this.isClickable = true, this.calories});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: isClickable
          ? () => Navigator.push(context, MaterialPageRoute(builder: (context) => KcalPage()))
          : null,
      child: Container(
        padding: const EdgeInsets.all(16),
        width: double.infinity,
        decoration: BoxDecoration(
          color: Theme.of(context).brightness == Brightness.light
              ? AppColors.isabelline
              : AppColors.gray,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "kcal",
                    style: AppTextStyles.h2.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.black
                          : AppColors.white,
                    ),
                  ),
                  SizedBox(height: 8),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        calories == null ? '...' : '$calories',
                        style: AppTextStyles.h1.copyWith(
                          color: Theme.of(context).brightness == Brightness.light
                              ? AppColors.black
                              : AppColors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const Icon(
              CupertinoIcons.settings,
              color: AppColors.fulvous,
              size: 40.0,
            ),
          ],
        ),
      ),
    );
  }
}


