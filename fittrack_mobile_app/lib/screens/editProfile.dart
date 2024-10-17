import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import '../styles/colors.dart';
import '../styles/fonts.dart';
import '../services/user_service.dart';

class EditProfile extends StatefulWidget {
  @override
  _EditProfileState createState() => _EditProfileState();
}

class _EditProfileState extends State<EditProfile> {
  final UserService _userService = UserService();

  TextEditingController _lastNameController = TextEditingController();
  TextEditingController _firstNameController = TextEditingController();
  TextEditingController _middleNameController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _phoneController = TextEditingController();
  TextEditingController _heightController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  void _loadUserData() async {
    var user = await _userService.getUser();
    if (user != null) {
      setState(() {
        _lastNameController.text = user.lastName!;
        _firstNameController.text = user.firstName!;
        _middleNameController.text = user.middleName!;
        _emailController.text = user.email;
        _phoneController.text = user.phoneNumber;
        _heightController.text = user.height.toString();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Редагувати профіль",
          style: AppTextStyles.h1_f,
        ),
        centerTitle: false,
        leading: Padding(
          padding: const EdgeInsets.only(left: 16.0),
          child: IconButton(
            icon: const Icon(
              CupertinoIcons.back,
              color: AppColors.fulvous,
            ),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
        backgroundColor: Theme.of(context).colorScheme.surface,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Align(
          alignment: Alignment.topCenter,
          child: Container(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildLabel(context, "Прізвище"),
                        _buildLabel(context, "Ім’я"),
                        _buildLabel(context, "По батькові"),
                        _buildLabel(context, "Email"),
                        _buildLabel(context, "Номер"),
                        _buildLabel(context, "Ріст"),
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildTextField(_lastNameController, 'Прізвище'),
                        SizedBox(height: 8),
                        _buildTextField(_firstNameController, 'Ім’я'),
                        SizedBox(height: 8),
                        _buildTextField(_middleNameController, 'По батькові'),
                        SizedBox(height: 8),
                        _buildTextField(_emailController, 'Email'),
                        SizedBox(height: 8),
                        _buildTextField(_phoneController, 'Номер'),
                        SizedBox(height: 8),
                        _buildTextField(_heightController, 'Ріст'),
                      ],
                    ),
                  ],
                ),
                SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.only(top: 8, bottom: 8, left: 16, right: 16),
                  decoration: BoxDecoration(
                    color: AppColors.fulvous,
                    borderRadius: BorderRadius.circular(4.0),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Row(
                        children: [
                          Icon(
                            CupertinoIcons.doc_checkmark,
                            color: Theme.of(context).brightness == Brightness.light
                                ? AppColors.white
                                : AppColors.black,
                            size: 24.0,
                          ),
                          SizedBox(width: 8.0),
                          Text(
                            "Зерегти",
                            style: AppTextStyles.h2.copyWith(
                              color: Theme.of(context).brightness == Brightness.light
                                  ? AppColors.white
                                  : AppColors.black,
                            ),
                          ),
                        ],
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

  Widget _buildLabel(BuildContext context, String label) {
    return Container(
      margin: EdgeInsets.only(bottom: 8.0),
      child: Padding(
        padding: const EdgeInsets.only(top: 14, bottom: 14),
        child: Text(
          label,
          style: AppTextStyles.h3.copyWith(
            color: Theme.of(context).brightness == Brightness.light
                ? AppColors.black
                : AppColors.white,
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(TextEditingController controller, String labelText) {
    return Container(
      width: 250,
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light
            ? AppColors.isabelline
            : AppColors.gray,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Padding(
        padding: const EdgeInsets.only(left: 12),
        child: TextField(
          controller: controller,
          decoration: InputDecoration(
            labelText: labelText,
            labelStyle: AppTextStyles.h4.copyWith(
              color: Theme.of(context).brightness == Brightness.light
                  ? AppColors.jet
                  : AppColors.silver,
            ),
            border: InputBorder.none,
          ),
          style: TextStyle(
            color: Theme.of(context).brightness == Brightness.light
                ? AppColors.black
                : AppColors.white,
            fontSize: 12,
          ),
        ),
      ),
    );
  }
}
