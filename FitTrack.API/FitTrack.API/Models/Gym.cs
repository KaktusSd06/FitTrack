namespace FitTrack.API.Models;
public class Gym
{
    public required int Id { get; set; }
    public required string Address { get; set; }
    public required string Name { get; set; }
    public required int OwnerId { get; set; }
    public decimal? Balance { get; set; }

    public required Owner Owner { get; set; }

    public ICollection<Trainer>? Trainers { get; set; }
    public ICollection<Admin>? Admins { get; set; }
    public ICollection<User>? Users { get; set; }
    public ICollection<Membership>? Memberships { get; set; }
    public ICollection<GroupTraining>? GroupTrainings { get; set; }
}