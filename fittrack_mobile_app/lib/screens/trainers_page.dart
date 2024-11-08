import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/gym_service.dart'; // Now referring to a trainer service instead
import '../../styles/colors.dart';
import '../../styles/fonts.dart';
import '../providers/AuthProvider.dart';
import '../services/trainer_service.dart';
import '../services/user_service.dart';
import '../widgets/trainer_list_widget.dart'; // Import user service for updating gym choice

class TrainersPage extends StatefulWidget {
  final int? gymId;

  const TrainersPage({Key? key, this.gymId}) : super(key: key);

  @override
  _TrainersPage createState() => _TrainersPage();
}

class _TrainersPage extends State<TrainersPage> {
  final TextEditingController searchController = TextEditingController();
  List<Map<String, dynamic>> trainers = [];
  List<Map<String, dynamic>> filteredTrainers = [];
  bool isLoading = true; // Track loading state
  late AuthProvider authProvider;
  late String userId;

  @override
  void initState() {
    super.initState();
    _fetchTrainers();
    authProvider = Provider.of<AuthProvider>(context, listen: false);
    userId = authProvider.user!.id;
    searchController.addListener(_filterTrainers);
  }

  @override
  void dispose() {
    searchController.removeListener(_filterTrainers);
    searchController.dispose();
    super.dispose();
  }

  // Method to fetch trainer data
  Future<void> _fetchTrainers() async {
    final fetchedTrainers = await TrainerService.getTrainersInfoByGymId(widget.gymId!);
    setState(() {
      trainers = fetchedTrainers!;
      filteredTrainers = fetchedTrainers; // Initialize filtered trainers list
      isLoading = false; // Set loading to false once data is fetched
    });
  }

  // Filter the trainer list based on the search query
  void _filterTrainers() {
    final query = searchController.text.toLowerCase();
    setState(() {
      filteredTrainers = trainers.where((trainer) {
        final fullName = '${trainer['surname']} ${trainer['firstName']}'.toLowerCase();
        return fullName.contains(query);
      }).toList();
    });
  }

  // Show confirmation dialog when selecting a trainer
  Future<void> _showConfirmationDialog(BuildContext context, Map<String, dynamic> trainer) async {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Впевнені, що бажаєте вибрати цього тренера?"),
          content: Text("${trainer['Surname']} ${trainer['First Name']}"),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
              },
              child: Text("Ні"),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog
                _selectTrainer(trainer); // Proceed with selecting the trainer
              },
              child: Text("Так"),
            ),
          ],
        );
      },
    );
  }

  // Handle selecting a trainer and updating the information
  Future<void> _selectTrainer(Map<String, dynamic> trainer) async {
    Map<String, dynamic> additionalInfo = {
      "operationType": 0, // Operation type (e.g., 0 for "replace")
      "path": "/trainerId", // Path for the field to update
      "op": "replace", // Operation (replace)
      "from": "", // Previous value (optional)
      "value": trainer["Id"].toString(), // New trainer ID
    };

    bool isUpdated = await UserService.updateAdditionalInfo(userId, additionalInfo); // Call the service to update

    if (isUpdated) {
      // If trainer is successfully selected
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Тренер успішно вибраний!'),
        ),
      );
    } else {
      // If there's an error selecting the trainer
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Помилка при виборі тренера!'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Оберіть тренера",
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
              // widget.onGymChanged(); // Invoke callback when going back
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
            _buildTextField(searchController, 'Пошук тренера', TextInputType.text, context),
            const SizedBox(height: 16.0),
            // Show loading spinner while fetching trainers
            isLoading
                ? Expanded(child: Center(child: CircularProgressIndicator())) // Show loading indicator
                : Expanded(
              child: filteredTrainers.isEmpty
                  ? Center(child: Text('Здається тут пусто'))
                  : ListView.builder(
                itemCount: filteredTrainers.length,
                itemBuilder: (context, index) {
                  final trainer = filteredTrainers[index];
                  return GestureDetector(
                    onTap: () {
                      _showConfirmationDialog(context, trainer); // Show confirmation dialog
                    },
                    child: TrainerDetailWidget(  // Use the trainer detail widget
                      surname: trainer['Surname'],
                      firstName: trainer['First Name'],
                      phoneNumber: trainer['Phone'],
                      email: trainer['Email'],
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

  // Method to build the search text field
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
