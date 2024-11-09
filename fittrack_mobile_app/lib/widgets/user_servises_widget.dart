import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:provider/provider.dart';
import '../providers/AuthProvider.dart';

class UserServicesWidget extends StatelessWidget {
  final int id;
  final String title;
  final String description;
  final double price;
  final DateTime purchaseDate;

  UserServicesWidget({
    Key? key,
    required this.title,
    required this.description,
    required this.price,
    required this.id,
    required this.purchaseDate,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light
            ? AppColors.isabelline
            : AppColors.gray,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Service title
          Text(
            title,
            style: AppTextStyles.h3.copyWith(
              color: Theme.of(context).brightness == Brightness.light
                  ? AppColors.black
                  : AppColors.white,
            ),
          ),
          const SizedBox(height: 2),

          // Service description
          Text(
            description,
            style: AppTextStyles.h4.copyWith(
              color: Theme.of(context).brightness == Brightness.light
                  ? AppColors.black
                  : AppColors.white,
            ),
          ),
          const SizedBox(height: 16),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(
                    CupertinoIcons.money_dollar,
                    color: AppColors.fulvous,
                    size: 20.0,
                  ),
                  // Service price
                  Text(
                    '₴${price.toStringAsFixed(2)}',
                    style: AppTextStyles.h2.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.jet
                          : AppColors.white,
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 60),

              // Display Purchase Date
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    "Дата покупки:",
                    style: AppTextStyles.h4.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.jet
                          : AppColors.white,
                    ),
                  ),
                  Text(
                    '${purchaseDate.toLocal().toString().split(' ')[0]}', // yyyy-mm-dd format
                    style: AppTextStyles.h5.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.jet
                          : AppColors.white,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
