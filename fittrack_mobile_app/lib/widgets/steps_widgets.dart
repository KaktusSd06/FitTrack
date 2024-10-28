import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';

import '../screens/steps.dart';

class StepsWidgets extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double currentSteps = 11000;
    double goalSteps = 16000;
    double progress = currentSteps / goalSteps;

    return GestureDetector(
        onTap: () =>  null ,//Navigator.push(context, MaterialPageRoute(builder: (context) => StepsPage())),
    child:
    Container(
      padding: const EdgeInsets.all(16),
      width: double.infinity,
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light
            ? AppColors.isabelline
            : AppColors.gray,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Кроки",
              style: AppTextStyles.h2.copyWith(
                color: Theme.of(context).brightness == Brightness.light
                    ? AppColors.black
                    : AppColors.white,
              )
          ),

          SizedBox(height: 8),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Text(
                    "11000",
                    style: AppTextStyles.h1.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.black
                          : AppColors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(" / "),
                  Text(
                    "16000",
                    style: AppTextStyles.h3.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.black
                          : AppColors.white,
                    ),
                  ),
                ],
              ),

              SizedBox(width: 40),

              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(16), // Закр
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(16), // Закруглення шкали прогресу
                    child: LinearProgressIndicator(
                      value: 11 / 16,
                      backgroundColor: Theme.of(context).brightness == Brightness.light
                              ? AppColors.jet
                              : AppColors.isabelline,
                      color: AppColors.fulvous,
                      minHeight: 16,
                    ),
                  ),
                ),
              )
            ],
          ),
        ],
      ),
    ),
    );
  }
}
