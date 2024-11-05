import 'package:fittrack_mobile_app/screens/training/add_exercises_to_training.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:provider/provider.dart';
import '../../models/set_for_training.dart';
import '../../providers/AuthProvider.dart';
import '../../services/set_service.dart';
import '../../styles/colors.dart';
import '../../styles/fonts.dart';
import '../../widgets/exercise_in_training.dart';
import 'package:fittrack_mobile_app/models/set.dart';

class TrainingScreen extends StatefulWidget {
  const TrainingScreen({Key? key}) : super(key: key);

  @override
  _TrainingScreenState createState() => _TrainingScreenState();
}

class _TrainingScreenState extends State<TrainingScreen> with AutomaticKeepAliveClientMixin, WidgetsBindingObserver {
  DateTime selectedDate = DateTime.now(); // Stores selected date
  DateTime startOfWeek = DateTime.now(); // Start of the week
  List<ExerciseWidget> exercises = []; // List to hold exercise widgets
  int? trainingId;
  List<SetForTraining> sets = [];
  late AuthProvider authProvider;
  late String userId;
  bool isLoading = true;
  String? errorMessage;
  final ScrollController _scrollController = ScrollController();
  bool _isFabVisible = true;

  @override
  bool get wantKeepAlive => true;

  void refreshExercises() {
    _fetchSets();
  }

  String getMonthName(int month) {
    switch (month) {
      case 1:
        return 'Січень';
      case 2:
        return 'Лютий';
      case 3:
        return 'Березень';
      case 4:
        return 'Квітень';
      case 5:
        return 'Травень';
      case 6:
        return 'Червень';
      case 7:
        return 'Липень';
      case 8:
        return 'Серпень';
      case 9:
        return 'Вересень';
      case 10:
        return 'Жовтень';
      case 11:
        return 'Листопад';
      case 12:
        return 'Грудень';
      default:
        return '';
    }
  }

  void _toggleFabVisibility() {
    if (_scrollController.position.userScrollDirection == ScrollDirection.reverse && _isFabVisible) {
      setState(() {
        _isFabVisible = false;
      });
    } else if (_scrollController.position.userScrollDirection == ScrollDirection.forward && !_isFabVisible) {
      setState(() {
        _isFabVisible = true;
      });
    }
  }

