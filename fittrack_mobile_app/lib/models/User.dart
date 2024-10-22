class User {
  late int id;
  late String email;
  late String password;
  late String? firstName;
  late String? lastName;
  late String? middleName;
  late DateTime? createdAt;
  late String phoneNumber;
  late int? height;
  late DateTime? dateOfBirth;
  late int? trainerId;
  late int? gymId;
  late int? membershipId;
  late double? weight;

  User({
    required this.id,
    required this.email,
    required this.password,
    required this.phoneNumber,
  });

  User.full({
    required this.id,
    required this.email,
    required this.password,
    this.firstName,
    this.lastName,
    this.middleName,
    this.createdAt,
    required this.phoneNumber,
    this.height,
    this.dateOfBirth,
    this.trainerId,
    this.gymId,
    this.membershipId,
    this.weight,
  });
}
