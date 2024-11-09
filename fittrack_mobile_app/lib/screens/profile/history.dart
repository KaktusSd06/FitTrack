import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../styles/colors.dart';
import '../../../styles/fonts.dart';
import '../../models/Gym_fot_UI.dart';
import '../../services/gym_service.dart';
import '../../services/user_service.dart';
import '../../widgets/user_memberships_widget.dart';
import '../../widgets/user_servises_widget.dart';
import '../../widgets/membership_widgets.dart';
import '../../providers/AuthProvider.dart';

class History extends StatefulWidget {
  @override
  _HistoryState createState() => _HistoryState();
}

class _HistoryState extends State<History> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  List<Map<String, dynamic>> purchases = [];
  List<Map<String, dynamic>> memberships = [];
  GymForUI? gym;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _loadInfo();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _loadInfo() async {
    setState(() {
      _isLoading = true;
    });
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final gymData = await GymService.getGymByUserId(authProvider.user!.id);
    if (gymData != null) {
      setState(() {
        gym = GymForUI.fromJson(gymData);
      });
    }
    purchases = await UserService.getServiceHistory(authProvider.user!.id);
    memberships = await UserService.getMembershipsByUserId(authProvider.user!.id);

    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Історія покупок",
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
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: "Послуги"),
            Tab(text: "Абонементи"),
          ],
        ),
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : TabBarView(
        controller: _tabController,
        children: [
          _buildPurchases(),
          _buildMembershipsTab(),
        ],
      ),
    );
  }

  Widget _buildPurchases() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          purchases.isEmpty
              ? Center(child: Text("Ви ще не здійснювали покупок"))
              : Column(
            children: List.generate(purchases.length, (index) {
              final purchase = purchases[index];
              final service = purchase['service']; // Access the service object

              final purchaseDate = DateTime.parse(purchase['date']);
              final formattedDate =
                  "${purchaseDate.day}-${purchaseDate.month}-${purchaseDate.year}";

              return Padding(
                padding: const EdgeInsets.only(bottom: 16.0),
                child: UserServicesWidget(
                  id: service['id'],
                  title: service['name'],
                  description: service['description'],
                  price: service['cost'].toDouble(),
                  purchaseDate: purchaseDate, // Pass the DateTime object
                ),
              );
            }),
          ),
        ],
      ),
    );
  }


  Widget _buildMembershipsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          memberships.isEmpty
              ? Center(child: Text("Немає доступних абонементів"))
              : ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: memberships.length,
            itemBuilder: (context, index) {
              final membership = memberships[index];
              return Padding(
                padding: const EdgeInsets.only(bottom: 16.0),
                child: MembershipBlock(
                  membershipName: membership['membershipName'],
                  durationInMonths: membership['durationInMonths'],
                  sessions: membership['sessions'],
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
