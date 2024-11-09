import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/styles/colors.dart';
import 'package:fittrack_mobile_app/styles/fonts.dart';
import 'package:pay/pay.dart';

import '../../widgets/payment_config.dart';

class ServiceConfirmationPage extends StatelessWidget {
  final String serviceName;
  final String serviceDescription;
  final double servicePrice;

  ServiceConfirmationPage({
    super.key,
    required this.serviceName,
    required this.serviceDescription,
    required this.servicePrice,
  });

  var googlePayButton = GooglePayButton(
    paymentConfiguration: PaymentConfiguration.fromJsonString(defaultGooglePay),
    paymentItems: const [
      PaymentItem(
        label: "title",
        amount: "0.01",
        status: PaymentItemStatus.final_price,
      )
    ],
    height: 200   ,
    width: double.infinity,
    type: GooglePayButtonType.pay,
    margin: const EdgeInsets.only(top: 15),
    onPaymentResult: (result) {
      print('Payment Result: $result');
    },
    onPressed: () {
      print('Google Pay button clicked');
    },
    loadingIndicator: const Center(child: CircularProgressIndicator()),
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: googlePayButton,),
    );
  }
}
