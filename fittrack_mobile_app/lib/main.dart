import 'package:fittrack_mobile_app/providers/AuthProvider.dart';
import 'package:fittrack_mobile_app/screens/logInPage.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fittrack_mobile_app/theme/theme_provider.dart';
import 'package:fittrack_mobile_app/screens/homepage.dart';

void main() {
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
    return Consumer2<ThemeProvider, AuthProvider>( // Використовуємо Consumer2 для двох провайдерів
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
