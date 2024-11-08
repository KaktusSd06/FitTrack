import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/AuthProvider.dart';
import '../screens/weight.dart';
import '../styles/colors.dart';
import '../styles/fonts.dart';

class WeightWidgets extends StatelessWidget {
  final double weight;
  final VoidCallback onWeightChanged; // Callback parameter


  WeightWidgets({this.weight = 0, required this.onWeightChanged});

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => WeightPage(userId: authProvider.user!.id!, onWeightChanged: onWeightChanged)),
        );
      },
      child: Container(
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
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Вага",
                    style: AppTextStyles.h2.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.black
                          : AppColors.white,
                    ),
                  ),
                  SizedBox(height: 8),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "$weight", // Виводимо вагу
                        style: AppTextStyles.h1.copyWith(
                          color: Theme.of(context).brightness == Brightness.light
                              ? AppColors.black
                              : AppColors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        " кг",
                        style: AppTextStyles.h3.copyWith(
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
            Icon(
              CupertinoIcons.graph_circle,
              color: AppColors.fulvous,
              size: 40.0,
            ),
          ],
        ),
      ),
    );
  }
}
