import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:fittrack_mobile_app/services/training_time_service.dart';

class TrainingTimeWidget extends StatefulWidget {
  final Duration initialTrainingTime;
  final String userId;

  TrainingTimeWidget({required this.initialTrainingTime, required this.userId});

  @override
  _TrainingTimeWidgetState createState() => _TrainingTimeWidgetState();
}

class _TrainingTimeWidgetState extends State<TrainingTimeWidget> {
  late Duration _elapsedTime;
  late Duration _startTime;
  Timer? _timer;
  bool _isRunning = false;

  @override
  void initState() {
    super.initState();
    _elapsedTime = widget.initialTrainingTime;
  }

  void _startTimer() {
    _startTime = _elapsedTime;
    _timer = Timer.periodic(Duration(seconds: 1), (timer) {
      setState(() {
        _elapsedTime += Duration(seconds: 1);
      });
    });
  }

  Future<void> _stopTimer() async {
    _timer?.cancel();

    final success = await TrainingTimeService.addTrainingTime(widget.userId,_elapsedTime - _startTime);
  }

  void _toggleTimer() {
    setState(() {
      _isRunning = !_isRunning;
      if (_isRunning) {
        _startTimer();
      } else {
        _stopTimer();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final hours = _elapsedTime.inHours;
    final minutes = _elapsedTime.inMinutes.remainder(60);
    final seconds = _elapsedTime.inSeconds.remainder(60);

    return Container(
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
          GestureDetector(
            onTap: _toggleTimer,
            child: Icon(
              _isRunning ? CupertinoIcons.pause_circle : CupertinoIcons.play_circle,
              color: AppColors.fulvous,
              size: 40.0,
            ),
          ),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "${hours.toString().padLeft(2, '0')}:${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}",
                  style: AppTextStyles.h1.copyWith(
                    color: Theme.of(context).brightness == Brightness.light
                        ? AppColors.black
                        : AppColors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      "Тренувань на цьому тижні",
                      style: AppTextStyles.h2.copyWith(
                        color: Theme.of(context).brightness == Brightness.light
                            ? AppColors.black
                            : AppColors.white,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}