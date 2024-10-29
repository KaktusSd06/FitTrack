import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/user.dart';
import '../providers/AuthProvider.dart';
import '../services/user_service.dart';
import '../styles/colors.dart';

class EditProfile extends StatefulWidget {
  @override
  _EditProfileState createState() => _EditProfileState();
}

class _EditProfileState extends State<EditProfile> with SingleTickerProviderStateMixin {
  final UserService _userService = UserService();
  late TabController _tabController;

  TextEditingController _lastNameController = TextEditingController();
  TextEditingController _firstNameController = TextEditingController();
  TextEditingController _middleNameController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _phoneController = TextEditingController();
  TextEditingController _heightController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();

  bool _isLoading = false; // Loading state

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadUserData();
  }

  Future<void> _loadUserData() async {
    setState(() {
      _isLoading = true;
    });

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    if (authProvider.user != null) {
      try {
        final userData = await UserService.getUserByEmail(authProvider.user!.email!);
        if (userData != null) {
          setState(() {
            _lastNameController.text = userData['lastName'];
            _firstNameController.text = userData['firstName'];
            _middleNameController.text = userData['middleName'] ?? '';
            _emailController.text = userData['email'];
            _phoneController.text = userData['phoneNumber'] ?? '';
            _heightController.text = userData['height'].toString();
          });
        }
      } catch (e) {
        print('Error loading user data: $e');
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _saveBasicInfo() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final userId = authProvider.user!.id;
    final success = await UserService.updateBasicIngo(
      userId,
      _firstNameController.text,
      _lastNameController.text,
      _middleNameController.text,
      int.tryParse(_heightController.text) ?? 0,
    );

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Основну інформацію оновлено')),
      );
    } else {
      // Show an error message
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Помилка оновлення')),
      );
    }
  }

  void _saveProfileInfo() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final userId = authProvider.user!.id; // Assuming you have the user ID

    // Initialize flags to track the success of each update
    bool emailUpdated = false;
    bool phoneUpdated = false;
    bool passwordUpdated = false;

    // Update email
    final emailSuccess = await UserService.updateEmail(userId, _emailController.text);
    if (emailSuccess) {
      emailUpdated = true;
    }

    // Update phone number
    final phoneSuccess = await UserService.updatePhone(userId, _phoneController.text);
    if (phoneSuccess) {
      phoneUpdated = true;
    }

    // Check if the password is provided and update if necessary
    if (_passwordController.text.isNotEmpty) {
      final passwordSuccess = await UserService.updatePassword(userId, _passwordController.text);
      if (passwordSuccess) {
        passwordUpdated = true;
      }
    }

    // Construct the feedback message
    String message = 'Інформацію профілю оновлено';
    if (!emailUpdated || !phoneUpdated || (_passwordController.text.isNotEmpty && !passwordUpdated)) {
      message = 'Помилка оновлення: ';
      if (!emailUpdated) {
        message += 'Не вдалося оновити електронну пошту. ';
      }
      if (!phoneUpdated) {
        message += 'Не вдалося оновити номер телефону. ';
      }
      if (_passwordController.text.isNotEmpty && !passwordUpdated) {
        message += 'Не вдалося оновити пароль.';
      }
    }

    // Show the final feedback message
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Редагувати профіль"),
      ),
      body: _isLoading // Check if loading
          ? Center(child: CircularProgressIndicator()) // Show loading indicator
          : TabBarView(
        controller: _tabController,
        children: [
          _buildBasicInfoTab(),
          _buildProfileTab(),
        ],
      ),
      bottomNavigationBar: TabBar(
        controller: _tabController,
        tabs: [
          Tab(text: "Основна інформація"),
          Tab(text: "Профіль"),
        ],
      ),
    );
  }
  Widget _buildBasicInfoTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          _buildTextField(_lastNameController, 'Прізвище'),
          SizedBox(height: 8),
          _buildTextField(_firstNameController, 'Ім’я'),
          SizedBox(height: 8),
          _buildTextField(_middleNameController, 'По батькові'),
          SizedBox(height: 8),
          _buildTextField(_heightController, 'Ріст'),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: _saveBasicInfo,
            child: Text("Зберегти"),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.fulvous,
              foregroundColor: AppColors.white,
              padding: EdgeInsets.symmetric(horizontal: 36, vertical: 8),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(4),
              ),
              textStyle: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          _buildTextField(_emailController, 'Email'),
          SizedBox(height: 8),
          _buildTextField(_phoneController, 'Номер'),
          SizedBox(height: 8),
          _buildTextField(_passwordController, 'Пароль'),
          SizedBox(height: 16),
          ElevatedButton(
            onPressed: _saveProfileInfo,
            child: Text("Зберегти"),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.fulvous,
              foregroundColor: AppColors.white,
              padding: EdgeInsets.symmetric(horizontal: 36, vertical: 8),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(4),
              ),
              textStyle: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTextField(TextEditingController controller, String labelText) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light
            ? AppColors.isabelline
            : AppColors.gray,
        borderRadius: BorderRadius.circular(4),
      ),
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
          labelText: labelText,
          border: InputBorder.none,
          contentPadding: EdgeInsets.all(12.0),
        ),
        style: TextStyle(
          color: Theme.of(context).brightness == Brightness.light
              ? AppColors.black
              : AppColors.white,
          fontSize: 12,
        ),
      ),
    );
  }
}
