import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';

class TrainingTimeWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
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
          Container(
            padding: const EdgeInsets.only(right: 24),
            child: Icon(
              CupertinoIcons.time,
              color: AppColors.fulvous,
              size: 40.0,
            ),
          ),


          SizedBox(height: 24),

          Expanded(  // Додаємо Expanded, щоб обмежити ширину дочірніх елементів
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,  // Вирівнюємо текст по лівому краю
              children: [
                Text(
                  "05:13:04",
                  style: AppTextStyles.h1.copyWith(
                    color: AppColors.fulvous,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      "Тренувань на цьому тижні",
                      style: AppTextStyles.h2.copyWith(
                        color: Theme.of(context).brightness == Brightness.light
                            ? AppColors.black
                            : AppColors.white,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
