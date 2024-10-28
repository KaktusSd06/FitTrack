import 'owner.dart';
import 'trainer.dart';
import 'admin.dart';
import 'user.dart';
import 'membership.dart';
import 'group_training.dart';

class Gym {
  int id;
  String address;
  String name;
  int ownerId;
  double? balance;
  Owner owner;
  List<Trainer>? trainers;
  List<Admin>? admins;
  List<User>? users;
  List<Membership>? memberships;
  List<GroupTraining>? groupTrainings;

  Gym({
    required this.id,
    required this.address,
    required this.name,
    required this.ownerId,
    this.balance,
    required this.owner,
    this.trainers,
    this.admins,
    this.users,
    this.memberships,
    this.groupTrainings,
  });

  factory Gym.fromJson(Map<String, dynamic> json) {
    return Gym(
      id: json['id'],
      address: json['address'],
      name: json['name'],
      ownerId: json['ownerId'],
      balance: json['balance'] != null ? json['balance'].toDouble() : null,
      owner: Owner.fromJson(json['owner']),
      trainers: (json['trainers'] as List).map((i) => Trainer.fromJson(i)).toList(),
      admins: (json['admins'] as List).map((i) => Admin.fromJson(i)).toList(),
      users: (json['users'] as List).map((i) => User.fromJson(i)).toList(),
      memberships: (json['memberships'] as List).map((i) => Membership.fromJson(i)).toList(),
      groupTrainings: (json['groupTrainings'] as List).map((i) => GroupTraining.fromJson(i)).toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'address': address,
      'name': name,
      'ownerId': ownerId,
      'balance': balance,
      'owner': owner.toJson(),
      'trainers': trainers?.map((trainer) => trainer.toJson()).toList(),
      'admins': admins?.map((admin) => admin.toJson()).toList(),
      'users': users?.map((user) => user.toJson()).toList(),
      'memberships': memberships?.map((membership) => membership.toJson()).toList(),
      'groupTrainings': groupTrainings?.map((groupTraining) => groupTraining.toJson()).toList(),
    };
  }
}
