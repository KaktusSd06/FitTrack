import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:pedometer/pedometer.dart';
import 'dart:async';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';

class StepsWidget extends StatefulWidget {
  final ValueNotifier<int> stepsNotifier;

  StepsWidget({required this.stepsNotifier});

  @override
  _StepsWidgetState createState() => _StepsWidgetState();
}

class _StepsWidgetState extends State<StepsWidget> {
  late Stream<StepCount> _stepCountStream;
  final int _goalSteps = 16000;

  @override
  void initState() {
    super.initState();
    initPlatformState();
  }

  Future<void> initPlatformState() async {
    bool granted = await _checkActivityRecognitionPermission();
    if (!granted) {
      print("Немає доступу до розпізнавання активності");
      return;
    }

    _stepCountStream = Pedometer.stepCountStream;
    _stepCountStream.listen(onStepCount).onError(onStepCountError);
  }

  Future<bool> _checkActivityRecognitionPermission() async {
    var status = await Permission.activityRecognition.status;
    if (!status.isGranted) {
      status = await Permission.activityRecognition.request();
    }
    return status.isGranted;
  }

  void onStepCount(StepCount event) {
    print("Кроки: ${event.steps}");
    setState(() {
      widget.stepsNotifier.value = event.steps;
    });
  }

  void onStepCountError(error) {
    if (error is PlatformException) {
      print("Помилка підрахунку кроків: НЕДОСТУПНО");
    }
    print("Помилка підрахунку кроків: $error");
    setState(() {
      widget.stepsNotifier.value = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<int>(
      valueListenable: widget.stepsNotifier,
      builder: (context, steps, child) {
        double progress = (steps / _goalSteps).clamp(0.0, 1.0);

        return GestureDetector(
          child: Container(
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
                Text(
                  "Кроки",
                  style: AppTextStyles.h2.copyWith(
                    color: Theme.of(context).brightness == Brightness.light
                        ? AppColors.black
                        : AppColors.white,
                  ),
                ),
                SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Text(
                          "$steps",
                          style: AppTextStyles.h1.copyWith(
                            color: Theme.of(context).brightness == Brightness.light
                                ? AppColors.black
                                : AppColors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(" / "),
                        Text(
                          "$_goalSteps",
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
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(16),
                          child: LinearProgressIndicator(
                            value: progress,
                            backgroundColor: Theme.of(context).brightness == Brightness.light
                                ? AppColors.jet
                                : AppColors.isabelline,
                            color: AppColors.fulvous,
                            minHeight: 16,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
