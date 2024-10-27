using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;
public class Gym
{
    public  int Id { get; set; }
    [MaxLength(150)]
    public required string Address { get; set; }
    [MaxLength(50)]
    public required string Name { get; set; }
    public required string OwnerId { get; set; }
    public decimal? Balance { get; set; }
    public required Owner Owner { get; set; }

    public ICollection<Trainer>? Trainers { get; set; }
    public ICollection<Admin>? Admins { get; set; }
    public ICollection<User>? Users { get; set; }
    public ICollection<Membership>? Memberships { get; set; }
    public ICollection<GroupTraining>? GroupTrainings { get; set; }
}