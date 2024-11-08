import 'package:flutter/material.dart';
import '../../styles/colors.dart';
import '../../styles/fonts.dart';

class TrainerDetailWidget extends StatelessWidget {
  final String surname;
  final String firstName;
  final String phoneNumber;
  final String email;

  const TrainerDetailWidget({
    Key? key,
    required this.surname,
    required this.firstName,
    required this.phoneNumber,
    required this.email,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light
            ? AppColors.isabelline
            : AppColors.gray,
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
          // Full Name
          Text(
            '$surname $firstName',
            style: AppTextStyles.h2, // Style for name
          ),
          const SizedBox(height: 8.0),

          // Phone number
          Text(
            'Телефон: $phoneNumber',
            style: AppTextStyles.h3, // Style for phone number
          ),
          const SizedBox(height: 4.0),

          // Email
          Text(
            'Пошта: $email',
            style: AppTextStyles.h3, // Style for email
          ),
        ],
      ),
    );
  }
}
