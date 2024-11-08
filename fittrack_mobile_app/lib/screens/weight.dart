import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../services/weight_service.dart';
import '../styles/colors.dart';
import '../styles/fonts.dart';
import '../widgets/button_with_text.dart';

Future<String> fetchWeight(String userId) async {
  dynamic weight = await WeightService.getUserWeightById(userId);

  if (weight != null) {
    double weightValue = (weight is int) ? weight.toDouble() : weight;
    return "$weightValue кг";
  } else {
    return "0 кг";
  }
}



class WeightPage extends StatefulWidget {
  final String userId;
  final VoidCallback onWeightChanged; // Callback parameter


  WeightPage({required this.userId, required this.onWeightChanged});

  @override
  _WeightPageState createState() => _WeightPageState();
}

class _WeightPageState extends State<WeightPage> {

  final TextEditingController _weightController = TextEditingController();
  bool _isEditing = false;
  String currentWeight = "";
  bool _isSaving = false;
  List<FlSpot> weekData = [];
  List<FlSpot> monthData = [];
  List<FlSpot> yearData = [];
  String selectedPeriod = 'week';
  bool isLoading = false;

  void onPeriodChanged(String value) {
    setState(() {
      selectedPeriod = value;
    });
    fetchWeightInfo(selectedPeriod); // Call fetch function without periodLabels conversion
  }

  Future<void> fetchWeightInfo(String period) async {
    setState(() {
      isLoading = true;  // Set loading to true when starting to fetch data
    });

    DateTime startDate;
    DateTime endDate = DateTime.now();

    List<FlSpot> newData = [];
    switch (period) {
      case 'week':
        startDate = endDate.subtract(Duration(days: 6));
        for (int i = 0; i < 7; i++) {
          DateTime date = startDate.add(Duration(days: i));
          double weight = await WeightService.getWeightByUserIdForDateToDate(widget.userId, date, date);
          newData.add(FlSpot(i.toDouble(), weight.toDouble()));
        }
        setState(() {
          weekData = newData;
          selectedPeriod = 'week';
        });
        break;
      case 'month':
        startDate = DateTime(endDate.year, endDate.month - 1, 1);
        for (int i = 0; i < 30; i++) {
          DateTime date = startDate.add(Duration(days: i));
          double weight = await WeightService.getWeightByUserIdForDateToDate(widget.userId, date, date);
          newData.add(FlSpot(i.toDouble(), weight.toDouble()));
        }
        setState(() {
          monthData = newData;
          selectedPeriod = 'month';
        });
        break;
      case 'year':
        startDate = DateTime(endDate.year - 1, 1, 1);
        for (int i = 0; i < 12; i++) {
          DateTime date = DateTime(startDate.year, i + 1, 1);
          double weight = await WeightService.getWeightByUserIdForDateToDate(widget.userId, date, date);
          newData.add(FlSpot(i.toDouble(), weight.toDouble()));
        }
        setState(() {
          yearData = newData;
          selectedPeriod = 'year';
        });
        break;
      default:
        return;
    }

    setState(() {
      isLoading = false;  // Set loading to false after data is fetched
    });
  }

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

  Future<void> _saveWeight() async {
    if (_weightController.text.isNotEmpty) {
      setState(() {
        _isSaving = true;
      });

      double newWeight = double.tryParse(_weightController.text) ?? 0.0;

      bool success = await WeightService.addWeightInfo(widget.userId, newWeight);

      setState(() {
        _isSaving = false;
        if (success) {
          currentWeight = "$newWeight кг";
          _weightController.clear();
          _isEditing = false;
        } else {
          _showErrorDialog();
        }
      });
    }
  }

