import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:fl_chart/fl_chart.dart';

import '../../services/meals_service.dart';

class CalorieStatisticsScreen extends StatefulWidget {
  final String userId;

  CalorieStatisticsScreen({required this.userId});

  @override
  _CalorieStatisticsScreenState createState() => _CalorieStatisticsScreenState();
}

class _CalorieStatisticsScreenState extends State<CalorieStatisticsScreen> {
  List<FlSpot> weekData = [];
  List<FlSpot> monthData = [];
  List<FlSpot> yearData = [];
  String selectedPeriod = 'week';
  bool isLoading = false;  // Track the loading state

  @override
  void initState() {
    super.initState();
    fetchCalories('week');  // Fetch weekly data when the screen is opened
  }

  Future<void> fetchCalories(String period) async {
    setState(() {
      isLoading = true;  // Set loading to true when starting to fetch data
    });

    DateTime startDate;
    DateTime endDate = DateTime.now();

    List<FlSpot> newData = [];
    switch (period) {
      case 'week':
        startDate = endDate.subtract(Duration(days: 6));
        for (int i = 0; i < 7; i++) {
          DateTime date = startDate.add(Duration(days: i));
          double calories = await MealsService.getCaloriesByUserIdForDateToDate(widget.userId, date, date);
          newData.add(FlSpot(i.toDouble(), calories.toDouble()));
        }
        setState(() {
          weekData = newData;
          selectedPeriod = 'week';
        });
        break;
      case 'month':
        startDate = DateTime(endDate.year, endDate.month - 1, 1);
        for (int i = 0; i < 30; i++) {
          DateTime date = startDate.add(Duration(days: i));
          double calories = await MealsService.getCaloriesByUserIdForDateToDate(widget.userId, date, date);
          newData.add(FlSpot(i.toDouble(), calories.toDouble()));
        }
        setState(() {
          monthData = newData;
          selectedPeriod = 'month';
        });
        break;
      case 'year':
        startDate = DateTime(endDate.year - 1, 1, 1);
        for (int i = 0; i < 12; i++) {
          DateTime date = DateTime(startDate.year, i + 1, 1);
          double calories = await MealsService.getCaloriesByUserIdForDateToDate(widget.userId, date, date);
          newData.add(FlSpot(i.toDouble(), calories.toDouble()));
        }
        setState(() {
          yearData = newData;
          selectedPeriod = 'year';
        });
        break;
      default:
        return;
    }

    setState(() {
      isLoading = false;  // Set loading to false after data is fetched
    });
  }

  void onPeriodChanged(String value) {
    setState(() {
      selectedPeriod = value;
    });
    fetchCalories(selectedPeriod); // Call fetch function without periodLabels conversion
  }

  @override
  Widget build(BuildContext context) {
    List<FlSpot> chartData = selectedPeriod == 'week'
        ? weekData
        : selectedPeriod == 'month'
        ? monthData
        : yearData;

    return Scaffold(
      appBar: AppBar(
        title: Text('Статистика калорій'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CupertinoSegmentedControl<String>(
                  padding: EdgeInsets.symmetric(vertical: 12, horizontal: 0),
                  groupValue: selectedPeriod,
                  onValueChanged: onPeriodChanged,
                  selectedColor: Theme.of(context).brightness == Brightness.light
                      ? AppColors.fulvous
                      : AppColors.fulvous,
                  unselectedColor: Theme.of(context).brightness == Brightness.light
                      ? AppColors.isabelline
                      : AppColors.gray,
                  borderColor: Theme.of(context).brightness == Brightness.light
                      ? AppColors.isabelline
                      : AppColors.gray,
                  children: {
                    'week': Padding(
                      padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                      child: Text(
                        'Тиждень',
                        style: AppTextStyles.h3.copyWith(
                          color: selectedPeriod == 'week'
                              ? (Theme.of(context).brightness == Brightness.light
                              ? AppColors.white
                              : AppColors.white)
                              : (Theme.of(context).brightness == Brightness.light
                              ? AppColors.jet
                              : AppColors.white),
                        ),
                      ),
                    ),
                    'month': Padding(
                      padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                      child: Text(
                        'Місяць',
                        style: AppTextStyles.h3.copyWith(
                          color: selectedPeriod == 'month'
                              ? (Theme.of(context).brightness == Brightness.light
                              ? AppColors.white
                              : AppColors.white)
                              : (Theme.of(context).brightness == Brightness.light
                              ? AppColors.jet
                              : AppColors.white),
                        ),
                      ),
                    ),
                    'year': Padding(
                      padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                      child: Text(
                        'Рік',
                        style: AppTextStyles.h3.copyWith(
                          color: selectedPeriod == 'year'
                              ? (Theme.of(context).brightness == Brightness.light
                              ? AppColors.white
                              : AppColors.white)
                              : (Theme.of(context).brightness == Brightness.light
                              ? AppColors.jet
                              : AppColors.white),
                        ),
                      ),
                    ),
                  },
                ),
              ],
            ),

            SizedBox(height: 12),

            // Show a loading indicator while the data is being fetched
            isLoading
                ? Expanded(child:  Center(
              child: CircularProgressIndicator(),
            ))
                : Expanded(
              child: LineChart(
                LineChartData(
                  titlesData: FlTitlesData(
                    leftTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        interval: 500,
                        reservedSize: 40,
                        getTitlesWidget: (value, _) => Text(
                          value.toInt().toString(),
                          style: TextStyle(fontSize: 12),
                        ),
                      ),
                    ),
                    rightTitles: AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                    topTitles: AxisTitles(
                      sideTitles: SideTitles(showTitles: false),
                    ),
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(
                        showTitles: true,
                        getTitlesWidget: (value, _) {
                          DateTime date;
                          String dateText;

                          if (selectedPeriod == 'week') {
                            // Calculate the date for weekly data
                            date = DateTime.now().subtract(Duration(days: 6 - value.toInt()));
                            dateText = DateFormat('E').format(date);
                          } else if (selectedPeriod == 'month') {
                            // Calculate the date for monthly data
                            date = DateTime.now().subtract(Duration(days: 30 - value.toInt()));
                            dateText = DateFormat('dd.MM').format(date);
                          } else {
                            // Calculate the month for yearly data (using index 0 for Jan, 1 for Feb, etc.)
                            date = DateTime(DateTime.now().year, value.toInt() + 1, 1);
                            dateText = DateFormat('MMM').format(date); // Format as three-letter month name
                          }

                          return Text(dateText, style: TextStyle(fontSize: 10));
                        },
                      ),
                    ),

                  ),
                  borderData: FlBorderData(show: true),
                  minX: 0,
                  maxX: (chartData.length - 1).toDouble(),
                  minY: 0,
                  maxY: 5000,
                  lineBarsData: [
                    LineChartBarData(
                      spots: chartData,
                      isCurved: true,
                      color: AppColors.fulvous,
                      dotData: FlDotData(show: true),
                      belowBarData: BarAreaData(show: false),
                    ),
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
