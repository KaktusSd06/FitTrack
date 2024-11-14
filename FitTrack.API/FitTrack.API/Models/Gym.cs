using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;
public class Gym
{
    public  int Id { get; set; }
    [MaxLength(150)]
    [Required]
    public string Address { get; set; }
    [MaxLength(50)]
    [Required]
    public string Name { get; set; }
    public decimal? Balance { get; set; }
    
    public string OwnerId { get; set; }
    public Owner? Owner { get; set; }

    public ICollection<Trainer>? Trainers { get; set; }
    public ICollection<Admin>? Admins { get; set; }
    public ICollection<User>? Users { get; set; }
    public ICollection<Membership>? Memberships { get; set; }
    public ICollection<GroupTraining>? GroupTrainings { get; set; }
    public ICollection<Service>? Services { get; set; }
    public ICollection<Good>? Goods { get; set; }
}