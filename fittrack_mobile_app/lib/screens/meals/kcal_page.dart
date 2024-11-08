import 'package:fittrack_mobile_app/screens/meals/add_meal.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../providers/AuthProvider.dart';
import '../../styles/colors.dart';
import '../../styles/fonts.dart';
import '../../widgets/kcal_widget.dart';
import '../../widgets/meal_view_widget.dart';
import '../../widgets/statistics_button_widgets.dart';
import 'package:fittrack_mobile_app/services/meals_service.dart';

class KcalPage extends StatefulWidget {
  @override
  _KcalPageState createState() => _KcalPageState();
}

class _KcalPageState extends State<KcalPage> {
  late Future<List<Map<String, dynamic>>> _mealsFuture;
  late String userId;
  double? totalCalories;

  @override
  void initState() {
    super.initState();
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    userId = authProvider.user!.id;
    _fetchMealsAndCalories();
  }

  void _fetchMealsAndCalories() {
    setState(() {
      _mealsFuture = MealsService.getMealsByUserIdForDate(userId);
    });
    _fetchCalories();
  }

  Future<void> _fetchCalories() async {
    try {
      double calories = await MealsService.getCaloriesByUserIdForDate(userId);
      setState(() {
        totalCalories = calories;
      });
    } catch (e) {
      print("Error fetching calories: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Харчування",
          style: AppTextStyles.h1.copyWith(
            color: Theme.of(context).brightness == Brightness.light
                ? AppColors.gray
                : AppColors.white,
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
        backgroundColor: Theme.of(context).colorScheme.surface,
        elevation: 0,
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    return Align(
      alignment: Alignment.topCenter,
      child: Container(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            IntrinsicHeight(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: FutureBuilder<double>(
                      future: MealsService.getCaloriesByUserIdForDate(userId),
                      builder: (context, snapshot) {
                        if (snapshot.connectionState == ConnectionState.waiting) {
                          return KcalWidget(
                            isClickable: false,
                            calories: null,
                          );
                        } else if (snapshot.hasError) {
                          return KcalWidget(
                            isClickable: false,
                            calories: 0,
                          );
                        } else {
                          return KcalWidget(
                            isClickable: false,
                            calories: snapshot.data ?? 0,
                          );
                        }
                      },
                    ),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: StatisticsButtonWidgets(),
                  ),
                ],
              ),
            ),
            SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Сьогодні",
                  style: AppTextStyles.h2.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(vertical: 4.5, horizontal: 8),
                  decoration: BoxDecoration(
                    color: AppColors.fulvous,
                    borderRadius: BorderRadius.circular(4),
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
                      GestureDetector(
                        onTap: () async {
                          await Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => AddMealPage()),
                          );
                          _fetchMealsAndCalories();
                        },
                        child: Text(
                          "Додати",
                          style: AppTextStyles.h4.copyWith(
                            color: Theme.of(context).brightness == Brightness.light
                                ? AppColors.white
                                : AppColors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            SizedBox(height: 12),
            Expanded(
              child: FutureBuilder<List<Map<String, dynamic>>>(
                future: _mealsFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    return Center(child: Text('Помилка завантаження даних'));
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    return Center(child: Text('Здається тут пусто'));
                  } else {
                    return SingleChildScrollView(
                      child: Column(
                        children: snapshot.data!.map((meal) {
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 8.0),
                            child: MealViewWidget(
                              foodName: meal['name'] ?? 'Невідомо',
                              kcal: meal['calories'] ?? 0,
                              onDelete: () async {
                                bool success = await MealsService().deleteMealById(meal['id']);
                                if (success) {
                                  setState(() {
                                    _mealsFuture = MealsService.getMealsByUserIdForDate(userId);
                                  });
                                  await _fetchCalories(); // Оновлення калорій
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(content: Text('Страву видалено')),
                                  );
                                } else {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(content: Text('Не вдалося видалити страву')),
                                  );
                                }
                              },
                            ),
                          );
                        }).toList(),
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
