public class Gym
{
    public int Id { get; set; }
    public string Address { get; set; }
    public string Name { get; set; }
    public int OwnerId { get; set; }
    public decimal Balance { get; set; }

    public Owner Owner { get; set; }

    public ICollection<Trainer> Trainers { get; set; }
    public ICollection<Admin> Admins { get; set; }
    public ICollection<User> Users { get; set; }
    public ICollection<Membership> Memberships { get; set; }
    public ICollection<GroupTraining> GroupTrainings { get; set; }
}