  void getStartOfWeek(DateTime date) {
    startOfWeek = date.subtract(Duration(days: date.weekday - 1));
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
        getStartOfWeek(selectedDate);
      });
    }
    _fetchSets();
  }

  void _selectDateDay(DateTime date) {
    setState(() {
      selectedDate = date;
      getStartOfWeek(selectedDate);
      _fetchSets();
    });
  }

  @override
  void initState() {
    super.initState();
    getStartOfWeek(selectedDate);
    authProvider = Provider.of<AuthProvider>(context, listen: false);
    userId = authProvider.user!.id;
    _fetchSets(); // Ensure sets are fetched on initial load
    _scrollController.addListener(_toggleFabVisibility);
    WidgetsBinding.instance.addObserver(this);
  }

  // @override
  // void didChangeDependencies() {
  //   super.didChangeDependencies();
  //   _fetchSets();
  // }

  @override
  void didPopNext() {
    _fetchSets(); // Fetch sets when coming back to this screen
  }


  Future<void> _fetchSets() async {
    setState(() {
      isLoading = true; // Set loading state
      errorMessage = null; // Reset error message
    });

    try {
      List<Map<String, dynamic>> fetchedSets = await SetService.getSetByTraining(userId, selectedDate);
      setState(() {
        sets = fetchedSets.map((map) => SetForTraining.fromMap(map)).toList();

        exercises = sets.map((set) {
          trainingId = set.individualTrainingId;
          return ExerciseWidget(
            exerciseName: set.exerciseName,
            weight: set.weight,
            repetitions: set.reps,
            onDelete: () async {
              setState(() {
                _isFabVisible = true; // Show Floating Action Button (FAB) again
              });

              final result = await SetService.deleteSet(set.id);

              if (result) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Підхід успішно видалено'),
                    duration: Duration(seconds: 2),
                  ),
                );
              } else {
                // Show an error message if deletion failed
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Помилка видалення'),
                    duration: Duration(seconds: 2),
                  ),
                );
              }
              _fetchSets();
            },
          );
        }).toList();
      });

    } catch (error) {
      setState(() {
        errorMessage = "В цей день не було тренувань"; // Set the error message
      });
    }
    finally{
      setState(() {
        isLoading = false; // Завантаження завершено
      });
    }
  }

  String getDayName(int weekday) {
    switch (weekday) {
      case 1:
        return 'ПН';
      case 2:
        return 'ВТ';
      case 3:
        return 'СР';
      case 4:
        return 'ЧТ';
      case 5:
        return 'ПТ';
      case 6:
        return 'СБ';
      case 7:
        return 'НД';
      default:
        return '';
    }
  }

  void _goToPreviousWeek() {
    setState(() {
      startOfWeek = startOfWeek.subtract(Duration(days: 7));
      selectedDate = startOfWeek;
    });
  }

  void _goToNextWeek() {
    setState(() {
      startOfWeek = startOfWeek.add(Duration(days: 7));
      selectedDate = startOfWeek;
    });
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);

    return Scaffold(
      body: Stack(
        children: [
          Align(
            alignment: Alignment.topCenter,
            child: Container(
              padding: const EdgeInsets.only(left: 16, right: 16, top: 16),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      GestureDetector(
                        onTap: _goToPreviousWeek,
                        child: Container(
                          padding: const EdgeInsets.all(8.0),
                          decoration: BoxDecoration(
                            color: Theme.of(context).brightness == Brightness.light
                                ? AppColors.isabelline
                                : AppColors.gray,
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                          child: Icon(
                            CupertinoIcons.chevron_back,
                            color: Theme.of(context).brightness == Brightness.light
                                ? AppColors.black
                                : AppColors.white,
                            size: 24.0,
                          ),
                        ),
                      ),
                      GestureDetector(
                        onTap: () => _selectDate(context),
                        child: Container(
                          padding: const EdgeInsets.only(left: 8.0, right: 8.0, top: 4, bottom: 4),
                          decoration: BoxDecoration(
                            color: Theme.of(context).brightness == Brightness.light
                                ? AppColors.isabelline
                                : AppColors.gray,
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                          child: Row(
                            children: [
                              Icon(
                                CupertinoIcons.calendar_today,
                                color: Theme.of(context).brightness == Brightness.light
                                    ? AppColors.black
                                    : AppColors.white,
                                size: 24.0,
                              ),
                              const SizedBox(width: 4.0),
                              Text(
                                '${getMonthName(selectedDate.month)} ${selectedDate.year}',
                                style: TextStyle(
                                  color: Theme.of(context).brightness == Brightness.light
                                      ? AppColors.black
                                      : AppColors.white,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      GestureDetector(
                        onTap: _goToNextWeek,
                        child: Container(
                          padding: const EdgeInsets.all(8.0),
                          decoration: BoxDecoration(
                            color: Theme.of(context).brightness == Brightness.light
                                ? AppColors.isabelline
                                : AppColors.gray,
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                          child: Icon(
                            CupertinoIcons.chevron_forward,
                            color: Theme.of(context).brightness == Brightness.light
                                ? AppColors.black
                                : AppColors.white,
                            size: 24.0,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppColors.isabelline
                          : AppColors.gray,
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: List.generate(7, (index) {
                        DateTime currentDate = startOfWeek.add(Duration(days: index));
                        bool isSelected = currentDate.day == selectedDate.day &&
                            currentDate.month == selectedDate.month &&
                            currentDate.year == selectedDate.year;

                        return GestureDetector(
                          onTap: () => _selectDateDay(currentDate),
                          child: Container(
                            padding: const EdgeInsets.all(8.0),
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? AppColors.fulvous
                                  : (Theme.of(context).brightness == Brightness.light
                                  ? AppColors.isabelline
                                  : AppColors.gray),
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            width: isSelected ? 60.0 : null,
                            height: isSelected ? 60.0 : null,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  getDayName(currentDate.weekday),
                                  style: AppTextStyles.h4.copyWith(
                                    color: isSelected
                                        ? AppColors.white
                                        : (Theme.of(context).brightness == Brightness.light
                                        ? AppColors.black
                                        : AppColors.white),
                                  ),
                                ),
                                const SizedBox(height: 4.0),
                                Text(
                                  '${currentDate.day}',
                                  style: AppTextStyles.h4.copyWith(
                                    color: isSelected
                                        ? AppColors.white
                                        : (Theme.of(context).brightness == Brightness.light
                                        ? AppColors.black
                                        : AppColors.white),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      }),
                    ),
                  ),
                  const SizedBox(height: 8),

                  if (isLoading)
                      Expanded(child: const Center(child: CircularProgressIndicator()))
                  else if (errorMessage != null)
                      Expanded(child: Center(child: Text(errorMessage!, style: TextStyle(color: Colors.black))))
                  else if (exercises.isEmpty)
                      Expanded(child: const Center(child: Text('Немає доступних тренувань на вибрану дату', style: TextStyle(color: Colors.black))))
                    else
                      Expanded(
                        child: SingleChildScrollView(
                          controller: _scrollController,
                          child: Column(children: exercises),
                        ),
                      ),
                ],
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: AnimatedOpacity(
        opacity: _isFabVisible ? 1.0 : 0.0,
        duration: Duration(milliseconds: 400),
        child: IgnorePointer(
          ignoring: !_isFabVisible, // Якщо кнопка прихована, ігнорувати її натискання
          child: FloatingActionButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ExercisePage(
                    individualTrainingId: trainingId ?? 0,
                    userId: userId,
                    selectedDate: selectedDate,
                    onExerciseAdded: refreshExercises, // Pass the callback here
                  ),
                ),
              );
            },
            child: const Icon(Icons.add),
            backgroundColor: AppColors.fulvous,
          ),
        ),
      ),

      // floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }
}
