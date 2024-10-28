import 'package:fittrack_mobile_app/screens/group_training.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:fittrack_mobile_app/widgets/kcal_widget.dart';
import 'package:fittrack_mobile_app/widgets/training_time_widget.dart';
import 'package:fittrack_mobile_app/widgets/weight_widgets.dart';
import 'package:flutter/material.dart';
import '../widgets/group_training_widgets.dart';
import '../widgets/steps_widgets.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.topCenter,
      child: Container(
        padding: const EdgeInsets.only(left: 16, right: 16, top: 16),
        child: Column(
          mainAxisSize: MainAxisSize.min, // Додаємо, щоб уникнути розтягування
          children: [
            StepsWidgets(),
            SizedBox(height: 8), // Додаємо відступ між віджетами
            Row(
              children: [
                Expanded( // Додаємо Expanded, щоб Row зайняв весь простір
                  child: WeightWidgets(),
                ),

                SizedBox(width: 16),

                Expanded( // Додаємо Expanded, щоб Row зайняв весь простір
                  child: KcalWidget(),
                ),
              ],
            ),
            SizedBox(height: 8), // Додаємо відступ між віджетами
            TrainingTimeWidget(),

            SizedBox(height: 24),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Тренування сьогодні",
                style: AppTextStyles.h2.copyWith(
                  fontWeight: FontWeight.bold,
                )),

                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => GroupTraining()),
                    );
                  },                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
                    decoration: BoxDecoration(
                      color: AppColors.fulvous,
                      borderRadius: BorderRadius.circular(4),
                    ),

                    child:
                    Text("Більше", style: AppTextStyles.h3.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.white
                          : AppColors.jet,
                    )),
                  ),
                )
              ],
            ),

            SizedBox(height: 8), // Додаємо відступ між віджетами


            Expanded(
              child: SingleChildScrollView(
                  child: Column(
                    children: [
                      GroupTrainingWidgets(),
                      SizedBox(height: 8),
                      GroupTrainingWidgets(),
                      SizedBox(height: 8),
                      GroupTrainingWidgets(),
                      SizedBox(height: 8),
                      GroupTrainingWidgets(),
                      SizedBox(height: 8),
                    ],
                  ),

              )
            ),
          ],
        ),
      ),
    );
  }
}
