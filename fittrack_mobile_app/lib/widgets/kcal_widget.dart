import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';

import '../screens/kcal_page.dart';

class KcalWidget extends StatelessWidget {
  final bool isClickable;

  KcalWidget({this.isClickable = true}); // за замовчуванням клікабельний

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: isClickable
          ? () => Navigator.push(context, MaterialPageRoute(builder: (context) => KcalPage()))
          : null, // якщо не клікабельний, на tap нічого не відбувається
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
                        "1283",
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
