import 'package:flutter/material.dart';

import '../../models/user.dart';
import '../../services/user_service.dart';
import '../../styles/colors.dart';
import 'login.dart';

class ForgotPasswordScreen extends StatefulWidget {
  @override
  _ForgotPasswordScreenState createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  bool _isLoading = false;
  bool showNewPasswordScreen = false;
  User? currentUser;
  final TextEditingController emailController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController newPasswordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 80),
              _buildLogo(),
              const SizedBox(height: 60),
              if (!showNewPasswordScreen) ...[
                _buildTextField(
                  controller: emailController,
                  labelText: 'Пошта',
                  isPassword: false,
                ),
                const SizedBox(height: 8),
                _buildTextField(
                  controller: phoneController,
                  labelText: 'Номер',
                  isPassword: false,
                ),
                const SizedBox(height: 20),
                _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(AppColors.fulvous),
                    foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
                    padding: MaterialStateProperty.all<EdgeInsets>(
                      EdgeInsets.symmetric(vertical: 12.0, horizontal: 40.0), // Зменшено padding
                    ),
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(4.0),
                      ),
                    ),
                    elevation: MaterialStateProperty.all<double>(10.0),
                  ),
                  onPressed: () async {
                    if(await _validateEmailAndPhone()) {
                      setState(() {
                        showNewPasswordScreen = true;
                      });
                    }
                  },
                  child: const Text('Продовжити'),
                ),
                const SizedBox(height: 8),
                TextButton(
                  style: ButtonStyle(
                    backgroundColor: WidgetStateProperty.all<Color>(AppColors.gray),
                    foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
                    padding: MaterialStateProperty.all<EdgeInsets>(
                      EdgeInsets.symmetric(vertical: 12.0, horizontal: 40.0), // Зменшено padding
                    ),
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(4.0),
                      ),
                    ),
                    elevation: MaterialStateProperty.all<double>(10.0),
                  ),
                  onPressed: () {
                    Navigator.pop(context);
                    Navigator.push(context, MaterialPageRoute(builder: (_) => LoginPage()));
                  },
                  child: const Text('Повернутись'),
                ),
              ] else ...[
                _buildTextField(
                  controller: newPasswordController,
                  labelText: 'Новий пароль',
                  isPassword: true,
                ),
                const SizedBox(height: 8),
                _buildTextField(
                  controller: confirmPasswordController,
                  labelText: 'Підтвердіть пароль',
                  isPassword: true,
                ),
                const SizedBox(height: 20),
                _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(AppColors.fulvous),
                    foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
                    padding: MaterialStateProperty.all<EdgeInsets>(
                      EdgeInsets.symmetric(vertical: 12.0, horizontal: 40.0), // Зменшено padding
                    ),
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(4.0),
                      ),
                    ),
                    elevation: MaterialStateProperty.all<double>(10.0),
                  ),
                  onPressed: () async {
                    if(await _validatePassword()){
                      _showSnackBar("Пароль успішно змінено");
                      Navigator.push(context, MaterialPageRoute(builder: (_) => LoginPage()));
                    };
                  },
                  child: const Text('Відновити'),
                ),
                const SizedBox(height: 8),
                TextButton(
                  style: ButtonStyle(
                    backgroundColor: WidgetStateProperty.all<Color>(AppColors.gray),
                    foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
                    padding: MaterialStateProperty.all<EdgeInsets>(
                      EdgeInsets.symmetric(vertical: 12.0, horizontal: 40.0), // Зменшено padding
                    ),
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(4.0),
                      ),
                    ),
                    elevation: MaterialStateProperty.all<double>(10.0),
                  ),
                  onPressed: () {
                    setState(() {
                      showNewPasswordScreen = false;
                    });
                  },
                  child: const Text('Повернутись'),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  void showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Помилка'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('ОК'),
          ),
        ],
      ),
    );
  }

  Future<bool> _validateEmailAndPhone() async {
    setState(() => _isLoading = true);
    if (emailController.text.isEmpty || phoneController.text.isEmpty) {
      showErrorDialog('Будь ласка, заповніть усі поля.');
      setState(() => _isLoading = false);
      return false;
    }

    if(!await _isUserInSystem(context)){
      showErrorDialog('Не вдалось знайти користувача');
      setState(() => _isLoading = false);
      return false;
    }

    setState(() => _isLoading = false);
    return true;
  }

  Future<bool> _validatePassword() async {
    setState(() => _isLoading = true);
    if (newPasswordController.text.isEmpty || confirmPasswordController.text.isEmpty) {
      showErrorDialog('Будь ласка, заповніть усі поля.');
      setState(() => _isLoading = false);
      return false;
    }

    if (newPasswordController.text.length < 6) {
      showErrorDialog('Пароль має містити не менше 6 символів.');
      setState(() => _isLoading = false);
      return false;
    }
    if (newPasswordController.text != confirmPasswordController.text) {
      showErrorDialog('Паролі не збігаються.');
      setState(() => _isLoading = false);
      return false;
    }


    try {
      if (currentUser != null) {
        final userData = await UserService.updatePassword(currentUser!.id, confirmPasswordController.text);
        if (userData != null) {
          setState(() => _isLoading = false);
          return true;
        } else {
          setState(() => _isLoading = false);
          return false;
        }
      } else {
        setState(() => _isLoading = false);
        showErrorDialog('Користувача не знайдено');
        return false;
      }
    } catch (e) {
      setState(() => _isLoading = false);
      showErrorDialog('Сталася помилка під час оновлення пароля');
      return false;
    }
  }


  Future<bool> _isUserInSystem(BuildContext context) async {
    try {
      final userData = await UserService.getUserByEmail(emailController.text); // Викликаємо метод отримання користувача за електронною поштою
      if (userData != null) {
        User user = User.fromJson(userData);
        currentUser = user;
        if (user.phoneNumber == phoneController.text){
          return true;
        }
        else{
          return false;
        }
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  Widget _buildLogo() {
    return Center(
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Image.asset('lib/assets/images/logo_icon.png', width: 37.16, height: 32),
          const SizedBox(width: 25),
          const Text(
            'FitTrack',
            style: TextStyle(
              color: Color(0xFFE48100),
              fontSize: 32,
              fontFamily: 'Noto Sans',
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String labelText,
    required bool isPassword,
  }) {
    return Container(
      width: double.infinity,
      height: 50,
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light
            ? AppColors.isabelline
            : AppColors.gray,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12),
        child: TextField(
          controller: controller,
          obscureText: isPassword,
          decoration: InputDecoration(
            border: InputBorder.none,
            labelText: labelText,
            labelStyle: const TextStyle(
              color: Color(0xFFB8B8B8),
            ),
          ),
          style: TextStyle(
            color: Theme.of(context).brightness == Brightness.light
                ? Colors.black
                : Colors.white,
            fontSize: 18,
          ),
        ),
      ),
    );
  }
}




