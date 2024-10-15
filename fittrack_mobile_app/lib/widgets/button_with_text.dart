import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';

class ButtonWithText extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;

  const ButtonWithText({
    required this.text,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ButtonStyle(
        backgroundColor: MaterialStateProperty.all<Color>(AppColors.fulvous),
        foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
        padding: MaterialStateProperty.all<EdgeInsets>(
          EdgeInsets.symmetric(vertical: 12.0, horizontal: 40.0), // Зменшено padding
        ),
        shape: MaterialStateProperty.all<RoundedRectangleBorder>(
          RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(4.0),
          ),
        ),
        elevation: MaterialStateProperty.all<double>(10.0),
      ),
      child: Text(
        text,
        style: AppTextStyles.h2,
        textAlign: TextAlign.center, // Вирівнювання тексту
        overflow: TextOverflow.ellipsis, // Текст в одну лінію і додається "..."
      ),
    );
  }
}
