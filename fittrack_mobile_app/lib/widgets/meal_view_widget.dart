import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:flutter/material.dart';

import '../styles/colors.dart';

class MealViewWidget extends StatelessWidget {
  final String foodName;
  final int kcal;
  final VoidCallback onDelete;

  const MealViewWidget({
    Key? key,
    required this.foodName,
    required this.kcal,
    required this.onDelete,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
      decoration: BoxDecoration(
        color:  Theme.of(context).brightness == Brightness.light
            ? AppColors.isabelline
            : AppColors.gray,
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  foodName,
                  style: AppTextStyles.h2.copyWith(
                    color:  Theme.of(context).brightness == Brightness.light
                        ? AppColors.black
                        : AppColors.white,
                    fontWeight: FontWeight.bold,
                  )
                ),
                SizedBox(height: 4.0),
                Text(
                  "$kcal kcal",
                    style: AppTextStyles.h3.copyWith(
                      color:  Theme.of(context).brightness == Brightness.light
                          ? AppColors.gray
                          : AppColors.silver,
                    )
                ),
              ],
            ),
          ),
          IconButton(
            icon: Icon(Icons.clear),
            color:  Theme.of(context).brightness == Brightness.light
                ? AppColors.black
                : AppColors.white,
            onPressed: onDelete,
          ),
        ],
      ),
    );
  }
}
