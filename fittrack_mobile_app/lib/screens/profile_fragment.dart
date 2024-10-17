import 'package:fittrack_mobile_app/screens/editProfile.dart';
import 'package:fittrack_mobile_app/screens/logInPage.dart';
import 'package:url_launcher/url_launcher.dart';


import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/User.dart';
import '../services/user_service.dart';
import '../styles/colors.dart';
import '../styles/fonts.dart';
import '../theme/theme_provider.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<User>(
      future: UserService().getUser(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return const Center(child: Text('Error fetching user data'));
        } else if (snapshot.hasData) {
          User user = snapshot.data!;
          return Align(
            alignment: Alignment.topCenter,
            child: Container(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Ваш код для відображення інформації про профіль
                  Container(
                    child: Row(
                      children: [
                        Container(
                          margin: const EdgeInsets.only(right: 7),
                          width: 100,
                          height: 100,
                          child: ClipOval(
                            child: Image.asset(
                              'lib/assets/images/person_default.png',
                              width: 100,
                              height: 100,
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              user.lastName ?? 'Відсутнє прізвище',
                              style: AppTextStyles.h2,
                            ),
                            const SizedBox(height: 2),
                            Row(
                              children: [
                                Text(
                                  user.firstName ?? "Відсутнє Ім'я",
                                  style: AppTextStyles.h3,
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  user.middleName ?? "",
                                  style: AppTextStyles.h3,
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Блок абонементу
                  Container(
                    padding: const EdgeInsets.all(16.0),
                    decoration: BoxDecoration(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.isabelline
                          : AppColors.gray,
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: Row(
                      children: [
                        const Icon(
                          CupertinoIcons.doc_plaintext,
                          color: AppColors.fulvous,
                          size: 24.0,
                        ),
                        const SizedBox(width: 8.0),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              if (user.membershipId == null)
                                Text(
                                  "Абонемент відсутній",
                                  style: AppTextStyles.h3.copyWith(
                                    color: Theme.of(context).brightness == Brightness.light
                                        ? AppColors.gray
                                        : AppColors.isabelline,
                                  ),
                                )
                              else ...[
                                Text(
                                  "Ваш абонемент: ${user.membershipId}",
                                  style: AppTextStyles.h3.copyWith(
                                    color: Theme.of(context).brightness == Brightness.light
                                        ? AppColors.gray
                                        : AppColors.isabelline,
                                  ),
                                ),
                                SizedBox(height: 4),
                                Text(
                                  "Активний до: ${user.membershipId}",
                                  style: AppTextStyles.h3.copyWith(
                                    color: Theme.of(context).brightness == Brightness.light
                                        ? AppColors.gray
                                        : AppColors.isabelline,
                                  ),
                                ),
                              ],
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // // Випадаючий список для теми
                  // Container(
                  //   padding: const EdgeInsets.only(top: 10, bottom: 5, left: 16, right: 16),
                  //   child: Row(
                  //     mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  //     children: [
                  //       const Row(
                  //         children: [
                  //           Icon(
                  //             CupertinoIcons.circle_lefthalf_fill,
                  //             color: AppColors.fulvous,
                  //             size: 24.0,
                  //           ),
                  //           SizedBox(width: 8.0),
                  //           Text(
                  //             "Тема застосунку",
                  //             style: AppTextStyles.h2,
                  //           ),
                  //         ],
                  //       ),
                  //       // Обгортаємо DropdownButton в Align
                  //       Container(
                  //         width: 100,
                  //         child: Align(
                  //           alignment: Alignment.centerRight, // Вирівнювання праворуч
                  //           child: DropdownButton<String>(
                  //             value: _selectedTheme,
                  //             onChanged: (String? newValue) {
                  //               setState(() {
                  //                 _selectedTheme = newValue!;
                  //                 if (_selectedTheme == "Системна") {
                  //                 }
                  //                 if (_selectedTheme == "Темна" || _selectedTheme == "Світла") {
                  //                   Provider.of<ThemeProvider>(context, listen:false).toggleTheme();
                  //                 }
                  //               });
                  //             },
                  //             isExpanded: true, // Дозволяє розширити DropdownButton на всю ширину контейнера
                  //             items: <String>['Світла', 'Темна', 'Системна']
                  //                 .map<DropdownMenuItem<String>>((String value) {
                  //               return DropdownMenuItem<String>(
                  //                 value: value,
                  //                 child: Text(value),
                  //               );
                  //             }).toList(),
                  //           ),
                  //         ),
                  //       ),
                  //     ],
                  //   ),
                  // ),

                  // Блоки для редагування профілю та інших дій
                  GestureDetector(
                    onTap: () {
                      Provider.of<ThemeProvider>(context, listen: false).toggleTheme();
                    },
                    child: Container(
                      padding: const EdgeInsets.only(top: 10, bottom: 10, left: 16, right: 16),
                      // decoration: BoxDecoration(
                      //   border: Border.all(color: AppColors.fulvous),
                      //   borderRadius: BorderRadius.circular(8.0),
                      // ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Icon(
                                CupertinoIcons.circle_lefthalf_fill,
                                color: AppColors.fulvous,
                                size: 24.0,
                              ),
                              SizedBox(width: 8.0),
                              Text(
                                "Тема застосунку",
                                style: AppTextStyles.h2,
                              ),
                            ],
                          ),
                          Icon(
                            CupertinoIcons.arrow_right_arrow_left,
                            color: AppColors.fulvous,
                            size: 24.0,
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 8), //

                  // Блоки для редагування профілю та інших дій
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => EditProfile()), // Перехід до другого екрану
                      );
                    },
                    child: Container(
                      padding: const EdgeInsets.only(top: 10, bottom: 10, left: 16, right: 16),
                      // decoration: BoxDecoration(
                      //   border: Border.all(color: AppColors.fulvous),
                      //   borderRadius: BorderRadius.circular(8.0),
                      // ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Icon(
                                CupertinoIcons.pen,
                                color: AppColors.fulvous,
                                size: 24.0,
                              ),
                              SizedBox(width: 8.0),
                              Text(
                                "Редагувати профіль",
                                style: AppTextStyles.h2,
                              ),
                            ],
                          ),
                          Icon(
                            CupertinoIcons.forward,
                            color: AppColors.fulvous,
                            size: 24.0,
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 8), // Відступ між блоками

                  GestureDetector(
                    onTap: () async {
                      final Uri emailUri = Uri(
                        scheme: 'mailto',
                        path: 'stepanukdima524@gmail.com', // Вкажіть email
                        queryParameters: {
                          'Зворотній зв\'язок': '',
                        },
                      );
                      if (await canLaunchUrl(emailUri)) {
                        await launchUrl(emailUri);
                      } else {
                        // Можна обробити ситуацію, якщо не вдалося відкрити поштовий клієнт
                        print('Не вдалося запустити поштовий клієнт');
                      }
                    },
                    child: Container(
                      padding: const EdgeInsets.only(top: 10, bottom: 10, left: 16, right: 16),
                      // decoration: BoxDecoration(
                      //   border: Border.all(color: AppColors.fulvous),
                      //   borderRadius: BorderRadius.circular(8.0),
                      // ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Icon(
                                CupertinoIcons.chat_bubble_2_fill,
                                color: AppColors.fulvous,
                                size: 24.0,
                              ),
                              SizedBox(width: 8.0),
                              Text(
                                "Зв'язатись з нами",
                                style: AppTextStyles.h2,
                              ),
                            ],
                          ),
                          Icon(
                            CupertinoIcons.forward,
                            color: AppColors.fulvous,
                            size: 24.0,
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 8), // Відступ між блоками

                  GestureDetector(
                    onTap: () {
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16.0),
                            ),
                            title: Text(
                              "Вийти з застосунку",
                              style: AppTextStyles.h3.copyWith(
                                  fontWeight: FontWeight.bold,
                              ),
                            ),
                            content: const Text(
                              "Ви впевнені, що бажаєте вийти?",
                              style: AppTextStyles.h2,
                            ),
                            actionsPadding: const EdgeInsets.only(bottom: 16.0, right: 16.0),
                            actions: <Widget>[
                              TextButton(
                                onPressed: () {
                                  Navigator.of(context).pop();
                                },
                                child: const Text(
                                  "Залишитись",
                                  style: AppTextStyles.h2,
                                ),
                              ),
                              ElevatedButton(
                                onPressed: () {
                                  Navigator.of(context).pop(); // Закриває діалог
                                  Navigator.pop(context);
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(builder: (context) => LoginPage()), // Перехід до екрану входу
                                  );
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: AppColors.fulvous, // Колір кнопки "Вийти"
                                  padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(8.0),
                                  ),
                                ),
                                child: Text(
                                  "Вийти",
                                  style: AppTextStyles.h2.copyWith(
                                    color: Theme.of(context).brightness == Brightness.light
                                        ? AppColors.white
                                        : AppColors.white,
                                  ),
                                ),
                              ),
                            ],
                          );
                        },
                      );
                    },

                    child: Container(
                      padding: const EdgeInsets.only(top: 10, bottom: 10, left: 16, right: 16),
                      // decoration: BoxDecoration(
                      //   border: Border.all(color: AppColors.fulvous),
                      //   borderRadius: BorderRadius.circular(8.0),
                      // ),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Icon(
                                CupertinoIcons.power,
                                color: AppColors.fulvous,
                                size: 24.0,
                              ),
                              SizedBox(width: 8.0),
                              Text(
                                "Вийти з застосунку",
                                style: AppTextStyles.h2,
                              ),
                            ],
                          ),
                          Icon(
                            CupertinoIcons.forward,
                            color: AppColors.fulvous,
                            size: 24.0,
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        } else {
          return const Center(child: Text('No user data available'));
        }
      },
    );
  }
}
