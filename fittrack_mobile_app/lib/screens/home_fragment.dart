import 'package:fittrack_mobile_app/screens/group_training.dart';
import 'package:fittrack_mobile_app/services/group_training_service.dart';
import 'package:fittrack_mobile_app/services/user_service.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:fittrack_mobile_app/widgets/kcal_widget.dart';
import 'package:fittrack_mobile_app/widgets/training_time_widget.dart';
import 'package:fittrack_mobile_app/widgets/weight_widgets.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/services/meals_service.dart';
import 'package:provider/provider.dart';
import '../models/Gym_fot_UI.dart';
import '../models/group_training_UI.dart';
import '../services/gym_service.dart';
import '../widgets/group_training_widgets.dart';
import '../widgets/steps_widgets.dart';
import '../../providers/AuthProvider.dart';
import 'package:fittrack_mobile_app/services/training_time_service.dart';
import 'package:fittrack_mobile_app/services/weight_service.dart';

class HomeScreen extends StatefulWidget {
  HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ValueNotifier<int> stepsNotifier = ValueNotifier<int>(0);
  late Future<double> _caloriesFuture;
  late Future<Duration> _trainingTimeFuture;
  late Future<double?> _weightFuture;
  Future<List<GroupTrainingUI>>? _todayTrainingsFuture; // Nullable
  late String userId;
  int? gymId;

  @override
  void initState() {
    super.initState();
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    userId = authProvider.user!.id;
    _trainingTimeFuture = Future.value(Duration(days: 0, hours: 0, minutes: 0));
    _weightFuture = Future.value(null);
    _caloriesFuture = Future.value(0.0);
    _initializeData();
  }

  Future<void> _initializeData() async {
    await _getGymId(); // Waits for gymId to be set
    _fetchCalories();
    _fetchTrainingTime();
    _fetchWeight();
    _fetchTodayTrainings(); // Call _fetchTodayTrainings after gymId is available
  }

  void _fetchCalories() {
    setState(() {
      _caloriesFuture = MealsService.getCaloriesByUserIdForDate(userId);
    });
  }

  Future<void> _getGymId() async {
    final gymData = await GymService.getGymByUserId(userId);
    if (gymData != null) {
      GymForUI gym = GymForUI.fromJson(gymData);
      setState(() {
        gymId = gym.id;
      });
    }
  }

  void _fetchTodayTrainings() {
    if (gymId != null) {
      setState(() {
        _todayTrainingsFuture = GroupTrainingService.getTodayTrainings(gymId!);
      });
    }
  }

  void _fetchWeight() {
    setState(() {
      _weightFuture = WeightService.getUserWeightById(userId);
    });
  }

  void updateWeight() {
    _fetchWeight();
  }

  void _fetchTrainingTime() {
    setState(() {
      _trainingTimeFuture = TrainingTimeService.getTrainingTimeByWeek(userId);
    });
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

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
                  child: FutureBuilder<double?>(
                    future: _weightFuture, // your Future<double?> here
                    builder: (BuildContext context, AsyncSnapshot<double?> snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return WeightWidgets(onWeightChanged: updateWeight);
                      } else if (snapshot.hasError) {
                        // Handle error if the future fails
                        return WeightWidgets(onWeightChanged: updateWeight);
                      } else if (snapshot.hasData) {
                        // Pass the resolved value to the WeightWidgets
                        return WeightWidgets(weight: snapshot.data ?? 0.0, onWeightChanged: updateWeight); // default to 0.0 if no data
                      } else {
                        // Handle case when there's no data
                        return WeightWidgets(onWeightChanged: updateWeight);
                      }
                    },
                  ),

                ),
                SizedBox(width: 16),
                Expanded(
                  child: FutureBuilder<double>(
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
            FutureBuilder<Duration>(
              future: _trainingTimeFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                    child: CircularProgressIndicator(),
                  );
                }
                // If there's an error, also show a loading indicator or an error message
                else if (snapshot.hasError) {
                  return Center(
                    child: Text('Error loading training time'),
                  );
                }
                // Once the data is loaded, display the widget with the fetched training time
                else {
                  return TrainingTimeWidget(
                    initialTrainingTime: snapshot.data ?? Duration.zero,
                    userId: authProvider.user!.id!,
                  );
                }
              },
            ),
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
                      MaterialPageRoute(builder: (context) => GroupTraining(gymId: gymId)),
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
          child: FutureBuilder<List<GroupTrainingUI>>(
            future: _todayTrainingsFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Center(child: CircularProgressIndicator());
              } else if(gymId == null){
                return Center(child: Text('Оберіть зал'));
              } else if (snapshot.hasError) {
                return Center(child: Text('Здається сталась помилка'));
              } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                return Center(child: Text('Відсутні заплановані тенування на сьогодні'));
              } else {
                return SingleChildScrollView(
                  child: ListView.builder(
                    physics: NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: snapshot.data!.length,
                    itemBuilder: (context, index) {
                      final training = snapshot.data![index];
                      return Column(
                        children: [
                          GroupTrainingWidgets(training: training),
                          SizedBox(height: 8), // Adjust the height to set the spacing
                        ],
                      );
                    },
                  ),
                );

              }
            },
          ),
        ),
          ],
        ),
      ),
    );
  }
}
