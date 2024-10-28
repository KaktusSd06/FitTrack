import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../styles/colors.dart';
import '../styles/fonts.dart';
import '../widgets/group_training_widgets.dart';

class GroupTraining extends StatefulWidget {
  const GroupTraining({Key? key}) : super(key: key);

  @override
  _TrainingScreenState createState() => _TrainingScreenState();
}

class _TrainingScreenState extends State<GroupTraining> {
  DateTime selectedDate = DateTime.now(); // Зберігає вибрану дату
  DateTime startOfWeek = DateTime.now(); // Початок тижня

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
        selectedDate = picked; // Оновлюємо вибрану дату
        getStartOfWeek(selectedDate); // Оновлюємо початок тижня
      });
    }
  }

  void _selectDateDay(DateTime date) {
    setState(() {
      selectedDate = date;
      getStartOfWeek(selectedDate); // Оновлюємо початок тижня при виборі дати
    });
  }

  @override
  void initState() {
    super.initState();
    getStartOfWeek(selectedDate); // Отримати початок тижня при ініціалізації
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
      startOfWeek = startOfWeek.subtract(Duration(days: 7)); // Перейти на тиждень назад
      selectedDate = startOfWeek; // Оновлюємо вибрану дату на перший день тижня
    });
  }

  void _goToNextWeek() {
    setState(() {
      startOfWeek = startOfWeek.add(Duration(days: 7)); // Перейти на наступний тиждень
      selectedDate = startOfWeek; // Оновлюємо вибрану дату на перший день тижня
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Групові тренування",
          style: AppTextStyles.h1.copyWith(
              color: Theme.of(context).brightness == Brightness.light
                  ? AppColors.gray
                  : AppColors.white
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
              Navigator.pop(context);
            },
          ),
        ),
        backgroundColor: Theme.of(context).brightness == Brightness.light
            ? AppColors.white
            : AppColors.black,
        elevation: 0,
      ),
      body: Align(
        alignment: Alignment.topCenter,
        child: Container(
          padding: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Back icon
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

                  // Calendar icon with selected date
                  GestureDetector(
                    onTap: () => _selectDate(context), // Відкриваємо календар при натисканні
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
                            '${getMonthName(selectedDate.month)} ${selectedDate.year}', // Відображення місяця словом
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

                  // Forward icon
                  GestureDetector(
                    onTap: _goToNextWeek, // Перейти на наступний тиждень
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
                      onTap: () => _selectDateDay(currentDate), // Вибір дати
                      child: Container(
                        padding: const EdgeInsets.all(8.0),
                        decoration: BoxDecoration(
                          color: isSelected
                              ? AppColors.fulvous // Колір, якщо дата вибрана
                              : (Theme.of(context).brightness == Brightness.light
                              ? AppColors.isabelline
                              : AppColors.gray),
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                        width: isSelected ? 60.0 : null, // Фіксована ширина для вибраного дня
                        height: isSelected ? 60.0 : null, // Фіксована висота для вибраного дня
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              getDayName(currentDate.weekday), // Назва дня тижня
                              style: AppTextStyles.h4.copyWith(
                                color: isSelected
                                    ? AppColors.white // Зміна кольору тексту для вибраної дати
                                    : (Theme.of(context).brightness == Brightness.light
                                    ? AppColors.black
                                    : AppColors.white),
                              ),
                            ),
                            const SizedBox(height: 4.0),
                            Text(
                              '${currentDate.day}', // Відображення дня
                              style: AppTextStyles.h3.copyWith(
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

              const SizedBox(height: 24),

              Expanded(
                  child: SingleChildScrollView(
                    child: Column(
                      children: [
                        GroupTrainingWidgets(),
                        SizedBox(height: 8),
                        GroupTrainingWidgets(),
                        SizedBox(height: 8),
                        GroupTrainingWidgets(),
                        SizedBox(height: 8),
                        GroupTrainingWidgets(),
                        SizedBox(height: 8),
                        GroupTrainingWidgets(),
                        SizedBox(height: 8),
                        GroupTrainingWidgets(),
                        SizedBox(height: 8),
                        GroupTrainingWidgets(),
                        SizedBox(height: 8),
                        GroupTrainingWidgets(),
                        SizedBox(height: 8),
                      ],
                    ),

                  )
              ),
            ],
          ),
        ),
      ),
    );
  }
}
