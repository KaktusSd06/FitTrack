import 'package:fittrack_mobile_app/screens/group_training.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:fittrack_mobile_app/widgets/kcal_widget.dart';
import 'package:fittrack_mobile_app/widgets/training_time_widget.dart';
import 'package:fittrack_mobile_app/widgets/weight_widgets.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/services/meals_service.dart';
import 'package:provider/provider.dart';
import '../widgets/exercise_in_training.dart';
import '../widgets/group_training_widgets.dart';
import '../widgets/steps_widgets.dart';
import '../../providers/AuthProvider.dart';

class HomeScreen extends StatefulWidget {
  HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ValueNotifier<int> stepsNotifier = ValueNotifier<int>(0);
  late Future<int> _caloriesFuture;
  late String userId;

  @override
  void initState() {
    super.initState();
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    userId = authProvider.user!.id;
    _fetchCalories();
  }

  void _fetchCalories() {
    setState(() {
      _caloriesFuture = MealsService.getCaloriesByUserIdForDate(userId);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.topCenter,
      child: Container(
        padding: const EdgeInsets.only(left: 16, right: 16, top: 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            StepsWidget(stepsNotifier: stepsNotifier),
            SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: WeightWidgets(),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: FutureBuilder<int>(
                    future: _caloriesFuture,
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return KcalWidget(
                          isClickable: true,
                          calories: null,
                        );
                      } else if (snapshot.hasError) {
                        return KcalWidget(
                          isClickable: true,
                          calories: 0,
                        );
                      } else {
                        return KcalWidget(
                          isClickable: true,
                          calories: snapshot.data ?? 0,
                        );
                      }
                    },
                  ),
                ),
              ],
            ),
            SizedBox(height: 8),
            TrainingTimeWidget(),
            SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Тренування сьогодні",
                  style: AppTextStyles.h2.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => GroupTraining()),
                    );
                  },
                  child: Container(
                    padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
                    decoration: BoxDecoration(
                      color: AppColors.fulvous,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      "Більше",
                      style: AppTextStyles.h3.copyWith(
                        color: Theme.of(context).brightness == Brightness.light
                            ? AppColors.white
                            : AppColors.jet,
                      ),
                    ),
                  ),
                )
              ],
            ),
            SizedBox(height: 8),
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
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
