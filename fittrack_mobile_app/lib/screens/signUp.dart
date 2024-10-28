import 'dart:async';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../providers/AuthProvider.dart';
import '../services/ApiService.dart';
import '../services/user_service.dart';
import '../styles/colors.dart';
import '../styles/fonts.dart';
import '../widgets/button_with_text.dart';
import '../widgets/button_with_text_icon.dart';
import 'homepage.dart';
import 'logInPage.dart';

class SignupStepOne extends StatefulWidget {
  @override
  _SignupStepOneState createState() => _SignupStepOneState();
}

class _SignupStepOneState extends State<SignupStepOne> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();
  final TextEditingController phoneNumberController = TextEditingController();
  bool _isLoading = false;

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const SizedBox(height: 80),
                    _buildLogo(),
                    const SizedBox(height: 60),
                    _buildTextField(controller: emailController, label: 'Пошта', keyboardType: TextInputType.emailAddress, context: context),
                    _buildTextField(controller: phoneNumberController, label: 'Номер телефону', keyboardType: TextInputType.phone, context: context),
                    _buildTextField(controller: passwordController, label: 'Пароль', obscureText: true, context: context),
                    _buildTextField(controller: confirmPasswordController, label: 'Підтвердити пароль', obscureText: true, context: context),
                    const SizedBox(height: 20),
                    _isLoading
                        ? Center(child: CircularProgressIndicator())
                        : ButtonWithText(
                      text: "Продовжити",
                      onPressed: () => _handleContinue(context),
                    ),
                    const SizedBox(height: 4),
                    ButtonWithTextIcon(
                      text: "Продовжити з Google",
                      iconPath: 'lib/assets/images/googleIcon.png',
                      onPressed: () => print("Продовжити через Google натиснуто"),
                    ),
                  ],
                ),
              ),
            ),
            _buildLoginPrompt(context),
          ],
        ),
      ),
    );
  }

  void _handleContinue(BuildContext context) {
    if (_validateStepOne()) {
      Navigator.push(context, MaterialPageRoute(builder: (_) => SignupStepTwo(
        email: emailController.text,
        password: passwordController.text,
        phoneNumber: phoneNumberController.text,
      )));
    }
  }

  bool _validateStepOne() {
    if (emailController.text.isEmpty || passwordController.text.isEmpty ||
        confirmPasswordController.text.isEmpty || phoneNumberController.text.isEmpty) {
      showErrorDialog('Будь ласка, заповніть усі поля.');
      return false;
    }
    if (passwordController.text.length < 6) {
      showErrorDialog('Пароль має містити не менше 6 символів.');
      return false;
    }
    if (passwordController.text != confirmPasswordController.text) {
      showErrorDialog('Паролі не збігаються.');
      return false;
    }
    return true;
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    bool obscureText = false,
    TextInputType keyboardType = TextInputType.text,
    required BuildContext context,
  }) {
    return Container(
      width: 351,
      height: 50,
      padding: EdgeInsets.only(left: 12),
      margin: EdgeInsets.symmetric(vertical: 4.0),
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light
            ? AppColors.isabelline
            : AppColors.gray,
        borderRadius: BorderRadius.circular(4),
      ),
      child: TextField(
        controller: controller,
        obscureText: obscureText,
        keyboardType: keyboardType,
        decoration: InputDecoration(
          border: InputBorder.none,
          labelText: label,
          labelStyle: const TextStyle(
            color: Color(0xFFB8B8B8),
          ),
        ),
      ),
    );
  }

  Widget _buildLogo() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Image.asset('lib/assets/images/logo_icon.png', width: 37, height: 32),
        const SizedBox(width: 25),
        const Text('FitTrack', style: TextStyle(color: Color(0xFFE48100), fontSize: 32, fontFamily: 'Noto Sans', fontWeight: FontWeight.w600)),
      ],
    );
  }

  Widget _buildLoginPrompt(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: 36.0),
      child: TextButton(
        onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => LoginPage())),
        child: const Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Вже зареєстровані? ', style: AppTextStyles.h3_gray),
            Text('Увійти', style: AppTextStyles.h3_fulvous),
          ],
        ),
      ),
    );
  }
}

class SignupStepTwo extends StatefulWidget {
  final String email;
  final String password;
  final String phoneNumber;

  SignupStepTwo({required this.email, required this.password, required this.phoneNumber});

  @override
  _SignupStepTwoState createState() => _SignupStepTwoState();
}

class _SignupStepTwoState extends State<SignupStepTwo> {
  final TextEditingController lastNameController = TextEditingController();
  final TextEditingController firstNameController = TextEditingController();
  final TextEditingController middleNameController = TextEditingController();
  final TextEditingController dateOfBirthController = TextEditingController();
  final TextEditingController heightController = TextEditingController();
  final TextEditingController weightController = TextEditingController();
  bool _isLoading = false;

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

