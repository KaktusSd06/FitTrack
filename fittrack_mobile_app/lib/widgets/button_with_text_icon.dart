import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';

class ButtonWithTextIcon extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final String? iconPath;  // Додано параметр для шляху до іконки

  const ButtonWithTextIcon({
    required this.text,
    required this.onPressed,
    this.iconPath,  // Іконка необов'язкова
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ButtonStyle(
        backgroundColor: MaterialStateProperty.all<Color>(AppColors.fulvous),
        foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
        padding: MaterialStateProperty.all<EdgeInsets>(
          EdgeInsets.symmetric(vertical: 10.0, horizontal: 16.0),
        ),
        shape: MaterialStateProperty.all<RoundedRectangleBorder>(
          RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(4.0),
          ),
        ),
        elevation: MaterialStateProperty.all<double>(10.0),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (iconPath != null) ...[
            Image.asset(
              iconPath!,  // Використовуємо іконку з assets
              width: 24.0,
              height: 24.0,
            ),
            SizedBox(width: 8.0),  // Відступ між іконкою та текстом
          ],
          Text(
            text,
            style: AppTextStyles.h2,
          ),
        ],
      ),
    );
  }
}
