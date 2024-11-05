import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/user.dart';
import '../../providers/AuthProvider.dart';
import '../../services/user_service.dart';
import '../../styles/colors.dart';
import '../../styles/fonts.dart';

class EditProfile extends StatefulWidget {
  @override
  _EditProfileState createState() => _EditProfileState();
}

class _EditProfileState extends State<EditProfile> with SingleTickerProviderStateMixin {
  final UserService _userService = UserService();
  late TabController _tabController;

  User? user;
  TextEditingController _lastNameController = TextEditingController();
  TextEditingController _firstNameController = TextEditingController();
  TextEditingController _middleNameController = TextEditingController();
  TextEditingController _emailController = TextEditingController();
  TextEditingController _phoneController = TextEditingController();
  TextEditingController _heightController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();

  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
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
          user = User.fromJson(userData);
          setState(() {
            _lastNameController.text = userData['lastName'];
            _firstNameController.text = userData['firstName'];
            _middleNameController.text = userData['middleName'] ?? '';
            _emailController.text = userData['email'];
            _phoneController.text = userData['phoneNumber'] ?? '';
            _heightController.text = userData['height']?.toString() ?? '';
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

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(success ? 'Основну інформацію оновлено' : 'Помилка оновлення')),
    );
  }

  void _saveProfileInfo() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final userId = authProvider.user!.id;

    bool emailUpdated = await UserService.updateEmail(userId, _emailController.text);
    bool phoneUpdated = await UserService.updatePhone(userId, _phoneController.text);
    bool passwordUpdated = _passwordController.text.isNotEmpty
        ? await UserService.updatePassword(userId, _passwordController.text)
        : true;

    String message = emailUpdated && phoneUpdated && passwordUpdated
        ? 'Інформацію профілю оновлено'
        : 'Помилка оновлення: ${!emailUpdated ? 'Email ' : ''}${!phoneUpdated ? 'Phone ' : ''}${!passwordUpdated ? 'Password ' : ''}';

    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Редагувати профіль")),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : TabBarView(
        controller: _tabController,
        children: [
          _buildBasicInfoTab(),
          _buildProfileTab(),
          _buildAdditionalTab(),
        ],
      ),
      bottomNavigationBar: TabBar(
        controller: _tabController,
        tabs: [
          Tab(text: "Основне"),
          Tab(text: "Профіль"),
          Tab(text: "Додатково"),
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
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
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
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAdditionalTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildInfoRow(Icons.home, "Зал", actionIcon: Icons.edit),
          SizedBox(height: 8),
          _buildMembershipInfo(),
          SizedBox(height: 8),
          _buildTrainerInfo(),
        ],
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, {IconData? actionIcon}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Row(
        children: [
          Icon(icon, color: AppColors.fulvous, size: 24.0),
          SizedBox(width: 8.0),
          Text(label,
            style: AppTextStyles.h3.copyWith(color: Theme.of(context).brightness == Brightness.light
              ? AppColors.jet
              : AppColors.white,
            fontWeight: FontWeight.bold),
          ),
          Spacer(),
          if (actionIcon != null)
            Icon(actionIcon, color: AppColors.fulvous, size: 24.0),
        ],
      ),
    );
  }

  Widget _buildMembershipInfo() {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light ? AppColors.isabelline : AppColors.gray,
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Row(
        children: [
          Icon(CupertinoIcons.doc_plaintext, color: AppColors.fulvous, size: 24.0),
          SizedBox(width: 8.0),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  user?.membership == null ? "Абонемент відсутній" : "Ваш абонемент: ${user?.membership?.id}",
                  style: AppTextStyles.h3.copyWith(
                    color: Theme.of(context).brightness == Brightness.light
                        ? AppColors.jet
                        : AppColors.white,
                  ),
                ),
                SizedBox(height: 4),
                if (user?.membership != null)
                  Text("Активний до: ${user?.membership?.expirationDate}", style: AppTextStyles.h3.copyWith(
                    color: Theme.of(context).brightness == Brightness.light
                        ? AppColors.jet
                        : AppColors.white,
                  )),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTrainerInfo() {
    return Container(
      padding: const EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Theme.of(context).brightness == Brightness.light ? AppColors.isabelline : AppColors.gray,
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Row(
        children: [
          Icon(CupertinoIcons.doc_plaintext, color: AppColors.fulvous, size: 24.0),
          SizedBox(width: 8.0),
          Expanded(
            child: Text("Ваш тренер: ${user?.trainer?.lastName ?? 'Тренер не закріплений'}", style: AppTextStyles.h3.copyWith(
              color: Theme.of(context).brightness == Brightness.light
                ? AppColors.jet
                : AppColors.white,)),
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
      child: TextFormField(
        controller: controller,
        style: TextStyle(fontSize: 14),
        decoration: InputDecoration(
          labelText: labelText,
          border: InputBorder.none,
          contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        ),
      ),
    );
  }
}
