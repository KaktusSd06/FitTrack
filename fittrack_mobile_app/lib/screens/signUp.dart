import 'package:fittrack_mobile_app/screens/logInPage.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/widgets/button_with_text.dart';
import 'package:fittrack_mobile_app/widgets/button_with_text_icon.dart';
import '../styles/colors.dart';
import '../styles/fonts.dart';

class Signup extends StatelessWidget {

  void navigateToLogInPage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => LoginPage()), // Перехід до другого екрану
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
                        labelText: 'Підтвердіть пароль',
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
                  text: "Зареєструватися",
                  onPressed: () {
                    print("Зареєструватися натиснуто");
                  },
                ),

                SizedBox(height: 8),

                // Кнопка для входу через Google
                ButtonWithTextIcon(
                  text: "Зареєструватись з Google",
                  iconPath: 'lib/assets/images/googleIcon.png',
                  onPressed: () {
                    print("Зареєструватися через Google натиснуто");
                  },
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
                  navigateToLogInPage(context); 
                },
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Вже зареєстровані? ',
                      style: AppTextStyles.h3_gray,
                    ),
                    Text(
                      'Увійти',
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
  }
}
