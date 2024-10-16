import 'package:fittrack_mobile_app/screens/homepage.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/widgets/button_with_text.dart';
import 'package:fittrack_mobile_app/widgets/button_with_text_icon.dart';

import '../styles/colors.dart';
import '../styles/fonts.dart';
import '../screens/signUp.dart';


class LoginPage extends StatelessWidget {
  void onClick() {
    print("Увійти натиснуто");
  }

  void navigateToSignupPage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => Signup()), // Перехід до другого екрану
    );
  }

  void navigateToHomePage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => HomePage()), // Перехід до другого екрану
    );
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween, // Вирівнювання між верхом та низом
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Логотип та назва
                Center(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 80.0, bottom: 60.0),
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
                ),

                // Поле для введення e-mail
                Container(
                  width: 351,
                  height: 50,
                  decoration: BoxDecoration(
                    color: AppColors.isabelline,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 12),
                    child: TextField(
                      decoration: InputDecoration(
                        labelText: 'Номер телефону або E-mail',
                        labelStyle: AppTextStyles.h2_silver,
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
                    color: AppColors.isabelline,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 12),
                    child: TextField(
                      decoration: InputDecoration(
                        labelText: 'Пароль',
                        labelStyle: AppTextStyles.h2_silver,
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
                          text: 'Забули пароль? ', // Текст без зміни стилю
                          style: AppTextStyles.h3_gray,
                        ),
                        TextSpan(
                          text: 'Увійти', // Текст з іншим стилем
                          style: AppTextStyles.h3_fulvous,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Підпис внизу екрана
          Padding(
            padding: const EdgeInsets.only(bottom: 36.0),
            child: Center(
              child: TextButton(
                onPressed: () {
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

    );

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Center(
                  child: Padding(padding: const EdgeInsets.only(top: 80.0, bottom: 60.0),
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
                      Text(
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
                ),
                SizedBox(height: 20),
                Container(
                  width: 351,
                  height: 50,
                  decoration: BoxDecoration(
                    color: AppColors.isabelline,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 12),
                    child: TextField(
                      decoration: InputDecoration(
                        labelText: 'E-mail',
                        labelStyle: AppTextStyles.h2_silver,
                        border: InputBorder.none,
                      ),
                      style: TextStyle(
                        color: AppColors.jet, // Колір тексту
                        fontSize: 18,
                      ),
                    ),
                  ),
                )
,
                SizedBox(height: 8),
                Container(
                  width: 351,
                  height: 50,
                  decoration: BoxDecoration(
                    color: AppColors.isabelline,
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 12),
                    child: TextField(
                      decoration: InputDecoration(
                        labelText: 'Пароль',
                        labelStyle: AppTextStyles.h2_silver,
                        border: InputBorder.none,
                      ),
                      style: TextStyle(
                        color: AppColors.jet, // Колір тексту
                        fontSize: 18,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                ButtonWithText(
                  text: "Увійти",
                  onPressed: onClick,
                ),
                SizedBox(height: 8),

                ButtonWithTextIcon(
                  text: "Увійти з Google",
                  iconPath: 'lib/assets/images/googleIcon.png',
                  onPressed: onClick,
                ),

                SizedBox(height: 10),
                TextButton(
                  onPressed: () {
                    // Логіка відновлення пароля
                  },
                    child: RichText(
                      text: const TextSpan(
                        children: [
                          TextSpan(
                            text: 'Забули пароль? ', // Текст без зміни стилю
                            style: AppTextStyles.h3_gray,
                          ),
                          TextSpan(
                            text: 'Увійти', // Текст з іншим стилем
                            style: AppTextStyles.h3_fulvous,
                          ),
                        ],
                      ),
                    ),
                ),
                SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.only(bottom: 0),
                  alignment: Alignment.bottomCenter,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      TextButton(
                        onPressed: () {
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
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
