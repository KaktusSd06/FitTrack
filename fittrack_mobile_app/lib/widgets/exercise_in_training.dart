import 'package:flutter/material.dart';
import '../../styles/colors.dart';
import '../../styles/fonts.dart';

class ExerciseWidget extends StatelessWidget {
  final String exerciseName;
  final double weight;
  final int repetitions;
  final VoidCallback onDelete;

  const ExerciseWidget({
    Key? key,
    required this.exerciseName,
    required this.weight,
    required this.repetitions,
    required this.onDelete,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      decoration: BoxDecoration(
        color: AppColors.isabelline,
        borderRadius: BorderRadius.circular(10.0),
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            offset: Offset(0, 2),
            blurRadius: 4.0,
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  exerciseName,
                  style: AppTextStyles.h2, // використовуй стиль для назви
                ),
                const SizedBox(height: 8.0),
                SizedBox(
                  width: 160.0, // Максимальна ширина
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Вага: $weight',
                        style: AppTextStyles.h4, // стиль для ваги
                      ),
                      const SizedBox(width: 16.0),
                      Text(
                        'Повторів: $repetitions',
                        style: AppTextStyles.h4, // стиль для повторів
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          IconButton(
            icon: Icon(Icons.delete, color: AppColors.fulvous), // стиль для іконки видалення
            onPressed: onDelete,
          ),
        ],
      ),
    );
  }
}