  void _showErrorDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Помилка'),
          content: Text('Не вдалося зберегти вагу. Спробуйте знову пізніше.'),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    List<FlSpot> chartData = selectedPeriod == 'week'
        ? weekData
        : selectedPeriod == 'month'
        ? monthData
        : yearData;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Вага",
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
              widget.onWeightChanged();
              Navigator.pop(context);
            },
          ),
        ),
        backgroundColor: Theme.of(context).colorScheme.surface,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Center(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(height: 20),
              // Використовуємо FutureBuilder для асинхронного завантаження ваги
              FutureBuilder<String>(
                future: fetchWeight(widget.userId),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return CircularProgressIndicator();
                  } else if (snapshot.hasError) {
                    return Text('Error loading weight');
                  } else if (snapshot.hasData) {
                    currentWeight = snapshot.data!;
                  } else {
                    currentWeight = "0 кг";
                  }

                  return Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        currentWeight,
                        style: TextStyle(fontSize: 30),
                      ),
                      SizedBox(width: 4),
                      if (!_isEditing)
                        IconButton(
                          icon: Icon(
                            CupertinoIcons.pen,
                            color: Theme.of(context).brightness == Brightness.light
                                ? AppColors.fulvous
                                : AppColors.fulvous,
                          ),
                          onPressed: () {
                            setState(() {
                              _isEditing = true;
                            });
                          },
                        ),
                      if (_isEditing)
                        IconButton(
                          icon: Icon(
                            CupertinoIcons.clear_circled,
                            color: Theme.of(context).brightness == Brightness.light
                                ? AppColors.black
                                : AppColors.white,
                          ),
                          onPressed: () {
                            setState(() {
                              _isEditing = false;
                              _weightController.clear();
                            });
                          },
                        ),
                    ],
                  );
                },
              ),
              SizedBox(height: 20),
              if (_isEditing)
                Row(
                  children: [
                    Expanded(
                      child: _buildTextField(_weightController, 'Введіть нову вагу', TextInputType.number),
                    ),
                    SizedBox(width: 10),
                    _isSaving
                        ? CircularProgressIndicator()
                        : ButtonWithText(
                      text: "Зберегти",
                      onPressed: _saveWeight,
                    ),
                  ],
                ),

              Expanded(
                child:
              Column(
                children: [
                  CupertinoSegmentedControl<String>(
                    padding: EdgeInsets.symmetric(vertical: 12, horizontal: 0),
                    groupValue: selectedPeriod,
                    onValueChanged: onPeriodChanged,
                    selectedColor: Theme.of(context).brightness == Brightness.light
                        ? AppColors.fulvous
                        : AppColors.fulvous,
                    unselectedColor: Theme.of(context).brightness == Brightness.light
                        ? AppColors.isabelline
                        : AppColors.gray,
                    borderColor: Theme.of(context).brightness == Brightness.light
                        ? AppColors.isabelline
                        : AppColors.gray,
                    children: {
                      'week': Padding(
                        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                        child: Text(
                          'Тиждень',
                          style: AppTextStyles.h3.copyWith(
                            color: selectedPeriod == 'week'
                                ? (Theme.of(context).brightness == Brightness.light
                                ? AppColors.white
                                : AppColors.white)
                                : (Theme.of(context).brightness == Brightness.light
                                ? AppColors.jet
                                : AppColors.white),
                          ),
                        ),
                      ),
                      'month': Padding(
                        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                        child: Text(
                          'Місяць',
                          style: AppTextStyles.h3.copyWith(
                            color: selectedPeriod == 'month'
                                ? (Theme.of(context).brightness == Brightness.light
                                ? AppColors.white
                                : AppColors.white)
                                : (Theme.of(context).brightness == Brightness.light
                                ? AppColors.jet
                                : AppColors.white),
                          ),
                        ),
                      ),
                      'year': Padding(
                        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                        child: Text(
                          'Рік',
                          style: AppTextStyles.h3.copyWith(
                            color: selectedPeriod == 'year'
                                ? (Theme.of(context).brightness == Brightness.light
                                ? AppColors.white
                                : AppColors.white)
                                : (Theme.of(context).brightness == Brightness.light
                                ? AppColors.jet
                                : AppColors.white),
                          ),
                        ),
                      ),
                    },
                  ),

                  SizedBox(height: 12),

                  isLoading
                      ? Expanded(child:  Center(
                    child: CircularProgressIndicator(),
                  ))
                      :
                  Expanded(
                    child: LineChart(
                      LineChartData(
                        titlesData: FlTitlesData(
                          leftTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              interval: 10,
                              reservedSize: 40,
                              getTitlesWidget: (value, _) => Text(
                                value.toInt().toString(),
                                style: TextStyle(fontSize: 12),
                              ),
                            ),
                          ),
                          rightTitles: AxisTitles(
                            sideTitles: SideTitles(showTitles: false),
                          ),
                          topTitles: AxisTitles(
                            sideTitles: SideTitles(showTitles: false),
                          ),
                          bottomTitles: AxisTitles(
                            sideTitles: SideTitles(
                              showTitles: true,
                              getTitlesWidget: (value, _) {
                                DateTime date;
                                String dateText;

                                if (selectedPeriod == 'week') {
                                  // Calculate the date for weekly data
                                  date = DateTime.now().subtract(Duration(days: 6 - value.toInt()));
                                  dateText = DateFormat('E').format(date);
                                } else if (selectedPeriod == 'month') {
                                  // Calculate the date for monthly data
                                  date = DateTime.now().subtract(Duration(days: 30 - value.toInt()));
                                  dateText = DateFormat('dd.MM').format(date);
                                } else {
                                  // Calculate the month for yearly data (using index 0 for Jan, 1 for Feb, etc.)
                                  date = DateTime(DateTime.now().year, value.toInt() + 1, 1);
                                  dateText = DateFormat('MMM').format(date); // Format as three-letter month name
                                }

                                return Text(dateText, style: TextStyle(fontSize: 10));
                              },
                            ),
                          ),

                        ),
                        borderData: FlBorderData(show: true),
                        minX: 0,
                        maxX: (chartData.length - 1).toDouble(),
                        minY: 0,
                        maxY: 200,
                        lineBarsData: [
                          LineChartBarData(
                            spots: chartData,
                            isCurved: true,
                            color: AppColors.fulvous,
                            dotData: FlDotData(show: true),
                            belowBarData: BarAreaData(show: false),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              )
              ),
            ],

          ),
        ),
      ),
    );
  }
}