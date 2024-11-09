import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../styles/colors.dart';
import '../styles/fonts.dart';

class MembershipBlock extends StatelessWidget {
  final String? membershipName;
  final int? durationInMonths;
  final int? sessions;

  const MembershipBlock({
    Key? key,
    this.membershipName,
    this.durationInMonths,
    this.sessions,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light
            ? AppColors.isabelline
            : AppColors.gray,
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Row(
        children: [
          const Icon(CupertinoIcons.doc_plaintext, color: AppColors.fulvous, size: 24.0),
          const SizedBox(width: 8.0),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  membershipName ?? "Абонемент відсутній",
                  style: AppTextStyles.h3.copyWith(
                    color: Theme.of(context).brightness == Brightness.light
                        ? AppColors.jet
                        : AppColors.white,
                  ),
                ),
                const SizedBox(height: 4),
                if (membershipName != null) ...[
                  if (durationInMonths != null)
                    Text(
                      "Термін дії (місяців): $durationInMonths",
                      style: AppTextStyles.h3.copyWith(
                        color: Theme.of(context).brightness == Brightness.light
                            ? AppColors.jet
                            : AppColors.white,
                      ),
                    )
                  else if (sessions != null)
                    Text(
                      "Кількість сесій: $sessions",
                      style: AppTextStyles.h3.copyWith(
                        color: Theme.of(context).brightness == Brightness.light
                            ? AppColors.jet
                            : AppColors.white,
                      ),
                    ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}
