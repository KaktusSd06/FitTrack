import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:flutter/services.dart';

class MembershipWidgets extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light
            ? AppColors.isabelline
            : AppColors.gray,
        borderRadius:  BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Гостьовий візит",
          style: AppTextStyles.h3.copyWith(
            color: Theme.of(context).brightness == Brightness.light
                ? AppColors.black
                : AppColors.white,
          ),),

          SizedBox(height: 2),

          Text("Одноразовий вхід",
            style: AppTextStyles.h4.copyWith(
              color: Theme.of(context).brightness == Brightness.light
                  ? AppColors.black
                  : AppColors.white,
            ),),

          SizedBox(height: 16),

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

                  Text("250", style: AppTextStyles.h2.copyWith(
                    color: Theme.of(context).brightness == Brightness.light
                        ? AppColors.jet
                        : AppColors.white,
                  ),)
                ],
              ),

              SizedBox(width: 60),

              Container(
                padding: const EdgeInsets.symmetric(vertical: 4.5, horizontal: 8),
                decoration: BoxDecoration(
                  color: AppColors.fulvous,
                  borderRadius:  BorderRadius.circular(4),
                ),


                child: Row(
                  children: [
                    Icon(
                      CupertinoIcons.cart,
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.white
                          : AppColors.white,
                      size: 16.0,
                    ),

                    SizedBox(width: 4),

                    Text("Придбати",
                      style: AppTextStyles.h4.copyWith(
                        color: Theme.of(context).brightness == Brightness.light
                            ? AppColors.white
                            : AppColors.white,
                        fontWeight: FontWeight.bold,
                      ),),
                  ],
                )



              )
            ],
          )
        ],
      ),
    );
  }
}
