import 'package:fittrack_mobile_app/screens/Authorization/forgot_password.dart';
import 'package:flutter/material.dart';
import 'package:fittrack_mobile_app/widgets/button_with_text.dart';
import 'package:fittrack_mobile_app/widgets/button_with_text_icon.dart';
import 'package:provider/provider.dart';
import '../../models/user.dart';
import '../../providers/AuthProvider.dart';
import '../../services/user_service.dart';
import '../../styles/colors.dart';
import '../../styles/fonts.dart';
import 'signin.dart';
import '../home_page.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool isLoading = false;

  void navigateToSignupPage(BuildContext context) {
    Navigator.of(context).pop();
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SignupStepOne()),
    );
  }

  void navigateToHomePage(BuildContext context) {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => HomePage()),
    );
  }

  void showErrorDialog(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Помилка'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('ОК'),
          ),
        ],
      ),
    );
  }

  Future<bool> _onWillPop() async {
    return (await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Підтвердження'),
        content: const Text('Ви дійсно хочете вийти з застосунку?'),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Ні'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Так'),
          ),
        ],
      ),
    )) ??
        false;
  }

  bool _validateInputs(BuildContext context) {
    if (emailController.text.isEmpty || passwordController.text.isEmpty) {
      showErrorDialog(context, 'Будь ласка, заповніть усі поля.');
      return false;
    }
    return true;
  }

  Future<void> handleLogin(BuildContext context) async {
    if (_validateInputs(context)) {
      setState(() {
        isLoading = true;
      });

      final loginResult = await UserService.loginUser(
        email: emailController.text,
        password: passwordController.text,
      );

      setState(() {
        isLoading = false;
      });

      if (loginResult['status'] == 200) {
        final authProvider = Provider.of<AuthProvider>(context, listen: false);
        authProvider.loginWithUserData(User.fromJson(loginResult['user']));
        navigateToHomePage(context);
      } else {
        showErrorDialog(context, loginResult['message']);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    return WillPopScope(
      onWillPop: _onWillPop,
      child: Scaffold(
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
                        const SizedBox(height: 80),
                        _buildLogo(),
                        const SizedBox(height: 60),
                        _buildTextField(
                          controller: emailController,
                          labelText: 'E-mail',
                          isPassword: false,
                          context: context,
                        ),
                        const SizedBox(height: 8),
                        _buildTextField(
                          controller: passwordController,
                          labelText: 'Пароль',
                          isPassword: true,
                          context: context,
                        ),
                        const SizedBox(height: 20),
                        isLoading
                            ? Center(child: CircularProgressIndicator())
                            : ButtonWithText(
                          text: "Увійти",
                          onPressed: () => handleLogin(context),
                        ),

                        const SizedBox(height: 20),
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => ForgotPasswordScreen()),
                            );
                          },
                          child: const Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                'Забули пароль?  ',
                                style: AppTextStyles.h3_gray,
                              ),
                              Text(
                                'Відновити',
                                style: AppTextStyles.h3_fulvous,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
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
        ),
      ),
    );
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
    required BuildContext context,
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
            labelText: labelText,
            labelStyle: AppTextStyles.h2.copyWith(
              color: Theme.of(context).brightness == Brightness.light
                  ? AppColors.silver
                  : AppColors.silver,
            ),
            border: InputBorder.none,
          ),
          style: TextStyle(
            color: Theme.of(context).brightness == Brightness.light
                ? AppColors.jet
                : AppColors.white,
            fontSize: 18,
          ),
        ),
      ),
    );
  }
}
