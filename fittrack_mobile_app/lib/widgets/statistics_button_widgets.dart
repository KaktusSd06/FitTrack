import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';

import '../screens/Meals/kcal_page.dart';

class StatisticsButtonWidgets extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: null,
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
            Text(
              "Статистика",
              style: AppTextStyles.h2.copyWith(
                color: Theme.of(context).brightness == Brightness.light
                    ? AppColors.black
                    : AppColors.white,
                fontWeight: FontWeight.bold,
              )
            ),

            const Icon(
              CupertinoIcons.chart_bar_circle,
              color: AppColors.fulvous,
              size: 40.0,
            ),
          ],
        ),
      ),
    );
  }
}
