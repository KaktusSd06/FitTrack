import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../services/exercise_service.dart';
import '../../styles/colors.dart';
import '../../styles/fonts.dart';
import '../../widgets/exercises.dart';
import 'add_exercises.dart';
import 'add_set.dart';

class ExercisePage extends StatefulWidget {
  final int individualTrainingId;
  final String userId;
  final DateTime selectedDate;
  final VoidCallback onExerciseAdded; // Callback parameter

  const ExercisePage({Key? key, required this.individualTrainingId, required this.userId, required this.selectedDate, required this.onExerciseAdded}) : super(key: key);

  @override
  _ExercisePageState createState() => _ExercisePageState();
}

class _ExercisePageState extends State<ExercisePage> {
  final TextEditingController searchController = TextEditingController();
  List<Map<String, dynamic>> exercises = [];
  List<Map<String, dynamic>> filteredExercises = [];

  @override
  void initState() {
    super.initState();
    _fetchExercises();
    searchController.addListener(_filterExercises);
  }

  @override
  void dispose() {
    searchController.removeListener(_filterExercises);
    searchController.dispose();
    super.dispose();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _fetchExercises();
  }

  Future<void> _fetchExercises() async {
    final fetchedExercises = await ExerciseService.getAllExercises();
    setState(() {
      exercises = fetchedExercises;
      filteredExercises = fetchedExercises; // Initialize filtered list with all exercises
    });
  }

  void _filterExercises() {
    final query = searchController.text.toLowerCase();
    setState(() {
      filteredExercises = exercises.where((exercise) {
        final nameLower = exercise['name'].toLowerCase();
        return nameLower.contains(query);
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
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
                  ? AppColors.gray
                  : AppColors.white,
            ),
            onPressed: () {
              widget.onExerciseAdded();
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
          children: [
            // Search field
            _buildTextField(searchController, 'Пошук', TextInputType.text, context),
            const SizedBox(height: 16.0),
            // Exercises list
            Expanded(
              child: FutureBuilder<List<Map<String, dynamic>>>( // You can remove this FutureBuilder if using _fetchExercises
                future: ExerciseService.getAllExercises(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    return Center(child: Text('Error: ${snapshot.error}'));
                  } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    return Center(child: Text('No exercises found.'));
                  }

                  return SingleChildScrollView(
                    child: Column(
                      children: filteredExercises.map((exercise) {
                        return Row(
                          children: [
                            Expanded(
                              child: GestureDetector(
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => AddSetPage(
                                        exerciseName: exercise['name'],
                                        exerciseId: exercise['id'].toString(),
                                        individualTrainingId: widget.individualTrainingId,
                                        userId: widget.userId,
                                        date: widget.selectedDate,
                                      ),
                                    ),
                                  ).then((_) {
                                    // Refresh the exercises when returning from AddSetPage
                                    _fetchExercises();
                                  });
                                },
                                child: ExerciseDetailWidget(
                                  exerciseName: exercise['name'],
                                  description: exercise['description'],
                                ),
                              ),
                            ),
                          ],
                        );
                      }).toList(),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
      // Floating action button
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(context, MaterialPageRoute(builder: (context) => AddExercisePage())).then((_) {
            // Refresh the exercises when returning from AddExercisePage
            _fetchExercises();
          });
        },
        child: Icon(Icons.add),
        backgroundColor: AppColors.fulvous,
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
          suffixIcon: Icon(Icons.search, color: AppColors.fulvous), // Search icon
        ),
      ),
    );
  }
}
