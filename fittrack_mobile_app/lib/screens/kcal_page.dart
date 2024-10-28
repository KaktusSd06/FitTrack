import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../styles/colors.dart';
import '../styles/fonts.dart';
import '../widgets/kcal_widget.dart';
import '../widgets/meal_view_widget.dart';
import '../widgets/statistics_button_widgets.dart';

class KcalPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Харчування",
          style: AppTextStyles.h1.copyWith(
            color: Theme.of(context).brightness == Brightness.light
                ? AppColors.gray
                : AppColors.white
          ),
        ),
        centerTitle: false,
        leading: Padding(
          padding: const EdgeInsets.only(left: 16.0),
          child: IconButton(
            icon: Icon(
              CupertinoIcons.back,
                color: Theme.of(context).brightness == Brightness.light
                    ? AppColors.gray
                    : AppColors.white,
            ),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
        backgroundColor: Theme
            .of(context)
            .colorScheme
            .surface,
        elevation: 0,
      ),

      body: _buildBody(context),
    );
  }

  Widget _buildBody(BuildContext context) {
    return Align(
      alignment: Alignment.topCenter,
      child: Container(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            IntrinsicHeight( // Додаємо IntrinsicHeight для однакової висоти
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch, // Вирівнюємо по висоті
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded( // Додаємо Expanded для заповнення простору
                    child: KcalWidget(isClickable: false),
                  ),
                  SizedBox(width: 16),
                  Expanded( // Додаємо Expanded для заповнення простору
                    child: StatisticsButtonWidgets(),
                  ),
                ],
              ),
            ),

            SizedBox(height: 24),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Сьогодні",
                    style: AppTextStyles.h2.copyWith(
                      fontWeight: FontWeight.bold,
                    )),

                Container(
                    padding: const EdgeInsets.symmetric(vertical: 4.5, horizontal: 8),
                    decoration: BoxDecoration(
                      color: AppColors.fulvous,
                      borderRadius:  BorderRadius.circular(4),
                    ),


                    child: Row(
                      children: [
                        Icon(
                          CupertinoIcons.plus,
                          color: Theme.of(context).brightness == Brightness.light
                              ? AppColors.white
                              : AppColors.white,
                          size: 16.0,
                        ),

                        SizedBox(width: 4),

                        Text("Додати",
                          style: AppTextStyles.h4.copyWith(
                            color: Theme.of(context).brightness == Brightness.light
                                ? AppColors.white
                                : AppColors.white,
                            fontWeight: FontWeight.bold,
                          ),),
                      ],
                    )
                ),
              ],
            ),

            SizedBox(height: 12),

            Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      MealViewWidget(
                        foodName: "Рис парений",
                        kcal: 245,
                        onDelete: () {
                        },
                      ),
                      SizedBox(height: 8),
                      MealViewWidget(
                        foodName: "Рис парений",
                        kcal: 245,
                        onDelete: () {
                        },
                      ),
                      SizedBox(height: 8),
                      MealViewWidget(
                        foodName: "Рис парений",
                        kcal: 245,
                        onDelete: () {
                        },
                      ),
                      SizedBox(height: 8),
                      MealViewWidget(
                        foodName: "Рис парений",
                        kcal: 245,
                        onDelete: () {
                        },
                      ),
                      SizedBox(height: 8),
                    ],
                  ),

                )
            ),
          ],
        )
      ),
    );
  }


}