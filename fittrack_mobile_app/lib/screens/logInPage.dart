import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/widgets/button_with_text.dart';
import 'package:fittrack_mobile_app/widgets/button_with_text_icon.dart';
import '../styles/colors.dart';
import '../styles/fonts.dart';
import '../screens/signUp.dart';
import '../screens/homepage.dart';

class LoginPage extends StatelessWidget {
  void navigateToSignupPage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => Signup()), // Перехід до другого екрану
    );
  }

  void navigateToHomePage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => HomePage()), // Перехід до головної сторінки
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      SizedBox(height: 80),
                      Center(
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Image.asset(
                              'lib/assets/images/logo_icon.png',
                              width: 37.16,
                              height: 32,
                            ),
                            const SizedBox(width: 25),
                            const Text(
                              'FitTrack',
                              style: TextStyle(
                                color: Color(0xFFE48100),
                                fontSize: 32,
                                fontFamily: 'Noto Sans',
                                fontWeight: FontWeight.w600,
                                height: 0,
                              ),
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: 60),
                      // Поле для введення e-mail
                      Container(
                        width: 351,
                        height: 50,
                        decoration: BoxDecoration(
                          color: Theme.of(context).brightness == Brightness.light
                              ? AppColors.isabelline
                              : AppColors.gray,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Padding(
                          padding: EdgeInsets.symmetric(horizontal: 12),
                          child: TextField(
                            decoration: InputDecoration(
                              labelText: 'Номер телефону або E-mail',
                              labelStyle: AppTextStyles.h2.copyWith(
                                color: Theme.of(context).brightness == Brightness.light
                                    ? AppColors.silver
                                    : AppColors.silver,
                              ),
                              border: InputBorder.none,
                            ),
                            style: TextStyle(
                              color: AppColors.jet, // Колір тексту
                              fontSize: 18,
                            ),
                          ),
                        ),
                      ),
                      SizedBox(height: 8),
                      // Поле для введення паролю
                      Container(
                        width: 351,
                        height: 50,
                        decoration: BoxDecoration(
                          color: Theme.of(context).brightness == Brightness.light
                              ? AppColors.isabelline
                              : AppColors.gray,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Padding(
                          padding: EdgeInsets.symmetric(horizontal: 12),
                          child: TextField(
                            decoration: InputDecoration(
                              labelText: 'Пароль',
                              labelStyle: AppTextStyles.h2.copyWith(
                                color: Theme.of(context).brightness == Brightness.light
                                    ? AppColors.silver
                                    : AppColors.silver,
                              ),
                              border: InputBorder.none,
                            ),
                            style: TextStyle(
                              color: AppColors.jet, // Колір тексту
                              fontSize: 18,
                            ),
                            obscureText: true, // Пароль приховано
                          ),
                        ),
                      ),
                      SizedBox(height: 20),
                      // Кнопка реєстрації
                      ButtonWithText(
                        text: "Увійти",
                        onPressed: () {
                          Navigator.pop(context);
                          navigateToHomePage(context);
                        },
                      ),
                      SizedBox(height: 8),
                      // Кнопка для входу через Google
                      ButtonWithTextIcon(
                        text: "Увійти з Google",
                        iconPath: 'lib/assets/images/googleIcon.png',
                        onPressed: () {
                          print("Увійти через Google натиснуто");
                        },
                      ),
                      SizedBox(height: 20),
                      TextButton(
                        onPressed: () {
                          // Логіка відновлення пароля
                        },
                        child: RichText(
                          text: const TextSpan(
                            children: [
                              TextSpan(
                                text: 'Забули пароль? ',
                                style: AppTextStyles.h3_gray,
                              ),
                              TextSpan(
                                text: 'Увійти',
                                style: AppTextStyles.h3_fulvous,
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            // Spacer for pushing the bottom text down
            Padding(
              padding: const EdgeInsets.only(bottom: 36.0),
              child: Center(
                child: TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                    navigateToSignupPage(context);
                  },
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Не зареєстровані? ',
                        style: AppTextStyles.h3_gray,
                      ),
                      Text(
                        'Зареєструватись',
                        style: AppTextStyles.h3_fulvous,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
