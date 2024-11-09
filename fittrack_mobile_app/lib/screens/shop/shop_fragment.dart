import 'package:fittrack_mobile_app/models/membership.dart';
import 'package:fittrack_mobile_app/services/memberships_service.dart';
import 'package:fittrack_mobile_app/widgets/membership_widgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../../../styles/colors.dart';
import '../../../styles/fonts.dart';
import '../../models/Gym_fot_UI.dart';
import '../../providers/AuthProvider.dart';
import '../../services/gym_service.dart';
import '../../services/services_service.dart';
import '../../widgets/services_widgets.dart';

class ShopPage extends StatefulWidget {
  @override
  _ShopPageState createState() => _ShopPageState();
}

class _ShopPageState extends State<ShopPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  List<Map<String, dynamic>> services = [];
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

  void _loadInfo() async{
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
    services = await ServicesService.getServicesByGymId(gym!.id);
    memberships = await MembershipsService.getMembershipsByGymId(gym!.id);

    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TabBar(
        controller: _tabController,
        tabs: [
          Tab(text: "Послуги"),
          Tab(text: "Абонименти"),
        ],
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : TabBarView(
        controller: _tabController,
        children: [
          _buildServicesTab(),
          _buildMembershipsTab(),
        ],
      ),
    );
  }

  Widget _buildServicesTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          services.isEmpty
              ? Expanded(child: Center(child: Text("Немає доступних товарів")))
              : ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: services.length,
            itemBuilder: (context, index) {
              final service = services[index];
              return Padding(
                padding: const EdgeInsets.only(bottom: 16.0),
                  child: ServicesWidget(
                    id: service['id'],
                    title: service['name'],
                    description: service['description'],
                    price: service['cost'].toDouble(),
                ),
              );
            },
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
              ? Expanded(child: Center(child: Text("Немає доступних товарів")))
              : ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: memberships.length,
            itemBuilder: (context, index) {
              final membership = memberships[index];
              final cost = membership["cost"] is double
                  ? membership["cost"]
                  : membership["cost"].toDouble(); // Ensure cost is a double
              return Padding(
                padding: const EdgeInsets.only(bottom: 16.0),
                child: MembershipWidgets(
                  membershipId: membership["id"],
                  membershipName: membership["membershipName"],
                  cost: cost, // Pass the cost as double
                  durationInMonths: membership["durationInMonths"],
                  sessions: membership["sessions"],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

}