  void _selectDateOfBirth() async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    if (pickedDate != null) {
      dateOfBirthController.text = DateFormat("dd.MM.yyyy").format(pickedDate);
    }
  }

  Widget _buildLogo() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Image.asset('lib/assets/images/logo_icon.png', width: 37, height: 32),
        const SizedBox(width: 25),
        const Text('FitTrack', style: TextStyle(color: Color(0xFFE48100), fontSize: 32, fontFamily: 'Noto Sans', fontWeight: FontWeight.w600)),
      ],
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

                padding: const EdgeInsets.all(16.0), // Overall padding for consistency
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const SizedBox(height: 80),
                    _buildLogo(),
                    const SizedBox(height: 60),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 0.0),
                      child: Column(
                        children: [
                          _buildTextField(controller: lastNameController, label: 'Прізвище', context: context),
                          Row(
                            children: [
                              Expanded(
                                child: _buildTextField(controller: firstNameController, label: 'Ім\'я', context: context),
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: _buildTextField(controller: middleNameController, label: 'По батькові', context: context),
                              ),
                            ],
                          ),
                          // Row(
                          //   children: [
                          //     Expanded(
                          //       child: _buildTextField(controller: heightController, label: 'Ріст (см)', keyboardType: TextInputType.number, context: context),
                          //     ),
                          //     const SizedBox(width: 8),
                          //     Expanded(
                          //       child: _buildTextField(controller: weightController, label: 'Вага (кг)', keyboardType: TextInputType.number, context: context),
                          //     ),
                          //   ],
                          // ),
                          GestureDetector(
                            onTap: _selectDateOfBirth,
                            child: AbsorbPointer(
                              child: _buildTextField(controller: dateOfBirthController, label: 'Дата народження (ДД.ММ.РРРР)', context: context),
                            ),
                          ),
                          const SizedBox(height: 20),
                        ],
                      ),
                    ),
                    // Button to go back to previous step
                    // Registration button
                    _isLoading
                        ? const Center(child: CircularProgressIndicator())
                        : ButtonWithText(
                      text: "Зареєструватись",
                      onPressed: () => _handleRegister(),
                    ),

                    const SizedBox(height: 8),


                    ElevatedButton(
                      onPressed: () => Navigator.pop(context),
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
                      child: const Text(
                        "До попереднього кроку",
                        style: AppTextStyles.h2,
                        textAlign: TextAlign.center, // Вирівнювання тексту
                        overflow: TextOverflow.ellipsis, // Текст в одну лінію і додається "..."
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }


  void _handleRegister() async {
    if (_validateStepTwo()) {
      setState(() => _isLoading = true);

      try {
        final parsedDateOfBirth = DateFormat("dd.MM.yyyy").parse(dateOfBirthController.text, true);
        int success = await UserService.registerUser(
          email: widget.email,
          password: widget.password,
          firstName: firstNameController.text,
          lastName: lastNameController.text,
          middleName: middleNameController.text,
          dateOfBirth: parsedDateOfBirth,
          phoneNumber: widget.phoneNumber,
          confirmedPassword: widget.password,
        );

        if (success == 201) {
          _showSuccessDialog();
        } else if (success == 400) {
          showErrorDialog('Користувач з такою поштою або номером телефону вже існує');
        } else if (success == 500) {
          showErrorDialog('Вибачте :(\nЗдається у нас виникли проблеми,\nСпробуйте, будь ласка, пізніше');
        } else {
          showErrorDialog('Не вдалося завершити реєстрацію. Спробуйте знову.');
        }
      } finally {
        setState(() => _isLoading = false);
      }
    }
  }

  void _showSuccessDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Реєстрація успішна"),
          content: Text("Ви успішно зареєстровані!\nУвійдіть в систему щоб продовжити"),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => LoginPage()),
                );
              },
              child: Text("OK"),
            ),
          ],
        );
      },
    );
  }


  bool _validateStepTwo() {
    if (lastNameController.text.isEmpty || firstNameController.text.isEmpty ||
        middleNameController.text.isEmpty || dateOfBirthController.text.isEmpty) {
      showErrorDialog('Будь ласка, заповніть усі поля.');
      return false;
    }
    return true;
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    bool obscureText = false,
    TextInputType keyboardType = TextInputType.text,
    required BuildContext context,
  }) {
    return Container(
      width: 380,
      height: 50,
      padding: EdgeInsets.only(left: 12),
      margin: EdgeInsets.symmetric(vertical: 4.0),
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light
            ? AppColors.isabelline
            : AppColors.gray,
        borderRadius: BorderRadius.circular(4),
      ),
      child: TextField(
        controller: controller,
        obscureText: obscureText,
        keyboardType: keyboardType,
        decoration: InputDecoration(
          border: InputBorder.none,
          labelText: label,
          labelStyle: const TextStyle(
            color: Color(0xFFB8B8B8),
          ),
        ),
      ),
    );
  }

}
