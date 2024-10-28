import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:fittrack_mobile_app/widgets/product_widgets.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../widgets/membership_widgets.dart';
import '../widgets/services_widgets.dart';

class ShopScreen extends StatelessWidget {
  const ShopScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Align(
          alignment: Alignment.topCenter,
          child: Container(
            padding: const EdgeInsets.only(left: 16, right: 16, top: 16),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("Абонименти",
                    style: AppTextStyles.h2.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.black
                          : AppColors.white,
                    ),),

                    Icon(
                      CupertinoIcons.chevron_down,
                      color: AppColors.fulvous,
                      size: 24.0,
                    ),
                  ],
                ),

                SizedBox(height: 8),

                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      MembershipWidgets(),
                      SizedBox(width: 8),
                      MembershipWidgets(),
                      SizedBox(width: 8),
                      MembershipWidgets(),
                      SizedBox(width: 8),
                      MembershipWidgets(),
                      SizedBox(width: 8),
                      MembershipWidgets(),
                      SizedBox(width: 8),
                    ],
                  ),
                ),

                SizedBox(height: 24),

                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("Послуги",
                      style: AppTextStyles.h2.copyWith(
                        color: Theme.of(context).brightness == Brightness.light
                            ? AppColors.black
                            : AppColors.white,
                      ),),

                    Icon(
                      CupertinoIcons.chevron_down,
                      color: AppColors.fulvous,
                      size: 24.0,
                    ),
                  ],
                ),

                SizedBox(height: 8),

                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      ServicesWidgets(),
                      SizedBox(width: 8),
                      ServicesWidgets(),
                      SizedBox(width: 8),
                      ServicesWidgets(),
                      SizedBox(width: 8),
                      ServicesWidgets(),
                      SizedBox(width: 8),
                      ServicesWidgets(),
                      SizedBox(width: 8),
                    ],
                  ),
                ),

                SizedBox(height: 24),

                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("Товари",
                      style: AppTextStyles.h2.copyWith(
                        color: Theme.of(context).brightness == Brightness.light
                            ? AppColors.black
                            : AppColors.white,
                      ),),

                    Icon(
                      CupertinoIcons.chevron_down,
                      color: AppColors.fulvous,
                      size: 24.0,
                    ),
                  ],
                ),

                SizedBox(height: 8),

                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      ProductWidgets(),
                      SizedBox(width: 8),
                      ProductWidgets(),
                      SizedBox(width: 8),
                      ProductWidgets(),
                      SizedBox(width: 8),
                      ProductWidgets(),
                      SizedBox(width: 8),
                      ProductWidgets(),
                      SizedBox(width: 8),
                    ],
                  ),
                ),

              ],
            ),
      )
    );
  }
}
