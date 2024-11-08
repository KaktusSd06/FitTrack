import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/gym_service.dart';
import '../../styles/colors.dart';
import '../../styles/fonts.dart';
import '../../widgets/exercises.dart';
import '../providers/AuthProvider.dart';
import '../services/user_service.dart'; // Імпортуємо ExerciseDetailWidget

class GymPage extends StatefulWidget {
  final VoidCallback onGymChanged; // Callback parameter

  const GymPage({Key? key, required this.onGymChanged}) : super(key: key);

  @override
  _GymPageState createState() => _GymPageState();
}

class _GymPageState extends State<GymPage> {
  final TextEditingController searchController = TextEditingController();
  List<Map<String, dynamic>> gyms = [];
  List<Map<String, dynamic>> filteredGyms = [];
  bool isLoading = true; // Track loading state
  late AuthProvider authProvider;
  late String userId;

  @override
  void initState() {
    super.initState();
    _fetchGyms();
    authProvider = Provider.of<AuthProvider>(context, listen: false);
    userId = authProvider.user!.id;
    searchController.addListener(_filterGyms);
  }

  @override
  void dispose() {
    searchController.removeListener(_filterGyms);
    searchController.dispose();
    super.dispose();
  }

  Future<void> _fetchGyms() async {
    final fetchedGyms = await GymService.getGyms(); // Метод у вашому GymService, що повертає список залів
    setState(() {
      gyms = fetchedGyms!;
      filteredGyms = fetchedGyms; // Ініціалізація фільтрованого списку
      isLoading = false; // Set loading to false once data is fetched
    });
  }

  void _filterGyms() {
    final query = searchController.text.toLowerCase();
    setState(() {
      filteredGyms = gyms.where((gym) {
        final nameLower = gym['name'].toLowerCase();
        return nameLower.contains(query);
      }).toList();
    });
  }

  // Метод для показу діалогу підтвердження
  Future<void> _showConfirmationDialog(BuildContext context, Map<String, dynamic> gym) async {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Впевнені, що бажаєте обрати цей зал?"),
          content: Text("${gym['name']} за адресою ${gym['address']}"),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Закриваємо діалог
              },
              child: Text("Ні"),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Закриваємо діалог
                // Виконати дію при підтвердженні вибору (наприклад, перенаправити на іншу сторінку)
                _selectGym(gym);
              },
              child: Text("Так"),
            ),
          ],
        );
      },
    );
  }

  Future<void> _selectGym(Map<String, dynamic> gym) async {
    Map<String, dynamic> additionalInfo = {
      "operationType": 0, // Тип операції (наприклад, 0 для "replace")
      "path": "/gymId", // Шлях, по якому буде змінено значення
      "op": "replace", // Операція (replace для заміни)
      "from": "", // Якщо є "from", ви можете вказати старе значення або залишити порожнім
      "value": gym["id"].toString(), // Значення, яке буде замінено на нове
    };

    bool isUpdated = await UserService.updateAdditionalInfo(userId, additionalInfo); // Викликаємо функцію для оновлення

    if (isUpdated) {
      // Якщо зал успішно змінено
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Зал успішно змінено!'),
        ),
      );
    } else {
      // Якщо сталася помилка
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Помилка при зміні залу!'),
        ),
      );
    }
  }





  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Оберіть зал",
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
              widget.onGymChanged();
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
            // Поле пошуку
            _buildTextField(searchController, 'Пошук', TextInputType.text, context),
            const SizedBox(height: 16.0),
            // Show loading spinner while fetching gyms
            isLoading
                ? Expanded(child: Center(child: CircularProgressIndicator())) // Circular progress indicator
                : Expanded(
              child: filteredGyms.isEmpty
                  ? Center(child: Text('Здається тут пусто'))
                  : ListView.builder(
                itemCount: filteredGyms.length,
                itemBuilder: (context, index) {
                  final gym = filteredGyms[index];
                  return GestureDetector(
                    onTap: () {
                      _showConfirmationDialog(context, gym);
                    },
                    child: ExerciseDetailWidget(
                      exerciseName: gym['name'],
                      description: gym['address'],
                    ),
                  );
                },
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
          suffixIcon: Icon(Icons.search, color: AppColors.fulvous), // Іконка пошуку
        ),
      ),
    );
  }
}
