import 'package:fittrack_mobile_app/models/user.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/meal.dart';
import '../../providers/AuthProvider.dart';
import '../../services/meals_service.dart';
import '../../styles/colors.dart';
import '../../styles/fonts.dart';

class AddMealPage extends StatefulWidget {
  @override
  _AddMealPageState createState() => _AddMealPageState();
}

class _AddMealPageState extends State<AddMealPage> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _caloriesController = TextEditingController();
  final MealsService _mealsService = MealsService();
  bool isLoading = false; // Додаємо стан завантаження

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    Widget _buildTextField(TextEditingController controller, String labelText, TextInputType keyboardType) {
      return Container(
        decoration: BoxDecoration(
          color: Theme.of(context).brightness == Brightness.light
              ? AppColors.isabelline
              : AppColors.gray,
          borderRadius: BorderRadius.circular(4),
        ),
        child: TextFormField(
          keyboardType: keyboardType,
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

    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Додати страву",
          style: AppTextStyles.h1.copyWith(
            color: Theme.of(context).brightness == Brightness.light
                ? AppColors.gray
                : AppColors.white,
          ),
        ),
        centerTitle: false,
        leading: Padding(
          padding: const EdgeInsets.only(left: 16.0),
          child: IconButton(
            icon: Icon(
              CupertinoIcons.back,
              color: Theme.of(context).brightness == Brightness.light
                  ? AppColors.black
                  : AppColors.white,
            ),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
        backgroundColor: Theme.of(context).colorScheme.surface,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Назва",
              style: AppTextStyles.h2.copyWith(
                fontWeight: FontWeight.bold,
                color: Theme.of(context).brightness == Brightness.light
                    ? AppColors.gray
                    : AppColors.white,
              ),
            ),
            SizedBox(height: 8),
            _buildTextField(_nameController, "Введіть назву страви", TextInputType.text),
            SizedBox(height: 16),
            Text(
              "Калорійність",
              style: AppTextStyles.h2.copyWith(
                fontWeight: FontWeight.bold,
                color: Theme.of(context).brightness == Brightness.light
                    ? AppColors.gray
                    : AppColors.white,
              ),
            ),
            SizedBox(height: 8),
            _buildTextField(_caloriesController, "Введіть калорійність (ккал)", TextInputType.number),
            SizedBox(height: 24),
            Center(
              child: isLoading
                  ? CircularProgressIndicator() // Показуємо індикатор завантаження
                  : ElevatedButton(
                onPressed: () async {
                  setState(() => isLoading = true); // Встановлюємо стан завантаження

                  final name = _nameController.text;
                  final calories = double.tryParse(_caloriesController.text) ?? 0;

                  if (name.isNotEmpty && calories > 0) {
                    final success = await _mealsService.addMeal(name, calories, authProvider.user!.id);

                    if (success) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Страва додана успішно!')),
                      );
                      Navigator.pop(context);
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Не вдалося додати страву. Спробуйте ще раз.')),
                      );
                    }
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Будь ласка, заповніть всі поля коректно.')),
                    );
                  }
                  setState(() => isLoading = false); // Зупиняємо індикатор завантаження
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(
                    vertical: 12.0,
                    horizontal: 32.0,
                  ),
                  backgroundColor: AppColors.fulvous,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
                child: Text(
                  "Додати",
                  style: AppTextStyles.h2.copyWith(
                    color: AppColors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
