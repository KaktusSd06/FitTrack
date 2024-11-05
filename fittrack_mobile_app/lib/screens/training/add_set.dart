import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../styles/colors.dart';
import '../../styles/fonts.dart';
import 'package:http/http.dart' as http;

class AddSetPage extends StatefulWidget {
  final String exerciseName;
  final String exerciseId;
  final int individualTrainingId;
  final String userId;
  final DateTime date;

  const AddSetPage({
    Key? key,
    required this.exerciseName,
    required this.exerciseId,
    required this.individualTrainingId,
    required this.userId,
    required this.date,
  }) : super(key: key);

  @override
  _AddSetPageState createState() => _AddSetPageState();
}

class _AddSetPageState extends State<AddSetPage> {
  final TextEditingController weightController = TextEditingController();
  final TextEditingController repetitionsController = TextEditingController();
  bool _isLoading = false;

  Future<void> _addSet() async {
    final weight = weightController.text;
    final repetitions = repetitionsController.text;

    if (weight.isEmpty || repetitions.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Будь ласка, заповніть усі поля.')),
      );
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {

      final formattedDate = widget.date.toUtc().toIso8601String();


      if (widget.individualTrainingId == 0) {
        final payload = {
          'userId': widget.userId,
          'description': "Особисте тренування",
          'date': formattedDate,
        };

        final response = await http.post(
          Uri.parse('https://fittrackapidev.onrender.com/api/IndividualTrainings'),
          headers: {
            'Content-Type': 'application/json',
          },
          body: json.encode(payload),
        );

        if (response.statusCode != 201) {
          print('Failed to add set. Status code: ${response.statusCode}');
          print('Response body: ${response.body}');
        }
      }

      String userId = widget.userId;

      final trainingResponse = await http.get(
        Uri.parse(
          'https://fittrackapidev.onrender.com/api/IndividualTrainings/get-by-userId-and-period/$userId/$formattedDate/$formattedDate',
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      ).timeout(const Duration(seconds: 60));

      if (trainingResponse.statusCode != 200) {
        print('Failed to add set. Status code: ${trainingResponse.statusCode}');
        print('Response body: ${trainingResponse.body}');
      }

      final trainingData = json.decode(trainingResponse.body);
      if (trainingData == null || trainingData.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Training data not found. Please check the date and user ID.')),
        );
        setState(() {
          _isLoading = false;
        });
        return;
      }
      final trainingId = trainingData[0]['id'];

      final payload = {
        'weight': double.tryParse(weight),
        'reps': int.tryParse(repetitions),
        'exerciseId': int.tryParse(widget.exerciseId),
        'individualTrainingId': trainingId,
      };

      final response = await http.post(
        Uri.parse('https://fittrackapidev.onrender.com/api/Sets'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode(payload),
      );

      if (response.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Підхід додано для ${widget.exerciseName}')),
        );
        weightController.clear();
        repetitionsController.clear();
        Navigator.pop(context);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Не вдалося додати підхід. Спробуйте ще раз.')),
        );
        print('Failed to add set. Status code: ${response.statusCode}');
        print('Response body: ${response.body}');
      }
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Добавити підхід',
          style: AppTextStyles.h1.copyWith(
            color: Theme.of(context).brightness == Brightness.light
                ? AppColors.gray
                : AppColors.white,
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
            Text(widget.exerciseName, style: AppTextStyles.h2),
            const SizedBox(height: 16.0),
            _buildTextField(weightController, 'Вага (кг)', TextInputType.number, context),
            const SizedBox(height: 16.0),
            _buildTextField(repetitionsController, 'Кількість повторів', TextInputType.number, context),
            const SizedBox(height: 24.0),
            Center(
              child: _isLoading
                  ? CircularProgressIndicator() // Show loading indicator while waiting
                  : ElevatedButton(
                onPressed: _addSet,
                child: Text(
                  'Додати підхід',
                  style: AppTextStyles.h2.copyWith(
                    color: AppColors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
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
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField(TextEditingController controller, String labelText, TextInputType keyboardType, BuildContext context) {
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
}
