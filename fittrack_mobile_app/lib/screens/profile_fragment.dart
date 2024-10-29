import 'package:fittrack_mobile_app/screens/editProfile.dart';
import 'package:fittrack_mobile_app/screens/logInPage.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/user.dart';
import '../providers/AuthProvider.dart';
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

  void _deleteAccount() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    try {
      final result = await UserService.deleteUser(authProvider.user!.id!);
      authProvider.logout();
      if(result) {
        _showSnackBar("Акаунт успішно видалено.");
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => LoginPage()),
        );
      }
      else{
        _showSnackBar("Сталася помилка при видаленні акаунту");
      }
    } catch (e) {
      _showSnackBar("Сталася помилка при видаленні акаунту: $e");
    }
  }

  Future<User?> _fetchUser() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    // Перевірка на null для authProvider.user
    if (authProvider.user != null) {
      String email = authProvider.user!.email!;

      try {
        final userData = await UserService.getUserByEmail(email); // Викликаємо метод отримання користувача за електронною поштою
        if (userData != null) {
          return User.fromJson(userData); // Перетворюємо JSON на об'єкт User
        } else {
          _showSnackBar("Користувача не знайдено за цією електронною поштою.");
          return null; // Якщо користувача не знайдено, повертаємо null
        }
      } catch (e) {
        _showSnackBar("Сталася помилка при отриманні даних користувача: $e");
        return null; // У випадку помилки повертаємо null
      }
    } else {
      // Обробка ситуації, коли користувач не аутентифікований
      _showSnackBar("Користувач не аутентифікований.");
      return null;
    }
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        duration: const Duration(seconds: 3),
      ),
    );
  }




  @override
  Widget build(BuildContext context) {
    return FutureBuilder<User?>(
      future: _fetchUser(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return const Center(child: Text('Error fetching user data'));
        } else if (snapshot.hasData && snapshot.data != null) {
          User user = snapshot.data!;
          return _buildProfileContent(user);
        } else {
          return const Center(child: Text('No user data available'));
        }
      },
    );
  }

  Widget _buildProfileContent(User user) {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    return Align(
      alignment: Alignment.topCenter,
      child: Container(
        padding: const EdgeInsets.only(left: 16, right: 16, top: 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            _buildUserInfo(user),
            const SizedBox(height: 16),
            _buildMembershipBlock(user),
            const SizedBox(height: 16),
            _buildActionBlock(
              icon: CupertinoIcons.circle_lefthalf_fill,
              text: "Тема застосунку",
              onTap: () {
                Provider.of<ThemeProvider>(context, listen: false).toggleTheme();
              },
            ),
            const SizedBox(height: 8),
            _buildActionBlock(
              icon: CupertinoIcons.pen,
              text: "Редагувати профіль",
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => EditProfile()));
              },
            ),
            const SizedBox(height: 8),
            _buildActionBlock(
              icon: CupertinoIcons.chat_bubble_2_fill,
              text: "Зв'язатись з нами",
              onTap: () => _sendEmail(),
            ),
            const SizedBox(height: 8),
            _buildActionBlock(
              icon: CupertinoIcons.power,
              text: "Вийти з застосунку",
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
                            authProvider.logout();
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
            ),

            const SizedBox(height: 8),
            _buildActionBlock(
              icon: CupertinoIcons.trash,
              text: "Видалити профіль",
              onTap: () {
                showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16.0),
                      ),
                      title: Text(
                        "Видалити профіль",
                        style: AppTextStyles.h3.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      content: const Text(
                        "Ви впевнені, що бажаєте видалити профіль?",
                        style: AppTextStyles.h2,
                      ),
                      actionsPadding: const EdgeInsets.only(bottom: 16.0, right: 16.0),
                      actions: <Widget>[
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          child: const Text(
                            "Залишити",
                            style: AppTextStyles.h2,
                          ),
                        ),
                        ElevatedButton(
                          onPressed: () {
                            Navigator.of(context).pop(); // Close the dialog
                            _deleteAccount(); // Proceed to delete the account
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.fulvous, // Колір кнопки "Вийти"
                            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                          ),
                          child: Text(
                            "Видалити",
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
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildUserInfo(User user) {
    return Row(
      children: [
        Container(
          margin: const EdgeInsets.only(right: 7),
          width: 100,
          height: 100,
          child: ClipOval(
            child: Image.asset(
              'lib/assets/images/person_default.png',
              fit: BoxFit.cover,
            ),
          ),
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(user.lastName ?? 'Відсутнє прізвище', style: AppTextStyles.h2),
            const SizedBox(height: 2),
            Row(
              children: [
                Text(user.firstName ?? "Відсутнє Ім'я", style: AppTextStyles.h3),
                const SizedBox(width: 4),
                Text(user.middleName ?? "", style: AppTextStyles.h3),
              ],
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildMembershipBlock(User user) {
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
                if (user.membership == null)
                  Text("Абонемент відсутній", style: AppTextStyles.h3.copyWith(color: Theme.of(context).brightness == Brightness.light
                      ? AppColors.gray
                      : AppColors.isabelline))
                else ...[
                  Text("Ваш абонемент: ${user.membership?.id.toString() ?? 'Невідомо'}", style: AppTextStyles.h3.copyWith(color: Theme.of(context).brightness == Brightness.light
                      ? AppColors.gray
                      : AppColors.isabelline)),
                  const SizedBox(height: 4),
                  Text("Активний до: ${user.membership?.expirationDate ?? 'Невідомо'}", style: AppTextStyles.h3.copyWith(color: Theme.of(context).brightness == Brightness.light
                      ? AppColors.gray
                      : AppColors.isabelline)),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionBlock({required IconData icon, required String text, required Function onTap}) {
    return GestureDetector(
      onTap: () => onTap(),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Icon(icon, color: AppColors.fulvous, size: 24.0),
                const SizedBox(width: 8.0),
                Text(text, style: AppTextStyles.h2),
              ],
            ),
            Icon(CupertinoIcons.forward, color: AppColors.fulvous, size: 24.0),
          ],
        ),
      ),
    );
  }

  void _sendEmail() async {
    final Uri emailUri = Uri(
      scheme: 'mailto',
      path: 'stepanukdima524@gmail.com',
      queryParameters: {'subject': 'Зворотній зв\'язок'},
    );
    if (await canLaunchUrl(emailUri)) {
      await launchUrl(emailUri);
    } else {
      print('Не вдалося запустити поштовий клієнт');
    }
  }
}
