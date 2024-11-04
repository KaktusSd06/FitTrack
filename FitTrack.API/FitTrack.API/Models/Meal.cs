using System.ComponentModel.DataAnnotations;

namespace FitTrack.API.Models;
public class Meal
{
    public int Id { get; set; }
    [MaxLength(50)]
    public string Name { get; set; }
    public decimal Calories { get; set; } 
    public DateTime DateOfConsumption { get; set; } = DateTime.UtcNow;

    public string UserId { get; set; } 
    public User? User { get; set; }
}