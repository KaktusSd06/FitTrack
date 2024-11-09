import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import '../providers/AuthProvider.dart';
import '../styles/colors.dart';
import '../styles/fonts.dart';
import '../theme/theme_provider.dart';
import 'home_fragment.dart';
import 'Authorization/login.dart';
import 'training/training_fragment.dart';
import 'shop/shop_fragment.dart';
import 'profile/profile_fragment.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);


  @override
  State<HomePage> createState() => _HomePage();
}



class _HomePage extends State<HomePage> {
  int _selectedIndex = 0;

  static List<Widget> _pages = <Widget>[
    HomeScreen(),
    const TrainingScreen(),
    ShopPage(),
    const ProfileScreen(),
  ];

  void _onTabChange(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  Future<bool> _showExitConfirmation(BuildContext context) async {
    return await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Підтвердження'),
        content: const Text('Ви дійсно хочете вийти з застосунку?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: Text('Ні'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: Text('Так'),
          ),
        ],
      ),
    ) ?? false;
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    if (!authProvider.isAuthenticated) {
      Future.microtask(() {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => LoginPage()),
        );
      });
    }

    return WillPopScope(
      onWillPop: () => _showExitConfirmation(context),
      child: Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: false,
          title: Text(
            "FitTrack",
            style: AppTextStyles.h1.copyWith(
              color: Theme.of(context).brightness == Brightness.light
                  ? AppColors.fulvous
                  : AppColors.fulvous,
            ),
          ),
          centerTitle: false,
          elevation: 0,
        ),
        body: _pages[_selectedIndex],
        bottomNavigationBar: Container(
          color: Theme.of(context).colorScheme.surface,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: GNav(
              activeColor: AppColors.white,
              tabBackgroundColor: AppColors.fulvous,
              padding: const EdgeInsets.all(12),
              gap: 12,
              onTabChange: _onTabChange,
              tabs: const [
                GButton(icon: Icons.home, text: "Домашня"),
                GButton(icon: CupertinoIcons.calendar, text: "Тренування"),
                GButton(icon: CupertinoIcons.bag_badge_plus, text: "Магазин"),
                GButton(icon: CupertinoIcons.person, text: "Профіль"),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
