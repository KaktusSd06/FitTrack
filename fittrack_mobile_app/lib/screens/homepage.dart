import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import '../styles/colors.dart';
import '../styles/fonts.dart';
import '../theme/theme_provider.dart';
import 'home_fragment.dart';
import 'training_fragment.dart';
import 'shop_fragment.dart';
import 'profile_fragment.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  int _selectedIndex = 0;

  // Список сторінок з інших файлів
  static const List<Widget> _pages = <Widget>[
    HomeScreen(), // Викликаємо екран "HomeScreen" з іншого файлу
    TrainingScreen(), // Викликаємо екран "TrainingScreen"
    ShopScreen(), // Викликаємо екран "ShopScreen"
    ProfileScreen(), // Викликаємо екран "ProfileScreen"
  ];

  void _onTabChange(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Padding(
          padding: EdgeInsets.only(left: 32.0),
          child: Text(
            "FitTrack",
            style: AppTextStyles.h1_f,
          ),
        ),
        backgroundColor: Theme.of(context).colorScheme.surface,
        automaticallyImplyLeading: false,
        elevation: 0,
      ),

      body: _pages[_selectedIndex], // Відображаємо сторінки з різних файлів
      bottomNavigationBar: Container(
        color: Theme
            .of(context)
            .colorScheme
            .surface,
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
    );
  }
}
