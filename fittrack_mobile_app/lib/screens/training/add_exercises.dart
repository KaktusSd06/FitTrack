import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../services/exercise_service.dart'; // Make sure the path is correct
import '../../styles/colors.dart';
import '../../styles/fonts.dart';

class AddExercisePage extends StatefulWidget {
  @override
  _AddExercisePageState createState() => _AddExercisePageState();
}

class _AddExercisePageState extends State<AddExercisePage> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final ExerciseService _exerciseService = ExerciseService();
  bool isLoading = false; // State for loading indicator

  @override
  Widget build(BuildContext context) {
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
          "Додати вправу",
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
            _buildTextField(_nameController, "Введіть назву вправи", TextInputType.text),
            SizedBox(height: 16),
            Text(
              "Опис",
              style: AppTextStyles.h2.copyWith(
                fontWeight: FontWeight.bold,
                color: Theme.of(context).brightness == Brightness.light
                    ? AppColors.gray
                    : AppColors.white,
              ),
            ),
            SizedBox(height: 8),
            _buildTextField(_descriptionController, "Введіть опис вправи", TextInputType.text),
            SizedBox(height: 24),
            Center(
              child: isLoading
                  ? CircularProgressIndicator() // Show loading indicator
                  : ElevatedButton(
                onPressed: () async {
                  setState(() => isLoading = true); // Set loading state

                  final name = _nameController.text;
                  final description = _descriptionController.text;

                  if (name.isNotEmpty && description.isNotEmpty) {
                    final success = await _exerciseService.addExercises(name, description);

                    if (success) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Вправу додано успішно!')),
                      );
                      Navigator.pop(context);
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Не вдалося додати вправу. Спробуйте ще раз.')),
                      );
                    }
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Будь ласка, заповніть всі поля коректно.')),
                    );
                  }
                  setState(() => isLoading = false); // Stop loading indicator
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
