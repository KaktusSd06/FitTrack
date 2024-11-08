import 'package:firebase_core/firebase_core.dart';
import 'package:fittrack_mobile_app/firebase_options.dart';
import 'package:fittrack_mobile_app/providers/AuthProvider.dart';
import 'package:fittrack_mobile_app/screens/authorization/login.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fittrack_mobile_app/theme/theme_provider.dart';
import 'package:fittrack_mobile_app/screens/home_page.dart';
import 'package:url_launcher/url_launcher.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider()), // Додаємо AuthProvider
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Consumer2<ThemeProvider, AuthProvider>(
      builder: (context, themeProvider, authProvider, child) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          theme: themeProvider.themeData,
          home: Consumer<AuthProvider>(
            builder: (context, authProvider, child) {
              return authProvider.isAuthenticated ? const HomePage() : LoginPage();
            },
          ),
        );
      },
    );
  }
}
