import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:fittrack_mobile_app/models/group_training.dart';

import '../models/group_training_UI.dart';

class GroupTrainingWidgets extends StatelessWidget {
  final GroupTrainingUI training;

  GroupTrainingWidgets({required this.training});

  // Функція для відкриття телефонного застосунку з номером телефону
  void _callTrainer(String phoneNumber) async {
    final Uri launchUri = Uri(scheme: 'tel', path: phoneNumber);
    if (await canLaunchUrl(launchUri)) {
      await launchUrl(launchUri);
    } else {
      throw 'Could not launch $phoneNumber';
    }
  }

  @override
  Widget build(BuildContext context) {
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
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    training.date, // час тренування
                    style: AppTextStyles.h2.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.black
                          : AppColors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    "${training.durationInMinutes} хв",
                    style: AppTextStyles.h3,
                  ),
                ],
              ),
              SizedBox(width: 36),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    training.description, // назва тренування
                    style: AppTextStyles.h2.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.black
                          : AppColors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    training.trainer, // ім'я тренера
                    style: AppTextStyles.h3,
                  ),
                ],
              ),
            ],
          ),
          GestureDetector(
            onTap: () => _callTrainer(training.contactPhone), // виклик телефону
            child: Container(
              padding: const EdgeInsets.all(8),
              decoration: ShapeDecoration(
                color: Color(0xFFE48100),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(50),
                ),
              ),
              child: Icon(
                CupertinoIcons.phone,
                color: Theme.of(context).brightness == Brightness.light
                    ? AppColors.white
                    : AppColors.jet,
                size: 24.0,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
