import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:flutter/services.dart';

class GroupTrainingWidgets extends StatelessWidget {
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
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "19:00",
                    style: AppTextStyles.h2.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.black
                          : AppColors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8),
                  const Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "55 хв",
                        style: AppTextStyles.h3,
                      ),
                    ],
                  ),
                ],
              ),

              SizedBox(width: 36),

              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Hiit Workout",
                    style: AppTextStyles.h2.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.black
                          : AppColors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8),
                  const Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "Зал №1",
                        style: AppTextStyles.h3,
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  const Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        "Агнет Папірович",
                        style: AppTextStyles.h3,
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),

          Container(
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
        ],
      )
    );
    // return Container(
    //   padding: const EdgeInsets.all(16),
    //   width: double.infinity,
    //   decoration: BoxDecoration(
    //     color: Theme.of(context).brightness == Brightness.light
    //         ? AppColors.isabelline
    //         : AppColors.gray,
    //     borderRadius: BorderRadius.circular(8),
    //   ),
    //   child: Row(
    //     crossAxisAlignment: CrossAxisAlignment.center,
    //     mainAxisAlignment: MainAxisAlignment.spaceAround,
    //     children: [
    //       Expanded(child: Row(
    //       crossAxisAlignment: CrossAxisAlignment.start,
    //         children: [
    //           Expanded(
    //             child: Column(
    //               crossAxisAlignment: CrossAxisAlignment.start,
    //               children: [
    //                 Text(
    //                   "19:00",
    //                   style: AppTextStyles.h2.copyWith(
    //                     color: Theme.of(context).brightness == Brightness.light
    //                         ? AppColors.black
    //                         : AppColors.white,
    //                     fontWeight: FontWeight.bold,
    //                   ),
    //                 ),
    //                 SizedBox(height: 8),
    //                 Row(
    //                   crossAxisAlignment: CrossAxisAlignment.center,
    //                   children: [
    //                     Text(
    //                       "55 хв",
    //                       style: AppTextStyles.h3,
    //                     ),
    //                   ],
    //                 ),
    //               ],
    //             ),
    //           ),
    //
    //           Expanded(
    //             child: Column(
    //               crossAxisAlignment: CrossAxisAlignment.start,
    //               children: [
    //                 Text(
    //                   "Hiit Workout",
    //                   style: AppTextStyles.h2.copyWith(
    //                     color: Theme.of(context).brightness == Brightness.light
    //                         ? AppColors.black
    //                         : AppColors.white,
    //                     fontWeight: FontWeight.bold,
    //                   ),
    //                 ),
    //                 SizedBox(height: 8),
    //                 const Row(
    //                   crossAxisAlignment: CrossAxisAlignment.center,
    //                   children: [
    //                     Text(
    //                       "Зал №1",
    //                       style: AppTextStyles.h3,
    //                     ),
    //                   ],
    //                 ),
    //                 SizedBox(height: 8),
    //                 const Row(
    //                   crossAxisAlignment: CrossAxisAlignment.center,
    //                   children: [
    //                     Text(
    //                       "Агнет Папірович",
    //                       style: AppTextStyles.h3,
    //                     ),
    //                   ],
    //                 ),
    //               ],
    //             ),
    //           ),
    //       ],)),
    //
    //       Container(
    //         padding: const EdgeInsets.all(8),
    //         decoration: ShapeDecoration(
    //           color: Color(0xFFE48100),
    //           shape: RoundedRectangleBorder(
    //             borderRadius: BorderRadius.circular(50),
    //           ),
    //         ),
    //         child:           Icon(
    //           CupertinoIcons.phone,
    //           color: Theme.of(context).brightness == Brightness.light
    //                   ? AppColors.white
    //                   : AppColors.jet,
    //           size: 24.0,
    //         ),
    //       ),
    //     ],
    //   ),
    // );
  }
}
