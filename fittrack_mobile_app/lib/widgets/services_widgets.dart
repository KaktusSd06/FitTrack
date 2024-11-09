import 'package:fittrack_mobile_app/services/purchase_service.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:provider/provider.dart';
import '../providers/AuthProvider.dart';
import 'payment_config.dart';
import 'package:pay/pay.dart';

class ServicesWidget extends StatelessWidget {
  final int id;
  final String title;
  final String description;
  final double price;

  ServicesWidget({
    Key? key,
    required this.title,
    required this.description,
    required this.price, required this.id,
  }) : super(key: key);

  // Show service confirmation dialog with Google Pay button
  void _showServiceConfirmationDialog(BuildContext context, String serviceName, String serviceDescription, double servicePrice, String userId) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          contentPadding: const EdgeInsets.all(16),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Service Name
              Text(
                serviceName,
                style: AppTextStyles.h1.copyWith(
                  color: Theme.of(context).brightness == Brightness.light ? AppColors.jet : AppColors.white,
                ),
              ),
              const SizedBox(height: 8),

              // Service Description
              Text(
                serviceDescription,
                style: AppTextStyles.h4.copyWith(
                  color: Theme.of(context).brightness == Brightness.light ? AppColors.jet : AppColors.white,
                ),
              ),
              const SizedBox(height: 12),

              // Price
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Ціна',
                    style: TextStyle(fontSize: 18, color: AppColors.jet),
                  ),
                  Text(
                    '₴${servicePrice.toStringAsFixed(2)}',
                    style: AppTextStyles.h2.copyWith(color: AppColors.fulvous),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Google Pay Button
              GooglePayButton(
                paymentConfiguration: PaymentConfiguration.fromJsonString(defaultGooglePay),
                paymentItems: [
                  PaymentItem(
                    label: title,
                    amount: servicePrice.toStringAsFixed(2),
                    status: PaymentItemStatus.final_price,
                  )
                ],
                width: double.infinity,
                type: GooglePayButtonType.pay,
                margin: const EdgeInsets.only(top: 4),
                onPaymentResult: (result) async {
                  print('Payment Result: $result');
                  if (result.isNotEmpty) {
                    bool isServiceAdded = await PurchaseService.addPurchase(id, 1, userId) as bool;

                    if (isServiceAdded) {
                      // Show success message
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Послуга успішно оплочена')),
                      );
                    } else {
                      // Show error message
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Помилка покупки')),
                      );
                    }
                  }

                  Navigator.of(context).pop();
                },
                onPressed: () {
                  print('Google Pay button clicked');
                },
                loadingIndicator: const Center(child: CircularProgressIndicator()),
              ),
            ],
          ),
        );
      },
    );
  }

  void onPaySucces(){

  }

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
                    '₴${price.toStringAsFixed(2)}', // Corrected price formatting
                    style: AppTextStyles.h2.copyWith(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.jet
                          : AppColors.white,
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 60),

              // "Придбати" button, now clickable
              GestureDetector(
                onTap: () {
                  _showServiceConfirmationDialog(
                    context,
                    title,
                    description,
                    price,
                    authProvider.user!.id,
                  );
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 4.5, horizontal: 8),
                  decoration: BoxDecoration(
                    color: AppColors.fulvous,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        CupertinoIcons.cart,
                        color: AppColors.white,
                        size: 16.0,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        "Придбати",
                        style: AppTextStyles.h4.copyWith(
                          color: AppColors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
