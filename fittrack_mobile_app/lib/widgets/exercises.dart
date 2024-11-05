import 'package:flutter/material.dart';
import '../../styles/colors.dart';
import '../../styles/fonts.dart';

class ExerciseDetailWidget extends StatelessWidget {
  final String exerciseName;
  final String description;

  const ExerciseDetailWidget({
    Key? key,
    required this.exerciseName,
    required this.description,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      decoration: BoxDecoration(
        color: AppColors.isabelline,
        borderRadius: BorderRadius.circular(4.0),
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            offset: Offset(0, 2),
            blurRadius: 4.0,
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            exerciseName,
            style: AppTextStyles.h2, // стиль для назви
          ),
          const SizedBox(height: 8.0),
          Text(
            description,
            style: AppTextStyles.h3, // стиль для опису
          ),
        ],
      ),
    );
  }
}
